import { auth } from "@/lib/auth/server";
import { sql } from "@/lib/db";
import { decryptApiKey } from "@/lib/crypto";
import { generateGeminiResponse } from "@/lib/gemini";
import type { ChatMessage } from "@/features/chat/types/chat.types";

type RouteContext = {
  params: Promise<{
    conversationId: string;
  }>;
};

type StoredMessage = {
  role: "user" | "assistant";
  content: string;
};

type MessageRow = {
  id: string;
  message: unknown;
  createdAt: Date | string;
  updatedAt: Date | string;
};

async function getAuthenticatedUser() {
  const { data, error } = await auth.getSession();

  if (error || !data?.session || !data?.user) {
    return null;
  }

  return data.user;
}

function isValidConversationId(id: string) {
  return /^[1-9]\d*$/.test(id);
}

async function ownsConversation(conversationId: string, userId: string) {
  const rows = await sql`
    SELECT c.id
    FROM public.conversations AS c
    INNER JOIN public.profiles AS p
      ON p.id = c.profile_id
    WHERE
      c.id = ${conversationId}::bigint
      AND p.user_id = ${userId}::uuid
    LIMIT 1
  `;

  return rows.length > 0;
}

async function getUserGeminiApiKey(userId: string): Promise<string | undefined> {
  const rows = await sql`
    SELECT ak.encrypted_key
    FROM public.api_keys AS ak
    INNER JOIN public.profiles AS p
      ON p.id = ak.profile_id
    WHERE
      p.user_id = ${userId}::uuid
      AND ak.provider = 'gemini'
    LIMIT 1
  `;

  const encrypted = rows[0]?.encrypted_key;
  if (!encrypted || typeof encrypted !== "string") {
    return undefined;
  }

  return decryptApiKey(encrypted);
}

function parseStoredMessages(raw: unknown): StoredMessage[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.filter(
    (item): item is StoredMessage =>
      typeof item === "object" &&
      item !== null &&
      "role" in item &&
      (item.role === "user" || item.role === "assistant") &&
      "content" in item &&
      typeof item.content === "string",
  );
}

function toChatMessages(row: MessageRow): ChatMessage[] {
  const stored = parseStoredMessages(row.message);
  const timestamp = new Date(row.updatedAt ?? row.createdAt).toISOString();

  return stored.map((msg, index) => ({
    id: `${row.id}-${index}`,
    role: msg.role,
    content: msg.content,
    createdAt: timestamp,
  }));
}

// GET /api/conversations/:conversationId/messages
export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { conversationId } = await params;

    if (!isValidConversationId(conversationId)) {
      return Response.json(
        { error: "Invalid conversation ID" },
        { status: 400 },
      );
    }

    const owns = await ownsConversation(conversationId, user.id);

    if (!owns) {
      return Response.json(
        { error: "Conversation not found" },
        { status: 404 },
      );
    }

    const rows = await sql`
      SELECT
        id::text AS id,
        message,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM public.messages
      WHERE conversation_id = ${conversationId}::bigint
      LIMIT 1
    `;

    const row = rows[0];

    return Response.json({
      messages: row ? toChatMessages(row as unknown as MessageRow) : [],
    });
  } catch (error) {
    console.error("GET messages error:", error);

    return Response.json({ error: "Failed to load messages" }, { status: 500 });
  }
}

// POST /api/conversations/:conversationId/messages
export async function POST(request: Request, { params }: RouteContext) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { conversationId } = await params;

    if (!isValidConversationId(conversationId)) {
      return Response.json(
        { error: "Invalid conversation ID" },
        { status: 400 },
      );
    }

    const owns = await ownsConversation(conversationId, user.id);

    if (!owns) {
      return Response.json(
        { error: "Conversation not found" },
        { status: 404 },
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    if (
      typeof body !== "object" ||
      body === null ||
      !("content" in body) ||
      typeof body.content !== "string"
    ) {
      return Response.json(
        { error: "Message content is required" },
        { status: 400 },
      );
    }

    const content = body.content.trim();

    if (!content || content.length > 20000) {
      return Response.json(
        { error: "Message must be between 1 and 20000 characters" },
        { status: 400 },
      );
    }

    // Load existing conversation history from the single row.
    const existingRows = await sql`
      SELECT message
      FROM public.messages
      WHERE conversation_id = ${conversationId}::bigint
      LIMIT 1
    `;

    const previousMessages = existingRows[0]
      ? parseStoredMessages(existingRows[0].message)
      : [];

    const history: StoredMessage[] = [
      ...previousMessages.slice(-30),
      { role: "user", content },
    ];

    // Use user's personal Gemini key if configured, otherwise fallback to server env key.
    const userApiKey = await getUserGeminiApiKey(user.id);
    const assistantContent = await generateGeminiResponse(history, userApiKey);

    const newPair: StoredMessage[] = [
      { role: "user", content },
      { role: "assistant", content: assistantContent },
    ];

    // Append both messages into the single jsonb array row.
    const updatedRow = await sql.begin(async (tx) => {
      const rows = await tx`
        INSERT INTO public.messages (
          conversation_id,
          message
        )
        VALUES (
          ${conversationId}::bigint,
          ${tx.json(newPair)}::jsonb
        )
        ON CONFLICT (conversation_id)
        DO UPDATE SET
          message = COALESCE(public.messages.message, '[]'::jsonb) || ${tx.json(newPair)}::jsonb,
          updated_at = NOW()
        RETURNING
          id::text AS id,
          message,
          created_at AS "createdAt",
          updated_at AS "updatedAt"
      `;

      const row = rows[0];

      if (!row) {
        throw new Error("Failed to save messages.");
      }

      await tx`
        UPDATE public.conversations
        SET updated_at = NOW()
        WHERE id = ${conversationId}::bigint
      `;

      return row as unknown as MessageRow;
    });

    return Response.json({
      messages: toChatMessages(updatedRow),
    });
  } catch (error) {
    console.error("POST messages error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to send message";

    return Response.json({ error: message }, { status: 500 });
  }
}
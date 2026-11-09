import { auth } from "@/lib/auth/server";
import { sql } from "@/lib/db";

type RouteContext = {
  params: Promise<{
    conversationId: string;
  }>;
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

// PATCH /api/conversations/:conversationId
export async function PATCH(
  request: Request,
  { params }: RouteContext,
) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { conversationId } = await params;

    if (!isValidConversationId(conversationId)) {
      return Response.json(
        { error: "Invalid conversation ID" },
        { status: 400 },
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return Response.json(
        { error: "Invalid JSON body" },
        { status: 400 },
      );
    }

    if (
      typeof body !== "object" ||
      body === null ||
      Array.isArray(body) ||
      !("title" in body) ||
      typeof body.title !== "string" ||
      !body.title.trim() ||
      body.title.trim().length > 255
    ) {
      return Response.json(
        { error: "Title must be between 1 and 255 characters" },
        { status: 400 },
      );
    }

    const title = body.title.trim();

    const rows = await sql`
      UPDATE public.conversations AS c
      SET
        title = ${title},
        updated_at = NOW()
      FROM public.profiles AS p
      WHERE
        c.profile_id = p.id
        AND p.user_id = ${user.id}::uuid
        AND c.id = ${conversationId}::bigint
      RETURNING
        c.id::text AS id,
        c.title,
        c.created_at AS "createdAt",
        c.updated_at AS "updatedAt"
    `;

    if (!rows[0]) {
      return Response.json(
        { error: "Conversation not found" },
        { status: 404 },
      );
    }

    return Response.json({
      conversation: rows[0],
    });
  } catch (error) {
    console.error("PATCH /api/conversations error:", error);

    return Response.json(
      { error: "Failed to update conversation" },
      { status: 500 },
    );
  }
}

// DELETE /api/conversations/:conversationId
export async function DELETE(
  _request: Request,
  { params }: RouteContext,
) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { conversationId } = await params;

    if (!isValidConversationId(conversationId)) {
      return Response.json(
        { error: "Invalid conversation ID" },
        { status: 400 },
      );
    }

    const rows = await sql`
      DELETE FROM public.conversations AS c
      USING public.profiles AS p
      WHERE
        c.profile_id = p.id
        AND p.user_id = ${user.id}::uuid
        AND c.id = ${conversationId}::bigint
      RETURNING c.id::text AS id
    `;

    if (!rows[0]) {
      return Response.json(
        { error: "Conversation not found" },
        { status: 404 },
      );
    }

    return Response.json({
      message: "Conversation deleted successfully",
      id: rows[0].id,
    });
  } catch (error) {
    console.error("DELETE /api/conversations error:", error);

    return Response.json(
      { error: "Failed to delete conversation" },
      { status: 500 },
    );
  }
}
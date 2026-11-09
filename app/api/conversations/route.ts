import { auth } from "@/lib/auth/server";
import { sql } from "@/lib/db";

async function getAuthenticatedUser() {
  const { data, error } = await auth.getSession();

  if (error || !data?.session || !data?.user) {
    return null;
  }

  return data.user;
}

async function ensureProfile(userId: string): Promise<string> {
  await sql`
    INSERT INTO public.profiles (user_id)
    VALUES (${userId}::uuid)
    ON CONFLICT (user_id) DO NOTHING
  `;

  const profiles = await sql`
    SELECT id::text AS id
    FROM public.profiles
    WHERE user_id = ${userId}::uuid
    LIMIT 1
  `;

  if (!profiles[0]) {
    throw new Error("Could not find or create user profile.");
  }

  return profiles[0].id as string;
}

// GET /api/conversations
export async function GET() {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const profileId = await ensureProfile(user.id);

    const conversations = await sql`
      SELECT
        id::text AS id,
        title,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM public.conversations
      WHERE profile_id = ${profileId}::uuid
      ORDER BY updated_at DESC, id DESC
    `;

    return Response.json({ conversations });
  } catch (error) {
    console.error("GET /api/conversations error:", error);

    return Response.json(
      { error: "Failed to fetch conversations" },
      { status: 500 },
    );
  }
}

// POST /api/conversations
export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    let body: unknown = {};

    try {
      body = await request.json();
    } catch {
      // An empty body is allowed; use the default title.
    }

    let title = "New chat";

    if (
      typeof body === "object" &&
      body !== null &&
      !Array.isArray(body) &&
      "title" in body
    ) {
      const inputTitle = body.title;

      if (
        typeof inputTitle !== "string" ||
        inputTitle.trim().length === 0 ||
        inputTitle.trim().length > 255
      ) {
        return Response.json(
          { error: "Title must be between 1 and 255 characters" },
          { status: 400 },
        );
      }

      title = inputTitle.trim();
    }

    const profileId = await ensureProfile(user.id);

    const rows = await sql`
      INSERT INTO public.conversations (
        profile_id,
        title
      )
      VALUES (
        ${profileId}::uuid,
        ${title}
      )
      RETURNING
        id::text AS id,
        title,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
    `;

    return Response.json(
      { conversation: rows[0] },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/conversations error:", error);

    return Response.json(
      { error: "Failed to create conversation" },
      { status: 500 },
    );
  }
}
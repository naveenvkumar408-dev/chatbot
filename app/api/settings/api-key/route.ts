import { auth } from "@/lib/auth/server";
import { sql } from "@/lib/db";
import { encryptApiKey, maskApiKey } from "@/lib/crypto";

async function getProfileId(): Promise<string | null> {
  const { data, error } = await auth.getSession();

  if (error || !data?.session || !data?.user) {
    return null;
  }

  const rows = await sql`
    SELECT id::text AS id
    FROM public.profiles
    WHERE user_id = ${data.user.id}::uuid
    LIMIT 1
  `;

  return rows[0]?.id ?? null;
}

// GET /api/settings/api-key
export async function GET() {
  try {
    const profileId = await getProfileId();

    if (!profileId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rows = await sql`
      SELECT
        key_hint AS "keyHint",
        updated_at AS "updatedAt"
      FROM public.api_keys
      WHERE profile_id = ${profileId} AND provider = 'gemini'
      LIMIT 1
    `;

    const row = rows[0];

    return Response.json({
      configured: Boolean(row),
      keyHint: row?.keyHint ?? null,
      updatedAt: row?.updatedAt ? new Date(row.updatedAt).toISOString() : null,
    });
  } catch (error) {
    console.error("GET api-key error:", error);
    return Response.json(
      { error: "Failed to load API configuration" },
      { status: 500 },
    );
  }
}

// PUT /api/settings/api-key
export async function PUT(request: Request) {
  try {
    const profileId = await getProfileId();

    if (!profileId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);

    if (
      !body ||
      typeof body !== "object" ||
      !("apiKey" in body) ||
      typeof body.apiKey !== "string"
    ) {
      return Response.json({ error: "API key is required" }, { status: 400 });
    }

    const apiKey = body.apiKey.trim();

    if (apiKey.length < 15 || apiKey.length > 256) {
      return Response.json(
        { error: "Please enter a valid Gemini API key" },
        { status: 400 },
      );
    }

    const encryptedKey = encryptApiKey(apiKey);
    const keyHint = maskApiKey(apiKey);

    const rows = await sql`
      INSERT INTO public.api_keys (profile_id, provider, encrypted_key, key_hint)
      VALUES (${profileId}, 'gemini', ${encryptedKey}, ${keyHint})
      ON CONFLICT (profile_id, provider)
      DO UPDATE SET
        encrypted_key = EXCLUDED.encrypted_key,
        key_hint = EXCLUDED.key_hint,
        updated_at = NOW()
      RETURNING key_hint AS "keyHint", updated_at AS "updatedAt"
    `;

    return Response.json({
      configured: true,
      keyHint: rows[0].keyHint,
      updatedAt: new Date(rows[0].updatedAt).toISOString(),
    });
  } catch (error) {
    console.error("PUT api-key error:", error);
    return Response.json(
      { error: "Failed to save API key" },
      { status: 500 },
    );
  }
}

// DELETE /api/settings/api-key
export async function DELETE() {
  try {
    const profileId = await getProfileId();

    if (!profileId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await sql`
      DELETE FROM public.api_keys
      WHERE profile_id = ${profileId} AND provider = 'gemini'
    `;

    return Response.json({ configured: false, keyHint: null, updatedAt: null });
  } catch (error) {
    console.error("DELETE api-key error:", error);
    return Response.json(
      { error: "Failed to remove API key" },
      { status: 500 },
    );
  }
}
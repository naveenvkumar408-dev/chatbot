import { auth } from "@/lib/auth/server";
import { sql } from "@/lib/db";
import { getProfileImageUrl } from "@/lib/s3";

export async function GET() {
  try {
    const { data, error } = await auth.getSession();

    if (error || !data?.session || !data?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = data.user.id;

    const rows = await sql`
      SELECT
        u.id,
        u.name,
        u.email,
        u.image,
        p.bio,
        p.image_key AS "imageKey"
      FROM neon_auth."user" AS u
      LEFT JOIN public.profiles AS p
        ON p.user_id = u.id
      WHERE u.id = ${userId}::uuid
      LIMIT 1
    `;

    if (rows.length === 0) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const profile = rows[0];

    const imageKey = (profile.imageKey as string | null) ?? null;

    const imageUrl = imageKey
      ? await getProfileImageUrl(imageKey)
      : ((profile.image as string | null) ?? null);

    return Response.json({
      id: profile.id,
      name: profile.name,
      email: profile.email,
      bio: profile.bio ?? "",
      imageKey,
      imageUrl,
    });
  } catch (error) {
    console.error("GET /api/profile error:", error);

    return Response.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { data, error } = await auth.getSession();

    if (error || !data?.session || !data?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return Response.json(
        { error: "Request body must be an object" },
        { status: 400 },
      );
    }

    const input = body as Record<string, unknown>;
    const updateName = Object.hasOwn(input, "name");
    const updateBio = Object.hasOwn(input, "bio");

    if (!updateName && !updateBio) {
      return Response.json(
        { error: "Provide a name or bio to update" },
        { status: 400 },
      );
    }

    let name: string | undefined;
    let bio: string | undefined;

    if (updateName) {
      if (
        typeof input.name !== "string" ||
        input.name.trim().length === 0 ||
        input.name.trim().length > 100
      ) {
        return Response.json(
          { error: "Name must be between 1 and 100 characters" },
          { status: 400 },
        );
      }

      name = input.name.trim();
    }

    if (updateBio) {
      if (typeof input.bio !== "string" || input.bio.length > 500) {
        return Response.json(
          { error: "Bio must be a string of at most 500 characters" },
          { status: 400 },
        );
      }

      bio = input.bio.trim();
    }

    const userId = data.user.id;

    await sql.begin(async (tx) => {
      if (name !== undefined) {
        await tx`
          UPDATE neon_auth."user"
          SET
            name = ${name},
            "updatedAt" = NOW()
          WHERE id = ${userId}::uuid
        `;
      }

      if (bio !== undefined) {
        await tx`
          INSERT INTO public.profiles (user_id, bio)
          VALUES (${userId}::uuid, ${bio})
          ON CONFLICT (user_id)
          DO UPDATE SET
            bio = EXCLUDED.bio,
            updated_at = NOW()
        `;
      }
    });

    return Response.json({
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("PATCH /api/profile error:", error);

    return Response.json(
      { error: "Failed to update profile" },
      { status: 500 },
    );
  }
}

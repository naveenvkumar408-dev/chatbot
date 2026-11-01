import { randomUUID } from "node:crypto";
import { auth } from "@/lib/auth/server";
import { sql } from "@/lib/db";
import { s3, S3_BUCKET, PutObjectCommand, DeleteObjectCommand } from "@/lib/s3";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const allowedTypes = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;

type AllowedImageType = keyof typeof allowedTypes;

export async function POST(request: Request) {
  try {
    const { data, error } = await auth.getSession();

    if (error || !data?.session || !data?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return Response.json(
        { error: "Select an image file using the 'file' field" },
        { status: 400 },
      );
    }

    if (file.size === 0 || file.size > MAX_FILE_SIZE) {
      return Response.json(
        { error: "Image must be between 1 byte and 5 MB" },
        { status: 400 },
      );
    }

    if (
      !Object.hasOwn(allowedTypes, file.type) ||
      !file.type.startsWith("image/")
    ) {
      return Response.json(
        { error: "Only JPEG, PNG, and WebP images are supported" },
        { status: 400 },
      );
    }

    const contentType = file.type as AllowedImageType;
    const extension = allowedTypes[contentType];
    const userId = data.user.id;

    const existingRows = await sql`
      SELECT image_key AS "imageKey"
      FROM public.profiles
      WHERE user_id = ${userId}::uuid
      LIMIT 1
    `;

    const oldKey = existingRows[0]?.imageKey as string | null | undefined;
    const folder = (process.env.S3_BUCKET_FOLDER ?? "uploads").replace(
      /^\/+|\/+$/g,
      "",
    );

    const key = [
      folder,
      "profile-images",
      userId,
      `${randomUUID()}.${extension}`,
    ]
      .filter(Boolean)
      .join("/");

    const bytes = Buffer.from(await file.arrayBuffer());

    await s3.send(
      new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: key,
        Body: bytes,
        ContentType: contentType,
      }),
    );

    try {
      await sql`
        INSERT INTO public.profiles (user_id, image_key)
        VALUES (${userId}::uuid, ${key})
        ON CONFLICT (user_id)
        DO UPDATE SET
          image_key = EXCLUDED.image_key,
          updated_at = NOW()
      `;
    } catch (dbError) {
      // Avoid leaving an unreferenced upload if the database update fails.
      await s3
        .send(
          new DeleteObjectCommand({
            Bucket: S3_BUCKET,
            Key: key,
          }),
        )
        .catch(() => undefined);

      throw dbError;
    }

    // Delete the old image only after the new key is saved.
    if (oldKey && oldKey !== key) {
      await s3
        .send(
          new DeleteObjectCommand({
            Bucket: S3_BUCKET,
            Key: oldKey,
          }),
        )
        .catch((deleteError) => {
          console.error("Could not delete old profile image:", deleteError);
        });
    }

    return Response.json(
      { message: "Profile image uploaded successfully", imageKey: key },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/profile/image error:", error);
    return Response.json(
      {
        error: "Failed to upload profile image",
        details:
          process.env.NODE_ENV === "development" && error instanceof Error
            ? error.message
            : undefined,
      },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  try {
    const { data, error } = await auth.getSession();

    if (error || !data?.session || !data?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = data.user.id;

    const rows = await sql`
    SELECT image_key AS "imageKey"
    FROM public.profiles
    WHERE user_id = ${userId}::uuid
    LIMIT 1
`;

    const key = (rows[0]?.imageKey as string | null | undefined) ?? null;

    // Keep the profile and bio; only remove the image reference.
    await sql`
    UPDATE public.profiles
    SET image_key = NULL,
        updated_at = NOW()
    WHERE user_id = ${userId}::uuid
`;

    if (key) {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: S3_BUCKET,
          Key: key,
        }),
      );
    }

    return Response.json({ message: "Profile image removed" });
  } catch (error) {
    console.error("DELETE /api/profile/image error:", error);

    return Response.json(
      { error: "Failed to remove profile image" },
      { status: 500 },
    );
  }
}

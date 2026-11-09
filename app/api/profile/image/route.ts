import { randomUUID } from "node:crypto";

import { auth } from "@/lib/auth/server";
import { sql } from "@/lib/db";
import {
  s3,
  S3_BUCKET,
  PutObjectCommand,
  DeleteObjectCommand,
  getProfileImageUrl,
} from "@/lib/s3";

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

    if (!Object.hasOwn(allowedTypes, file.type)) {
      return Response.json(
        { error: "Only JPEG, PNG, and WebP images are supported" },
        { status: 400 },
      );
    }

    const contentType = file.type as AllowedImageType;
    const extension = allowedTypes[contentType];
    const userId = data.user.id;

    // Find the user's previously uploaded image.
    const existingRows = await sql`
      SELECT image_key AS "imageKey"
      FROM public.profiles
      WHERE user_id = ${userId}::uuid
      LIMIT 1
    `;

    const oldKey =
      (existingRows[0]?.imageKey as string | null | undefined) ?? null;

    // The bucket is "uploads"; "profile-images" is an object-key prefix.
    const key = `profile-images/${randomUUID()}.${extension}`;

    // Uint8Array is accepted by the AWS SDK as a binary object body.
    const body = new Uint8Array(await file.arrayBuffer());

    // Upload the new image.
    await s3.send(
      new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: key,
        Body: body,
        ContentType: contentType,
        CacheControl: "no-store, no-cache, must-revalidate",
      }),
    );

    try {
      // Save the new image key in PostgreSQL.
      await sql`
        INSERT INTO public.profiles (user_id, image_key)
        VALUES (${userId}::uuid, ${key})
        ON CONFLICT (user_id)
        DO UPDATE SET
          image_key = EXCLUDED.image_key,
          updated_at = NOW()
      `;
    } catch (dbError) {
      // If saving the key fails, remove the newly uploaded object.
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

    // Delete the previous image only after the new key is saved.
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

    // Generate a URL that the frontend can display immediately.
    const imageUrl = await getProfileImageUrl(key);

    return Response.json(
      {
        message: "Profile image uploaded successfully",
        imageKey: key,
        imageUrl,
      },
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

    const key =
      (rows[0]?.imageKey as string | null | undefined) ?? null;

    // Remove the image reference from the database first.
    await sql`
      UPDATE public.profiles
      SET
        image_key = NULL,
        updated_at = NOW()
      WHERE user_id = ${userId}::uuid
    `;

    // Delete the actual object. A storage deletion failure should not
    // prevent the application from showing the initials fallback.
    if (key) {
      await s3
        .send(
          new DeleteObjectCommand({
            Bucket: S3_BUCKET,
            Key: key,
          }),
        )
        .catch((deleteError) => {
          console.error("Could not delete profile image:", deleteError);
        });
    }

    return Response.json({
      message: "Profile image removed",
      imageKey: null,
      imageUrl: null,
    });
  } catch (error) {
    console.error("DELETE /api/profile/image error:", error);

    return Response.json(
      { error: "Failed to remove profile image" },
      { status: 500 },
    );
  }
}
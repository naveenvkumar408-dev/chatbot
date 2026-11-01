import "server-only";

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const endpoint = process.env.AWS_ENDPOINT_URL_S3;
const region = process.env.AWS_REGION;
const bucket = process.env.NEON_STORAGE_BUCKET ?? "uploads";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const folder = process.env.S3_BUCKET_FOLDER ?? "profile-images";

if (!endpoint || !region || !bucket || !accessKeyId || !secretAccessKey) {
  throw new Error(
    "Neon Storage configuration is incomplete. Check your storage environment variables.",
  );
}

export const s3 = new S3Client({
  endpoint,
  region,
  forcePathStyle: true,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export const S3_BUCKET = bucket;

const baseFolder = (folder || "profile-images").replace(/^\/+|\/+$/g, "");

export function createProfileImageKey(userId: string, extension: string) {
  return `${baseFolder}/${userId}/${crypto.randomUUID()}.${extension}`;
}

export async function getProfileImageUrl(key: string) {
  return getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
    }),
    { expiresIn: 3600 },
  );
}

console.log("Neon Storage configuration:", {
  endpointConfigured: Boolean(process.env.AWS_ENDPOINT_URL_S3),
  regionConfigured: Boolean(process.env.AWS_REGION),
  accessKeyConfigured: Boolean(process.env.AWS_ACCESS_KEY_ID),
  secretConfigured: Boolean(process.env.AWS_SECRET_ACCESS_KEY),
  bucket: bucket,
});

export { PutObjectCommand, DeleteObjectCommand, GetObjectCommand };

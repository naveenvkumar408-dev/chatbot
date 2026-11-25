import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";

function getSecretKey(): Buffer {
  const hex = process.env.API_KEY_ENCRYPTION_SECRET;

  if (!hex || hex.length !== 64) {
    throw new Error(
      "API_KEY_ENCRYPTION_SECRET must be a 64-character hex string.",
    );
  }

  return Buffer.from(hex, "hex");
}

export function encryptApiKey(plainText: string): string {
  const key = getSecretKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(plainText, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  // Store as iv:authTag:ciphertext (base64)
  return [
    iv.toString("base64"),
    authTag.toString("base64"),
    encrypted.toString("base64"),
  ].join(":");
}

export function decryptApiKey(payload: string): string {
  const [ivB64, authTagB64, encryptedB64] = payload.split(":");

  if (!ivB64 || !authTagB64 || !encryptedB64) {
    throw new Error("Invalid encrypted API key format.");
  }

  const key = getSecretKey();
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    key,
    Buffer.from(ivB64, "base64"),
  );
  decipher.setAuthTag(Buffer.from(authTagB64, "base64"));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedB64, "base64")),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}

export function maskApiKey(apiKey: string): string {
  if (apiKey.length <= 8) return "••••••••";
  return `${apiKey.slice(0, 4)}••••••••${apiKey.slice(-4)}`;
}
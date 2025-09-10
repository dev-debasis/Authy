import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const ALGORITHM = process.env.ALGORITHM;
const KEY = Buffer.from(process.env.CREDENTIALS_ENCRYPTION_KEY, "utf-8");
const IV_LENGTH = parseInt(process.env.IV_LENGTH, 10);

export function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

export function decrypt(text) {
  const [ivHex, encryptedData] = text.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

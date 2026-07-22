import { cookies } from "next/headers";

export const OWNER_COOKIE = "scouter_owner";

const SESSION_DURATION_SECONDS = 60 * 60 * 12;

function configuredPassword() {
  return process.env.SCOUTER_OWNER_PASSWORD;
}

function hex(value: ArrayBuffer) {
  return Array.from(new Uint8Array(value), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function sameValue(left: string, right: string) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

async function sign(value: string) {
  const password = configuredPassword();
  if (!password) return null;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return hex(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value)));
}

export function isOwnerAccessConfigured() {
  return Boolean(configuredPassword());
}

export async function passwordMatches(value: string) {
  const password = configuredPassword();
  if (!password) return false;
  return sameValue(value, password);
}

export async function createOwnerSession() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS;
  const signature = await sign(String(expiresAt));
  return signature ? `${expiresAt}.${signature}` : null;
}

export async function hasOwnerSession() {
  const session = (await cookies()).get(OWNER_COOKIE)?.value;
  if (!session) return false;

  const [expiresAt, signature, ...rest] = session.split(".");
  if (!expiresAt || !signature || rest.length > 0 || Number(expiresAt) <= Date.now() / 1000) return false;

  const expectedSignature = await sign(expiresAt);
  if (!expectedSignature) return false;
  return sameValue(signature, expectedSignature);
}

export const ownerSessionMaxAge = SESSION_DURATION_SECONDS;

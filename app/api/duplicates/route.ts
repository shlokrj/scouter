import { hasOwnerSession } from "../../lib/owner-auth";
import { markManualDuplicate, removeManualDuplicate } from "../../lib/manual-duplicate-store";

function applyUrlFrom(body: unknown) {
  const value = body && typeof body === "object" ? (body as { applyUrl?: unknown }).applyUrl : null;
  if (typeof value !== "string") return null;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

async function readApplyUrl(request: Request) {
  return applyUrlFrom(await request.json().catch(() => null));
}

export async function POST(request: Request) {
  if (!(await hasOwnerSession())) return Response.json({ message: "Owner access required." }, { status: 401 });
  const applyUrl = await readApplyUrl(request);
  if (!applyUrl) return Response.json({ message: "A valid application URL is required." }, { status: 400 });

  return Response.json(await markManualDuplicate(applyUrl));
}

export async function DELETE(request: Request) {
  if (!(await hasOwnerSession())) return Response.json({ message: "Owner access required." }, { status: 401 });
  const applyUrl = await readApplyUrl(request);
  if (!applyUrl) return Response.json({ message: "A valid application URL is required." }, { status: 400 });

  return Response.json(await removeManualDuplicate(applyUrl));
}

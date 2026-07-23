import { hasOwnerSession } from "../../../lib/owner-auth";
import { isSmsAlertEligible, sendSmsAlert, type SmsOpening } from "../../../lib/sms-alerts";

function readOpening(value: unknown): SmsOpening | null {
  if (!value || typeof value !== "object") return null;
  const opening = value as Record<string, unknown>;
  const priority = opening.priority;

  if (typeof opening.id !== "string"
    || typeof opening.company !== "string"
    || typeof opening.position !== "string"
    || typeof opening.applyUrl !== "string"
    || (priority !== "all" && priority !== "top" && priority !== "faang")
    || typeof opening.summer2027Confirmed !== "boolean"
    || typeof opening.undergraduateConfirmed !== "boolean"
    || typeof opening.isNewToday !== "boolean") {
    return null;
  }

  return {
    id: opening.id,
    company: opening.company,
    position: opening.position,
    applyUrl: opening.applyUrl,
    priority,
    summer2027Confirmed: opening.summer2027Confirmed,
    undergraduateConfirmed: opening.undergraduateConfirmed,
    isNewToday: opening.isNewToday,
  };
}

export async function POST(request: Request) {
  if (!(await hasOwnerSession())) {
    return Response.json({ message: "Owner access required." }, { status: 401 });
  }

  const body = await request.json().catch(() => null) as { opening?: unknown } | null;
  const opening = readOpening(body?.opening);
  if (!opening) {
    return Response.json({ message: "A complete opening is required." }, { status: 400 });
  }
  if (!isSmsAlertEligible(opening)) {
    return Response.json({ message: "Only new, confirmed undergraduate Summer 2027 roles at top companies can alert." }, { status: 400 });
  }

  try {
    const result = await sendSmsAlert(opening);
    if (result.status === "disabled") {
      return Response.json({ message: "SMS alerts are not configured." }, { status: 503 });
    }
    return Response.json({ sent: result.status === "sent" });
  } catch {
    return Response.json({ message: "Unable to send the SMS alert." }, { status: 502 });
  }
}

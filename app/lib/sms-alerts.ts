type AlertPriority = "all" | "top" | "faang";

export type SmsOpening = {
  id: string;
  company: string;
  position: string;
  applyUrl: string;
  priority: AlertPriority;
  summer2027Confirmed: boolean;
  undergraduateConfirmed: boolean;
  isNewToday: boolean;
};

type SmsSettings = {
  accountSid: string;
  authToken: string;
  from: string;
  to: string;
};

export type SmsAlertResult =
  | { status: "disabled" }
  | { status: "ineligible" }
  | { status: "sent"; providerId: string | null };

function smsSettings(): SmsSettings | null {
  if (process.env.SCOUTER_SMS_ENABLED !== "true") return null;

  const accountSid = process.env.SCOUTER_TWILIO_ACCOUNT_SID;
  const authToken = process.env.SCOUTER_TWILIO_AUTH_TOKEN;
  const from = process.env.SCOUTER_TWILIO_FROM;
  const to = process.env.SCOUTER_SMS_TO;
  if (!accountSid || !authToken || !from || !to) return null;

  return { accountSid, authToken, from, to };
}

export function isSmsAlertEligible(opening: SmsOpening) {
  return (opening.priority === "top" || opening.priority === "faang")
    && opening.summer2027Confirmed
    && opening.undergraduateConfirmed
    && opening.isNewToday;
}

export function smsAlertText(opening: SmsOpening) {
  const company = opening.company.slice(0, 56);
  const position = opening.position.slice(0, 112);
  return `scouter — ${company}\n${position}\n${opening.applyUrl}`;
}

export async function sendSmsAlert(opening: SmsOpening): Promise<SmsAlertResult> {
  const settings = smsSettings();
  if (!settings) return { status: "disabled" };
  if (!isSmsAlertEligible(opening)) return { status: "ineligible" };

  const authorization = `Basic ${btoa(`${settings.accountSid}:${settings.authToken}`)}`;
  const body = new URLSearchParams({
    To: settings.to,
    From: settings.from,
    Body: smsAlertText(opening),
  });
  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(settings.accountSid)}/Messages.json`,
    {
      method: "POST",
      headers: {
        authorization,
        "content-type": "application/x-www-form-urlencoded",
      },
      body,
    },
  );

  if (!response.ok) {
    throw new Error(`SMS provider returned ${response.status}`);
  }

  const payload = await response.json().catch(() => null) as { sid?: unknown } | null;
  return { status: "sent", providerId: typeof payload?.sid === "string" ? payload.sid : null };
}

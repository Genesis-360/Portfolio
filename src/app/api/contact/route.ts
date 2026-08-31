import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  // Honeypot — must remain empty. Bots fill every field; humans don't see it.
  company?: unknown;
};

const MAX_FIELD_LENGTH = 5_000;
const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 320;

function asTrimmedString(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

function isValidEmail(s: string): boolean {
  // Conservative check; full RFC 5322 isn't worth implementing in-app.
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) && s.length <= MAX_EMAIL_LENGTH;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "hello@oreenza.com";
  const from = process.env.CONTACT_FROM_EMAIL ?? "Oreenza <noreply@oreenza.com>";

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot trip: silently accept-and-drop.
  if (typeof body.company === "string" && body.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = asTrimmedString(body.name, MAX_NAME_LENGTH);
  const email = asTrimmedString(body.email, MAX_EMAIL_LENGTH);
  const message = asTrimmedString(body.message, MAX_FIELD_LENGTH);

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  if (!apiKey) {
    // Surface the misconfiguration loudly rather than silently failing.
    return NextResponse.json(
      { error: "Email service is not configured. Email us directly at " + to + "." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const subject = `New project enquiry — ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    message,
    "",
    "—",
    `Sent from ${request.headers.get("referer") ?? "oreenza.com"}`,
    `IP: ${request.headers.get("x-forwarded-for") ?? "unknown"}`,
  ].join("\n");

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject,
    text,
  });

  if (error) {
    return NextResponse.json(
      { error: "Could not send right now. Please email " + to + " directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  budget?: unknown;
  // Honeypot — must remain empty. Bots fill every field; humans don't see it.
  company?: unknown;
};

const MAX_FIELD_LENGTH = 5_000;
const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 320;
const MAX_BUDGET_LENGTH = 50;

const BUDGET_LABELS: Record<string, string> = {
  "under-5k": "Under $5,000",
  "5k-15k": "$5,000 – $15,000",
  "15k-50k": "$15,000 – $50,000",
  "50k-plus": "$50,000+",
};

function asTrimmedString(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) && s.length <= MAX_EMAIL_LENGTH;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "hello@oreenza.com";
  const from = process.env.CONTACT_FROM_EMAIL ?? "OREENZA <hello@oreenza.com>";

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
  const budget = asTrimmedString(body.budget, MAX_BUDGET_LENGTH);
  const budgetLabel = budget ? (BUDGET_LABELS[budget] ?? budget) : "Not specified";

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
    return NextResponse.json(
      { error: "Email service is not configured. Email us directly at " + to + "." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const subject = `New project enquiry — ${name}${budget ? ` (${budgetLabel})` : ""}`;
  const referer = request.headers.get("referer") ?? "oreenza.com";
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  // Plain text version
  const text = [
    "═══════════════════════════════════════",
    "  NEW PROJECT ENQUIRY",
    "═══════════════════════════════════════",
    "",
    `  Name:    ${name}`,
    `  Email:   ${email}`,
    `  Budget:  ${budgetLabel}`,
    `  Date:    ${timestamp}`,
    "",
    "───────────────────────────────────────",
    "  MESSAGE",
    "───────────────────────────────────────",
    "",
    message,
    "",
    "───────────────────────────────────────",
    `  Page:    ${referer}`,
    `  IP:      ${ip}`,
    "═══════════════════════════════════════",
  ].join("\n");

  // HTML version for better readability
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <!-- Header -->
    <div style="background:#F58327;padding:24px 32px;">
      <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">
        New Project Enquiry
      </h1>
    </div>
    
    <!-- Content -->
    <div style="padding:32px;">
      <!-- Contact Info -->
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:1px;width:100px;">Name</td>
          <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;color:#000;font-size:15px;font-weight:600;">${name}</td>
        </tr>
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Email</td>
          <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;color:#000;font-size:15px;">
            <a href="mailto:${email}" style="color:#F58327;text-decoration:none;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Budget</td>
          <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;color:#000;font-size:15px;font-weight:600;">${budgetLabel}</td>
        </tr>
        <tr>
          <td style="padding:12px 0;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Date</td>
          <td style="padding:12px 0;color:#000;font-size:15px;">${timestamp}</td>
        </tr>
      </table>
      
      <!-- Message -->
      <div style="margin-bottom:24px;">
        <h2 style="margin:0 0 12px 0;color:#333;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Message</h2>
        <div style="padding:16px;background:#f9f9f9;border-radius:6px;border-left:3px solid #F58327;color:#333;font-size:15px;line-height:1.6;white-space:pre-wrap;">${message}</div>
      </div>
      
      <!-- Meta -->
      <div style="padding-top:16px;border-top:1px solid #f0f0f0;font-size:12px;color:#999;">
        <p style="margin:0 0 4px 0;">Page: ${referer}</p>
        <p style="margin:0;">IP: ${ip}</p>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="padding:16px 32px;background:#f9f9f9;text-align:center;">
      <p style="margin:0;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:1px;">
        Reply to this email to respond directly to ${name}
      </p>
    </div>
  </div>
</body>
</html>
`;

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject,
    text,
    html,
  });

  if (error) {
    return NextResponse.json(
      { error: "Could not send right now. Please email " + to + " directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

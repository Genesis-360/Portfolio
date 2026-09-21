import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  budget?: unknown;
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

  // Internal notification email
  const internalHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <div style="background:#F58327;padding:24px 32px;">
      <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">New Project Enquiry</h1>
    </div>
    <div style="padding:32px;">
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr><td style="padding:12px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:1px;width:100px;">Name</td><td style="padding:12px 0;border-bottom:1px solid #f0f0f0;color:#000;font-size:15px;font-weight:600;">${name}</td></tr>
        <tr><td style="padding:12px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Email</td><td style="padding:12px 0;border-bottom:1px solid #f0f0f0;color:#000;font-size:15px;"><a href="mailto:${email}" style="color:#F58327;text-decoration:none;">${email}</a></td></tr>
        <tr><td style="padding:12px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Budget</td><td style="padding:12px 0;border-bottom:1px solid #f0f0f0;color:#000;font-size:15px;font-weight:600;">${budgetLabel}</td></tr>
        <tr><td style="padding:12px 0;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Date</td><td style="padding:12px 0;color:#000;font-size:15px;">${timestamp}</td></tr>
      </table>
      <h2 style="margin:0 0 12px 0;color:#333;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Message</h2>
      <div style="padding:16px;background:#f9f9f9;border-radius:6px;border-left:3px solid #F58327;color:#333;font-size:15px;line-height:1.6;white-space:pre-wrap;">${message}</div>
      <div style="margin-top:24px;padding-top:16px;border-top:1px solid #f0f0f0;font-size:12px;color:#999;">
        <p style="margin:0 0 4px 0;">Page: ${referer}</p><p style="margin:0;">IP: ${ip}</p>
      </div>
    </div>
    <div style="padding:16px 32px;background:#f9f9f9;text-align:center;">
      <p style="margin:0;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:1px;">Reply to this email to respond directly to ${name}</p>
    </div>
  </div>
</body>
</html>`;

  // Auto-reply to customer
  const autoReplyHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <div style="background:#F58327;padding:24px 32px;">
      <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">We Got Your Message</h1>
    </div>
    <div style="padding:32px;">
      <p style="margin:0 0 16px 0;color:#333;font-size:16px;line-height:1.6;">Hi <strong>${name}</strong>,</p>
      <p style="margin:0 0 16px 0;color:#333;font-size:16px;line-height:1.6;">Thanks for reaching out to OREENZA. We've received your enquiry and our team will review it shortly.</p>
      <p style="margin:0 0 24px 0;color:#333;font-size:16px;line-height:1.6;">We aim to respond within <strong>24 hours</strong> during business days. In the meantime, feel free to:</p>
      
      <div style="margin-bottom:24px;">
        <a href="https://oreenza.com/book" style="display:inline-block;background:#F58327;color:#000000;text-decoration:none;padding:12px 24px;border-radius:6px;font-weight:600;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Book a Discovery Call</a>
      </div>
      
      <p style="margin:0 0 8px 0;color:#666;font-size:14px;line-height:1.6;">Your enquiry details:</p>
      <div style="padding:16px;background:#f9f9f9;border-radius:6px;border-left:3px solid #F58327;color:#333;font-size:14px;line-height:1.6;">
        <p style="margin:0 0 8px 0;"><strong>Budget:</strong> ${budgetLabel}</p>
        <p style="margin:0;white-space:pre-wrap;">${message.slice(0, 200)}${message.length > 200 ? "..." : ""}</p>
      </div>
    </div>
    <div style="padding:24px 32px;background:#f9f9f9;text-align:center;">
      <p style="margin:0 0 8px 0;font-size:14px;color:#333;font-weight:600;">OREENZA</p>
      <p style="margin:0 0 16px 0;font-size:12px;color:#999;text-transform:uppercase;letter-spacing:1px;">AI-Powered Design & Development Agency</p>
      <p style="margin:0;font-size:11px;color:#999;">hello@oreenza.com · oreenza.com</p>
    </div>
  </div>
</body>
</html>`;

  const autoReplyText = [
    `Hi ${name},`,
    "",
    "Thanks for reaching out to OREENZA. We've received your enquiry and our team will review it shortly.",
    "",
    "We aim to respond within 24 hours during business days.",
    "",
    "Book a discovery call: https://oreenza.com/book",
    "",
    "Your enquiry details:",
    `Budget: ${budgetLabel}`,
    "",
    message.slice(0, 200) + (message.length > 200 ? "..." : ""),
    "",
    "—",
    "OREENZA",
    "AI-Powered Design & Development Agency",
    "hello@oreenza.com · oreenza.com",
  ].join("\n");

  // Send internal notification
  const { error: internalError } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject,
    html: internalHtml,
  });

  // Send auto-reply to customer
  await resend.emails.send({
    from,
    to: email,
    subject: "We received your enquiry — OREENZA",
    html: autoReplyHtml,
    text: autoReplyText,
  });

  if (internalError) {
    return NextResponse.json(
      { error: "Could not send right now. Please email " + to + " directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

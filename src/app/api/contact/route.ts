import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  phone?: unknown;
  services?: unknown;
  budget?: unknown;
  timeline?: unknown;
  message?: unknown;
  website?: unknown;
};

const MAX_FIELD_LENGTH = 5_000;
const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 320;
const MAX_COMPANY_LENGTH = 200;
const MAX_PHONE_LENGTH = 40;
const MAX_BUDGET_LENGTH = 50;
const MAX_TIMELINE_LENGTH = 50;
const MAX_SERVICES = 8;
const MAX_SERVICE_LENGTH = 60;

const BUDGET_LABELS: Record<string, string> = {
  "under-5k": "Under $5,000",
  "5k-15k": "$5,000 – $15,000",
  "15k-50k": "$15,000 – $50,000",
  "50k-plus": "$50,000+",
};

const TIMELINE_LABELS: Record<string, string> = {
  asap: "ASAP — ready to start",
  "1-2-months": "In 1–2 months",
  "3-6-months": "In 3–6 months",
  exploring: "Just exploring",
};

function asTrimmedString(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

function asStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v
    .filter((x): x is string => typeof x === "string")
    .map((x) => x.trim())
    .filter(Boolean)
    .slice(0, MAX_SERVICES)
    .map((x) => x.slice(0, MAX_SERVICE_LENGTH));
}

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) && s.length <= MAX_EMAIL_LENGTH;
}

function siteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://oreenza.com";
  return `${base}${path}`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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

  // Honeypot — silent drop
  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = asTrimmedString(body.name, MAX_NAME_LENGTH);
  const email = asTrimmedString(body.email, MAX_EMAIL_LENGTH);
  const company = asTrimmedString(body.company, MAX_COMPANY_LENGTH);
  const phone = asTrimmedString(body.phone, MAX_PHONE_LENGTH);
  const services = asStringArray(body.services);
  const budget = asTrimmedString(body.budget, MAX_BUDGET_LENGTH);
  const timeline = asTrimmedString(body.timeline, MAX_TIMELINE_LENGTH);
  const message = asTrimmedString(body.message, MAX_FIELD_LENGTH);

  const budgetLabel = budget
    ? (BUDGET_LABELS[budget] ?? budget)
    : "Not specified";
  const timelineLabel = timeline
    ? (TIMELINE_LABELS[timeline] ?? timeline)
    : "Not specified";
  const servicesLabel = services.length ? services.join(", ") : "Not specified";

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ error: "Project details are required" }, { status: 400 });
  }

  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service is not configured. Email us directly at " + to + "." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const subject = `New project enquiry — ${name}${company ? ` · ${company}` : ""}${
    budget ? ` (${budgetLabel})` : ""
  }`;
  const referer = request.headers.get("referer") ?? "oreenza.com";
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const wordmarkUrl = siteUrl("/wordmark.svg");

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company);
  const safePhone = escapeHtml(phone);
  const safeMessage = escapeHtml(message);
  const safeServices = escapeHtml(servicesLabel);
  const safeBudget = escapeHtml(budgetLabel);
  const safeTimeline = escapeHtml(timelineLabel);
  const safeReferer = escapeHtml(referer);
  const safeIp = escapeHtml(ip);

  // ─── Internal notification email ───
  const internalHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>New Project Enquiry</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F5F5;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F5F5F5;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background-color:#000000;padding:28px 32px;text-align:center;">
              <img src="${wordmarkUrl}" alt="OREENZA" width="160" style="display:block;margin:0 auto 12px auto;height:24px;width:auto;" />
              <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#F58327;">New Project Enquiry</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:32px;">

              <!-- About you -->
              <p style="margin:0 0 4px 0;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#999999;">About you</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#999999;width:100px;vertical-align:top;">Name</td>
                  <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-size:15px;font-weight:600;color:#000000;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#999999;vertical-align:top;">Email</td>
                  <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-size:15px;"><a href="mailto:${safeEmail}" style="color:#F58327;text-decoration:none;font-weight:500;">${safeEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#999999;vertical-align:top;">Company</td>
                  <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-size:15px;color:#000000;">${safeCompany || "—"}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#999999;vertical-align:top;">Phone</td>
                  <td style="padding:12px 0;font-size:15px;color:#000000;">${safePhone || "—"}</td>
                </tr>
              </table>

              <!-- The project -->
              <p style="margin:0 0 4px 0;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#999999;">The project</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#999999;width:100px;vertical-align:top;">Services</td>
                  <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-size:15px;font-weight:600;color:#000000;">${safeServices}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#999999;vertical-align:top;">Budget</td>
                  <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-size:15px;font-weight:600;color:#000000;">${safeBudget}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#999999;vertical-align:top;">Timeline</td>
                  <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-size:15px;font-weight:600;color:#000000;">${safeTimeline}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#999999;vertical-align:top;">Date</td>
                  <td style="padding:12px 0;font-size:15px;color:#333333;">${timestamp}</td>
                </tr>
              </table>

              <!-- Message -->
              <p style="margin:0 0 12px 0;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#999999;">Project details</p>
              <div style="padding:20px;background-color:#F5F5F5;border-radius:8px;border-left:3px solid #F58327;font-size:15px;line-height:1.7;color:#333333;white-space:pre-wrap;">${safeMessage}</div>

              <!-- Meta -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;padding-top:20px;border-top:1px solid #f0f0f0;">
                <tr>
                  <td style="font-size:12px;color:#999999;">Page: ${safeReferer}</td>
                  <td align="right" style="font-size:12px;color:#999999;">IP: ${safeIp}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#000000;padding:24px 32px;text-align:center;">
              <p style="margin:0 0 8px 0;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#F5F5F5;">Reply to respond to ${safeName}</p>
              <p style="margin:0;font-size:10px;letter-spacing:1px;color:#F58327;">OREENZA · Performance-first Creative Agency</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  // ─── Auto-reply to customer ───
  const autoReplyHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>We received your enquiry</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F5F5;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F5F5F5;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background-color:#000000;padding:32px;text-align:center;">
              <img src="${wordmarkUrl}" alt="OREENZA" width="180" style="display:block;margin:0 auto;height:28px;width:auto;" />
            </td>
          </tr>

          <!-- Accent Bar -->
          <tr>
            <td style="background-color:#F58327;height:4px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:40px 32px;">

              <p style="margin:0 0 20px 0;font-size:17px;line-height:1.7;color:#333333;">Hi <strong style="color:#000000;">${safeName}</strong>,</p>

              <p style="margin:0 0 20px 0;font-size:17px;line-height:1.7;color:#333333;">Thanks for the details — we&apos;ve received your project enquiry and our team will review it shortly.</p>

              <p style="margin:0 0 32px 0;font-size:17px;line-height:1.7;color:#333333;">We aim to respond within <strong style="color:#000000;">24 hours</strong> during business days.</p>

              <!-- CTA Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 32px auto;">
                <tr>
                  <td style="background-color:#F58327;border-radius:8px;">
                    <a href="https://cal.com/oreenza/discovery-call" target="_blank" style="display:inline-block;padding:16px 36px;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#000000;text-decoration:none;">Book a Discovery Call</a>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                <tr><td style="border-top:1px solid #f0f0f0;font-size:0;line-height:0;height:1px;">&nbsp;</td></tr>
              </table>

              <!-- Enquiry Summary -->
              <p style="margin:0 0 12px 0;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#999999;">Your enquiry</p>
              <div style="padding:20px;background-color:#F5F5F5;border-radius:8px;border-left:3px solid #F58327;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="padding:0 0 6px 0;font-size:11px;color:#999999;letter-spacing:1.5px;text-transform:uppercase;">Services</td>
                    <td style="padding:0 0 6px 0;font-size:14px;font-weight:600;color:#333333;text-align:right;">${safeServices}</td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 6px 0;font-size:11px;color:#999999;letter-spacing:1.5px;text-transform:uppercase;">Budget</td>
                    <td style="padding:0 0 6px 0;font-size:14px;font-weight:600;color:#333333;text-align:right;">${safeBudget}</td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 14px 0;font-size:11px;color:#999999;letter-spacing:1.5px;text-transform:uppercase;">Timeline</td>
                    <td style="padding:0 0 14px 0;font-size:14px;font-weight:600;color:#333333;text-align:right;">${safeTimeline}</td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding:10px 0 0 0;border-top:1px solid #e8e8e8;font-size:11px;color:#999999;letter-spacing:1.5px;text-transform:uppercase;">Details</td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding:8px 0 0 0;font-size:14px;line-height:1.6;color:#333333;white-space:pre-wrap;">${safeMessage.slice(0, 300)}${message.length > 300 ? "…" : ""}</td>
                  </tr>
                </table>
              </div>

            </td>
          </tr>

          <!-- Accent Bar -->
          <tr>
            <td style="background-color:#F58327;height:4px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#000000;padding:32px;text-align:center;">
              <img src="${wordmarkUrl}" alt="OREENZA" width="120" style="display:block;margin:0 auto 16px auto;height:18px;width:auto;opacity:0.9;" />
              <p style="margin:0 0 8px 0;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#F5F5F5;">Performance-first Creative Agency</p>
              <p style="margin:0 0 20px 0;font-size:13px;color:#F58327;">
                <a href="mailto:hello@oreenza.com" style="color:#F58327;text-decoration:none;">hello@oreenza.com</a>
                <span style="color:#F5F5F5;margin:0 8px;">·</span>
                <a href="${siteUrl("/")}" style="color:#F58327;text-decoration:none;">oreenza.com</a>
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="padding:0 6px;"><a href="https://instagram.com/oreenza_agency" target="_blank" style="color:#F5F5F5;text-decoration:none;font-size:12px;">Instagram</a></td>
                  <td style="color:#F5F5F5;font-size:12px;">·</td>
                  <td style="padding:0 6px;"><a href="https://linkedin.com/company/oreenza" target="_blank" style="color:#F5F5F5;text-decoration:none;font-size:12px;">LinkedIn</a></td>
                  <td style="color:#F5F5F5;font-size:12px;">·</td>
                  <td style="padding:0 6px;"><a href="https://x.com/oreenza" target="_blank" style="color:#F5F5F5;text-decoration:none;font-size:12px;">Twitter</a></td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const autoReplyText = [
    "Hi " + name + ",",
    "",
    "Thanks for the details — we've received your project enquiry and our team will review it shortly.",
    "",
    "We aim to respond within 24 hours during business days.",
    "",
    "Book a discovery call: https://cal.com/oreenza/discovery-call",
    "",
    "Your enquiry:",
    "Services: " + servicesLabel,
    "Budget: " + budgetLabel,
    "Timeline: " + timelineLabel,
    "",
    message.slice(0, 300) + (message.length > 300 ? "…" : ""),
    "",
    "—",
    "OREENZA",
    "Performance-first Creative Agency",
    "hello@oreenza.com · https://oreenza.com",
  ].join("\n");

  const { error: internalError } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject,
    html: internalHtml,
  });

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

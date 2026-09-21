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

function siteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://oreenza.com";
  return `${base}${path}`;
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
  const wordmarkUrl = siteUrl("/wordmark.svg");

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
              <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#f63b05;">New Project Enquiry</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:32px;">
              
              <!-- Info Grid -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #f0f0f0;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#999999;width:90px;vertical-align:top;">Name</td>
                  <td style="padding:14px 0;border-bottom:1px solid #f0f0f0;font-size:15px;font-weight:600;color:#000000;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #f0f0f0;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#999999;vertical-align:top;">Email</td>
                  <td style="padding:14px 0;border-bottom:1px solid #f0f0f0;font-size:15px;"><a href="mailto:${email}" style="color:#f63b05;text-decoration:none;font-weight:500;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #f0f0f0;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#999999;vertical-align:top;">Budget</td>
                  <td style="padding:14px 0;border-bottom:1px solid #f0f0f0;font-size:15px;font-weight:600;color:#000000;">${budgetLabel}</td>
                </tr>
                <tr>
                  <td style="padding:14px 0;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#999999;vertical-align:top;">Date</td>
                  <td style="padding:14px 0;font-size:15px;color:#333333;">${timestamp}</td>
                </tr>
              </table>

              <!-- Message -->
              <p style="margin:0 0 12px 0;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#999999;">Message</p>
              <div style="padding:20px;background-color:#F5F5F5;border-radius:8px;border-left:3px solid #F58327;font-size:15px;line-height:1.7;color:#333333;white-space:pre-wrap;">${message}</div>

              <!-- Meta -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;padding-top:20px;border-top:1px solid #f0f0f0;">
                <tr>
                  <td style="font-size:12px;color:#999999;">Page: ${referer}</td>
                  <td align="right" style="font-size:12px;color:#999999;">IP: ${ip}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#000000;padding:24px 32px;text-align:center;">
              <p style="margin:0 0 8px 0;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#F5F5F5;">Reply to respond to ${name}</p>
              <p style="margin:0;font-size:10px;letter-spacing:1px;color:#f63b05;">OREENZA · Performance-first Creative Agency</p>
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
            <td style="background-color:#f63b05;height:4px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:40px 32px;">
              
              <p style="margin:0 0 20px 0;font-size:17px;line-height:1.7;color:#333333;">Hi <strong style="color:#000000;">${name}</strong>,</p>
              
              <p style="margin:0 0 20px 0;font-size:17px;line-height:1.7;color:#333333;">Thanks for reaching out to OREENZA. We've received your enquiry and our team will review it shortly.</p>
              
              <p style="margin:0 0 32px 0;font-size:17px;line-height:1.7;color:#333333;">We aim to respond within <strong style="color:#000000;">24 hours</strong> during business days.</p>

              <!-- CTA Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 32px auto;">
                <tr>
                  <td style="background-color:#f63b05;border-radius:8px;">
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
              <div style="padding:20px;background-color:#F5F5F5;border-radius:8px;border-left:3px solid #f63b05;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="padding:0 0 10px 0;font-size:13px;color:#999999;letter-spacing:1px;text-transform:uppercase;">Budget</td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 14px 0;font-size:15px;font-weight:600;color:#fffae5;">${budgetLabel}</td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 10px 0;font-size:13px;color:#999999;letter-spacing:1px;text-transform:uppercase;">Message</td>
                  </tr>
                  <tr>
                    <td style="font-size:15px;line-height:1.7;color:#fffae5;white-space:pre-wrap;">${message.slice(0, 300)}${message.length > 300 ? "..." : ""}</td>
                  </tr>
                </table>
              </div>

            </td>
          </tr>

          <!-- Accent Bar -->
          <tr>
            <td style="background-color:#f63b05;height:4px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#000000;padding:32px;text-align:center;">
              <img src="${wordmarkUrl}" alt="OREENZA" width="120" style="display:block;margin:0 auto 16px auto;height:18px;width:auto;opacity:0.9;" />
              <p style="margin:0 0 8px 0;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#fffae5;">Performance-first Creative Agency</p>
              <p style="margin:0 0 20px 0;font-size:13px;color:#f63b05;">
                <a href="mailto:hello@oreenza.com" style="color:#f63b05;text-decoration:none;">hello@oreenza.com</a>
                <span style="color:#fffae5;margin:0 8px;">·</span>
                <a href="${siteUrl("/")}" style="color:#f63b05;text-decoration:none;">oreenza.com</a>
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="padding:0 6px;"><a href="https://instagram.com/oreenza_agency" target="_blank" style="color:#fffae5;text-decoration:none;font-size:12px;">Instagram</a></td>
                  <td style="color:#fffae5;font-size:12px;">·</td>
                  <td style="padding:0 6px;"><a href="https://linkedin.com/company/oreenza" target="_blank" style="color:#fffae5;text-decoration:none;font-size:12px;">LinkedIn</a></td>
                  <td style="color:#fffae5;font-size:12px;">·</td>
                  <td style="padding:0 6px;"><a href="https://x.com/oreenza" target="_blank" style="color:#fffae5;text-decoration:none;font-size:12px;">Twitter</a></td>
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
    "Thanks for reaching out to OREENZA. We've received your enquiry and our team will review it shortly.",
    "",
    "We aim to respond within 24 hours during business days.",
    "",
    "Book a discovery call: https://cal.com/oreenza/discovery-call",
    "",
    "Your enquiry:",
    "Budget: " + budgetLabel,
    "",
    message.slice(0, 300) + (message.length > 300 ? "..." : ""),
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

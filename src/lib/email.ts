import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import type { InquiryFields } from "@/lib/validation";

export type InquiryEmailPayload = {
  fields: InquiryFields;
  image?: {
    filename: string;
    content: Buffer;
    mime: string;
  } | null;
};

/** Verified Resend domain sender. Used when RESEND_FROM_EMAIL is empty or still the test address. */
const DEFAULT_FROM = "Özlü Otomotiv <bildirim@ozluotomotiv.com>";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

function resolveFromAddress(): string {
  const configured = process.env.RESEND_FROM_EMAIL?.trim();
  if (!configured || /onboarding@resend\.dev/i.test(configured)) {
    return DEFAULT_FROM;
  }
  return configured;
}

function resolveRecipient(): string {
  const configured = process.env.CONTACT_RECIPIENT_EMAIL?.trim();
  if (configured) return configured;
  if (siteConfig.email) return siteConfig.email;
  throw new Error("CONTACT_RECIPIENT_EMAIL is not configured");
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function sendInquiryEmail(
  payload: InquiryEmailPayload,
): Promise<{ id: string }> {
  const from = resolveFromAddress();
  const to = resolveRecipient();

  const resend = getResendClient();
  const subject = `Parça sorgusu — ${payload.fields.brand} ${payload.fields.model}`;

  const htmlRows: Array<[string, string]> = [
    ["Marka", payload.fields.brand],
    ["Model", payload.fields.model],
    ["Şasi / VIN", payload.fields.vin],
    ["İstenen parça", payload.fields.part],
    ["Telefon", payload.fields.phone],
  ];

  const bodyRows = htmlRows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #d1d5db;font-weight:600;">${escapeHtml(label)}</td><td style="padding:8px 12px;border:1px solid #d1d5db;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#111827;">
      <h1 style="font-size:18px;margin:0 0 12px;">Yeni parça sorgusu</h1>
      <p style="margin:0 0 16px;">${escapeHtml(siteConfig.name)} web sitesinden yeni bir sorgu geldi.</p>
      <table style="border-collapse:collapse;width:100%;max-width:560px;">${bodyRows}</table>
    </div>
  `;

  const text = [
    "Yeni parça sorgusu",
    `Marka: ${payload.fields.brand}`,
    `Model: ${payload.fields.model}`,
    `Şasi / VIN: ${payload.fields.vin}`,
    `İstenen parça: ${payload.fields.part}`,
    `Telefon: ${payload.fields.phone}`,
  ].join("\n");

  const attachments = payload.image
    ? [
        {
          filename: payload.image.filename,
          // Resend JSON-encodes the payload; Buffer becomes an object and is rejected.
          content: payload.image.content.toString("base64"),
          contentType: payload.image.mime,
        },
      ]
    : undefined;

  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    subject,
    html,
    text,
    attachments,
  });

  if (error || !data) {
    throw new Error(error?.message || "Resend delivery failed");
  }

  return { id: data.id };
}

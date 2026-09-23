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

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
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
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_RECIPIENT_EMAIL;

  if (!from) {
    throw new Error("RESEND_FROM_EMAIL is not configured");
  }
  if (!to) {
    throw new Error("CONTACT_RECIPIENT_EMAIL is not configured");
  }

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
          content: payload.image.content,
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

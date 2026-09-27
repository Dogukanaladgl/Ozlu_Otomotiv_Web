"use server";

import { headers } from "next/headers";
import { sendInquiryEmail } from "@/lib/email";
import {
  checkInquiryRateLimit,
  validateFormTiming,
} from "@/lib/rate-limit";
import {
  validateInquiryFields,
  validateInquiryImage,
  type FieldErrors,
} from "@/lib/validation";

export type InquiryActionState = {
  status: "idle" | "success" | "error" | "validation";
  message?: string;
  errors?: FieldErrors;
};

const SUCCESS_MESSAGE = "Sorgunuz alındı ve işletmeye iletildi.";

export async function submitInquiry(
  _prev: InquiryActionState,
  formData: FormData,
): Promise<InquiryActionState> {
  const fieldsResult = validateInquiryFields({
    brand: formData.get("brand"),
    model: formData.get("model"),
    vin: formData.get("vin"),
    part: formData.get("part"),
    phone: formData.get("phone"),
    website: formData.get("website"),
  });

  // Honeypot: pretend success to bots without sending email
  if (!fieldsResult.ok && fieldsResult.errors.website) {
    return {
      status: "success",
      message: SUCCESS_MESSAGE,
    };
  }

  // Anti-bot: reject instant / missing timing token (keep message generic)
  if (!validateFormTiming(formData.get("formStartedAt"))) {
    return {
      status: "error",
      message:
        "Sorgunuz şu anda gönderilemedi. Lütfen formu yenileyip tekrar deneyin.",
    };
  }

  const clientKey = await getClientRateLimitKey();
  const rate = checkInquiryRateLimit(clientKey);
  if (!rate.ok) {
    return {
      status: "error",
      message:
        "Çok fazla sorgu gönderildi. Lütfen bir süre sonra tekrar deneyin.",
    };
  }

  const imageEntry = formData.get("image");
  const imageFile =
    imageEntry instanceof File && imageEntry.size > 0 ? imageEntry : null;

  const imageResult = await validateInquiryImage(imageFile);

  if (!fieldsResult.ok || !imageResult.ok) {
    const errors: FieldErrors = {
      ...(fieldsResult.ok ? {} : fieldsResult.errors),
    };
    if (!imageResult.ok) {
      errors.image = imageResult.error;
    }
    return {
      status: "validation",
      message: "Lütfen formdaki hataları düzeltin.",
      errors,
    };
  }

  try {
    const imageAttachment =
      imageResult.file && "buffer" in imageResult
        ? {
            filename: sanitizeFilename(imageResult.file.name),
            content: imageResult.buffer,
            mime: imageResult.mime,
          }
        : null;

    await sendInquiryEmail({
      fields: fieldsResult.data,
      image: imageAttachment,
    });

    return {
      status: "success",
      message: SUCCESS_MESSAGE,
    };
  } catch (error) {
    console.error("Inquiry delivery failed:", error);
    return {
      status: "error",
      message:
        "Sorgunuz şu anda gönderilemedi. Lütfen daha sonra tekrar deneyin veya iletişim sayfasındaki diğer kanalları kullanın.",
    };
  }
}

async function getClientRateLimitKey(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    h.get("x-real-ip")?.trim() ||
    "unknown";
  return `inquiry:${ip}`;
}

function sanitizeFilename(name: string): string {
  const cleaned = name.replace(/[^\w.\-()+ ]+/g, "_").slice(0, 80);
  return cleaned || "parca-gorseli.jpg";
}

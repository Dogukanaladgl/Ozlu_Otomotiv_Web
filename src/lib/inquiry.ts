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
  type InquiryActionState,
} from "@/lib/validation";

export type { InquiryActionState };

export const INQUIRY_SUCCESS_MESSAGE =
  "Sorgunuz alındı ve işletmeye iletildi.";
export const INQUIRY_DELIVERY_ERROR =
  "Sorgunuz şu anda gönderilemedi. Lütfen daha sonra tekrar deneyin veya iletişim sayfasındaki diğer kanalları kullanın.";

export async function processInquiry(
  formData: FormData,
): Promise<InquiryActionState> {
  try {
    return await processInquiryInner(formData);
  } catch (error) {
    console.error("Inquiry delivery failed:", error);
    return {
      status: "error",
      message: publicDeliveryError(error),
    };
  }
}

async function processInquiryInner(
  formData: FormData,
): Promise<InquiryActionState> {
  if (!formData || typeof formData.get !== "function") {
    return {
      status: "error",
      message: INQUIRY_DELIVERY_ERROR,
    };
  }

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
      message: INQUIRY_SUCCESS_MESSAGE,
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

  const clientKey = await getClientRateLimitKey();
  const rate = checkInquiryRateLimit(clientKey);
  if (!rate.ok) {
    return {
      status: "error",
      message:
        "Çok fazla sorgu gönderildi. Lütfen bir süre sonra tekrar deneyin.",
    };
  }

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
    message: INQUIRY_SUCCESS_MESSAGE,
  };
}

export function publicDeliveryError(error: unknown): string {
  if (
    process.env.NODE_ENV !== "production" &&
    error instanceof Error &&
    /RESEND_|CONTACT_RECIPIENT|not configured/i.test(error.message)
  ) {
    return "E-posta gönderimi yapılandırılmamış. .env.local dosyasına RESEND_API_KEY ekleyip geliştirme sunucusunu yeniden başlatın.";
  }

  return INQUIRY_DELIVERY_ERROR;
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

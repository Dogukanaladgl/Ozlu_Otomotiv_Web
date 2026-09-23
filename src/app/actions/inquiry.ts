"use server";

import { sendInquiryEmail } from "@/lib/email";
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
      message:
        "Sorgunuz alındı. En kısa sürede sizinle iletişime geçeceğiz.",
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
      message:
        "Sorgunuz alındı. En kısa sürede sizinle iletişime geçeceğiz.",
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

function sanitizeFilename(name: string): string {
  const cleaned = name.replace(/[^\w.\-()+ ]+/g, "_").slice(0, 80);
  return cleaned || "parca-gorseli.jpg";
}

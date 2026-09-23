import { siteConfig } from "@/config/site";

export type VehicleBrand =
  (typeof siteConfig.inquiry.acceptedBrands)[number];

export type InquiryFields = {
  brand: string;
  model: string;
  vin: string;
  part: string;
  phone: string;
  /** Honeypot — must remain empty */
  website: string;
};

export type FieldErrors = Partial<
  Record<keyof InquiryFields | "image", string>
>;

export type ValidationResult =
  | { ok: true; data: InquiryFields }
  | { ok: false; errors: FieldErrors };

const BRANDS = new Set<string>(siteConfig.inquiry.acceptedBrands);

const IMAGE_SIGNATURES: Array<{
  mime: (typeof siteConfig.inquiry.acceptedImageTypes)[number];
  check: (bytes: Uint8Array) => boolean;
}> = [
  {
    mime: "image/jpeg",
    check: (b) => b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  },
  {
    mime: "image/png",
    check: (b) =>
      b.length >= 8 &&
      b[0] === 0x89 &&
      b[1] === 0x50 &&
      b[2] === 0x4e &&
      b[3] === 0x47,
  },
  {
    mime: "image/webp",
    check: (b) =>
      b.length >= 12 &&
      b[0] === 0x52 &&
      b[1] === 0x49 &&
      b[2] === 0x46 &&
      b[3] === 0x46 &&
      b[8] === 0x57 &&
      b[9] === 0x45 &&
      b[10] === 0x42 &&
      b[11] === 0x50,
  },
];

function trim(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizePhone(value: string): string {
  return value.replace(/[\s()-]/g, "");
}

function isValidTurkishPhone(value: string): boolean {
  const cleaned = normalizePhone(value);
  // Accept +90XXXXXXXXXX, 90XXXXXXXXXX, 0XXXXXXXXXX, or 5XXXXXXXXX
  return /^(?:\+?90|0)?5\d{9}$/.test(cleaned);
}

export function validateInquiryFields(
  input: Partial<Record<keyof InquiryFields, unknown>>,
): ValidationResult {
  const errors: FieldErrors = {};

  const website = trim(input.website);
  const brand = trim(input.brand);
  const model = trim(input.model);
  const vin = trim(input.vin);
  const part = trim(input.part);
  const phone = trim(input.phone);

  // Honeypot filled → treat as bot (generic failure upstream)
  if (website) {
    return {
      ok: false,
      errors: { website: "Spam detected" },
    };
  }

  if (!brand) {
    errors.brand = "Lütfen araç markasını seçin.";
  } else if (!BRANDS.has(brand)) {
    errors.brand = "Şu an yalnızca Hyundai veya Kia için sorgu kabul ediyoruz.";
  }

  if (!model) {
    errors.model = "Lütfen araç modelini yazın.";
  } else if (model.length < 2) {
    errors.model = "Model adı en az 2 karakter olmalıdır.";
  } else if (model.length > 80) {
    errors.model = "Model adı en fazla 80 karakter olabilir.";
  }

  if (!vin) {
    errors.vin = "Lütfen şasi / VIN numarasını yazın.";
  } else if (vin.length < 5) {
    errors.vin =
      "Şasi / VIN numarası en az 5 karakter olmalıdır. Araç ruhsatınızdan kontrol edebilirsiniz.";
  } else if (vin.length > 32) {
    errors.vin = "Şasi / VIN numarası en fazla 32 karakter olabilir.";
  }

  if (!part) {
    errors.part = "Lütfen istediğiniz parçayı yazın.";
  } else if (part.length < 2) {
    errors.part = "Parça açıklaması en az 2 karakter olmalıdır.";
  } else if (part.length > 500) {
    errors.part = "Parça açıklaması en fazla 500 karakter olabilir.";
  }

  if (!phone) {
    errors.phone = "Lütfen telefon numaranızı yazın.";
  } else if (!isValidTurkishPhone(phone)) {
    errors.phone =
      "Lütfen geçerli bir telefon numarası girin (ör. 05XX XXX XX XX).";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      brand,
      model,
      vin,
      part,
      phone: normalizePhone(phone),
      website: "",
    },
  };
}

export type ImageValidationResult =
  | { ok: true; file: File; buffer: Buffer; mime: string }
  | { ok: false; error: string }
  | { ok: true; file: null };

export async function validateInquiryImage(
  file: File | null | undefined,
): Promise<ImageValidationResult> {
  if (!file || file.size === 0) {
    return { ok: true, file: null };
  }

  if (file.size > siteConfig.inquiry.maxImageBytes) {
    return {
      ok: false,
      error: `Görsel en fazla ${Math.round(siteConfig.inquiry.maxImageBytes / (1024 * 1024))} MB olabilir.`,
    };
  }

  const declaredType = file.type;
  if (
    !siteConfig.inquiry.acceptedImageTypes.includes(
      declaredType as (typeof siteConfig.inquiry.acceptedImageTypes)[number],
    )
  ) {
    return {
      ok: false,
      error: "Yalnızca JPG, PNG veya WEBP görseller kabul edilir.",
    };
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const bytes = new Uint8Array(buffer);

  const matched = IMAGE_SIGNATURES.find((sig) => sig.check(bytes));
  if (!matched) {
    return {
      ok: false,
      error:
        "Yüklenen dosya geçerli bir görsel değil. Lütfen JPG, PNG veya WEBP yükleyin.",
    };
  }

  if (matched.mime !== declaredType) {
    return {
      ok: false,
      error: "Dosya türü, içeriğiyle uyuşmuyor. Lütfen geçerli bir görsel seçin.",
    };
  }

  return { ok: true, file, buffer, mime: matched.mime };
}

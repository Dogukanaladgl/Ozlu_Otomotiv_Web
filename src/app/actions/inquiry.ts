"use server";

import { processInquiry } from "@/lib/inquiry";
import type { InquiryActionState } from "@/lib/validation";

export type { InquiryActionState };

export async function submitInquiry(
  formData: FormData,
): Promise<InquiryActionState> {
  return processInquiry(formData);
}

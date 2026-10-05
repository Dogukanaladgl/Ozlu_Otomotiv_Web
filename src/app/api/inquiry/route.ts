import { NextResponse } from "next/server";
import {
  INQUIRY_DELIVERY_ERROR,
  processInquiry,
} from "@/lib/inquiry";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json(
      {
        status: "error",
        message: INQUIRY_DELIVERY_ERROR,
      },
      { status: 403 },
    );
  }

  try {
    const formData = await request.formData();
    const result = await processInquiry(formData);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Inquiry request failed:", error);
    return NextResponse.json({
      status: "error",
      message: INQUIRY_DELIVERY_ERROR,
    });
  }
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const hostHeader =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !hostHeader) return false;

  const requestHost = hostHeader.split(",")[0]?.trim().toLowerCase();
  if (!requestHost) return false;

  try {
    return new URL(origin).host.toLowerCase() === requestHost;
  } catch {
    return false;
  }
}

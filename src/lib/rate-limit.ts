/**
 * Lightweight best-effort rate limiting for Vercel serverless.
 *
 * No external service or new dependency.
 * State is in-process memory: effective per warm instance, not a global
 * distributed store. Still blocks naive/scripted bursts and pairs with
 * honeypot + minimum form-fill time checks.
 */

type Bucket = {
  timestamps: number[];
};

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

/** Minimum time (ms) a human is expected to spend before submitting. */
export const MIN_FORM_FILL_MS = 3000;

export type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfterSeconds: number };

function prune(timestamps: number[], now: number): number[] {
  return timestamps.filter((t) => now - t < WINDOW_MS);
}

export function checkInquiryRateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { timestamps: [] };
  const recent = prune(bucket.timestamps, now);

  if (recent.length >= MAX_REQUESTS) {
    const oldest = recent[0]!;
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((WINDOW_MS - (now - oldest)) / 1000),
    );
    buckets.set(key, { timestamps: recent });
    return { ok: false, retryAfterSeconds };
  }

  recent.push(now);
  buckets.set(key, { timestamps: recent });
  return { ok: true };
}

export function validateFormTiming(formStartedAtRaw: unknown): boolean {
  if (typeof formStartedAtRaw !== "string" || !formStartedAtRaw.trim()) {
    return false;
  }
  const started = Number(formStartedAtRaw);
  if (!Number.isFinite(started) || started <= 0) {
    return false;
  }
  const elapsed = Date.now() - started;
  // Reject instant bots and absurdly old timestamps (replay / stale tabs beyond 24h)
  if (elapsed < MIN_FORM_FILL_MS) return false;
  if (elapsed > 24 * 60 * 60 * 1000) return false;
  return true;
}

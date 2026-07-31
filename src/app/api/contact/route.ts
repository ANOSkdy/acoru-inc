import { NextResponse } from "next/server";

import { submitContact } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_REQUEST_BYTES = 64 * 1024;
const PRIVACY_POLICY_VERSION = "2026-07-31";

function textField(
  body: Record<string, unknown>,
  name: string,
  maxLength: number,
): string | null {
  const value = body[name];
  if (value === undefined || value === null) {
    return "";
  }
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim();
  return normalized.length <= maxLength ? normalized : null;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    parsed = null;
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  const body = parsed as Record<string, unknown>;
  const companyName = textField(body, "companyName", 200);
  const personName = textField(body, "personName", 200);
  const email = textField(body, "email", 320);
  const phone = textField(body, "phone", 50);
  const message = textField(body, "message", 10_000);
  const serviceInterest = textField(body, "category", 200);

  if (
    companyName === null ||
    personName === null ||
    email === null ||
    phone === null ||
    message === null ||
    serviceInterest === null ||
    body.privacyAgreed !== true ||
    !personName ||
    (!email && !phone) ||
    !message
  ) {
    return NextResponse.json(
      { error: "Missing or invalid fields." },
      { status: 400 },
    );
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address." },
      { status: 400 },
    );
  }

  try {
    await submitContact({
      companyName,
      personName,
      email,
      phone,
      message,
      serviceInterest,
      privacyAccepted: true,
      privacyPolicyVersion: PRIVACY_POLICY_VERSION,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    console.error("[api/contact] Contact submission failed.");
    return NextResponse.json(
      { error: "Unable to submit the contact request." },
      { status: 500 },
    );
  }
}

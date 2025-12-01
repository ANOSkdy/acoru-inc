// src/app/api/contact/route.ts
import { NextResponse } from "next/server";

const API_TOKEN = process.env.AIRTABLE_API_TOKEN;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_CONTACTS = process.env.AIRTABLE_TABLE_CONTACTS ?? "Contacts";

export async function POST(req: Request) {
  if (!API_TOKEN || !BASE_ID) {
    console.error(
      "[api/contact] AIRTABLE_API_TOKEN または AIRTABLE_BASE_ID が設定されていません。"
    );
    return NextResponse.json(
      { error: "Server configuration error." },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  const {
    companyName,
    personName,
    email,
    phone,
    message,
    privacyAgreed,
  } = body as {
    companyName?: string;
    personName?: string;
    email?: string;
    phone?: string;
    message?: string;
    privacyAgreed?: boolean;
  };

  // 必須チェック
  if (!personName || (!email && !phone) || !message || !privacyAgreed) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  const url = new URL(
    `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(
      TABLE_CONTACTS
    )}`
  );

  // Airtable 側のフィールド名に合わせてマッピング
  const fields: Record<string, string> = {
    company_name: companyName || "",
    person_name: personName || "",
    email: email || "",
    phone: phone || "",
    // category: category || "", // ← Contacts に category 列を作るまでは送らない
    message: message || "",
    source: "Webフォーム",
    status: "New",
    // privacy_agreed: !!privacyAgreed, // ← Airtable に privacy_agreed 列を作るまでは送らない
  };

  try {
    const res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(
        "[api/contact] Airtable error:",
        res.status,
        res.statusText,
        text
      );
      return NextResponse.json(
        { error: "Failed to save to Airtable." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[api/contact] unexpected error:", err);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}

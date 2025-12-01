// src/lib/airtableCases.ts
export type Case = {
  id: string;
  title: string;
  slug: string;
  clientName?: string;
  industry?: string;
  summary?: string;
  challenge?: string;
  solution?: string;
  result?: string;
  publishedAt?: string;
  heroImageUrl?: string; // Airtable添付のURL
};

const API_TOKEN = process.env.AIRTABLE_API_TOKEN;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_CASES = process.env.AIRTABLE_TABLE_CASES ?? "Cases";

if (!API_TOKEN || !BASE_ID) {
  console.warn(
    "[airtableCases] AIRTABLE_API_TOKEN または AIRTABLE_BASE_ID が設定されていません。"
  );
}

type AirtableRecord = {
  id: string;
  fields: {
    title?: string;
    slug?: string;
    client_name?: string;
    clientName?: string;
    industry?: string;
    summary?: string;
    challenge?: string;
    solution?: string;
    result?: string;
    publishedAt?: string;
    published_at?: string;
    hero_image?: { url?: string }[];
  };
};

async function fetchCasesFromAirtable(): Promise<Case[]> {
  if (!API_TOKEN || !BASE_ID) return [];

  const url = new URL(
    `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_CASES)}`
  );

  // パラメータなしで素直に全件取得
  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(
      "[airtableCases] fetch error:",
      res.status,
      res.statusText,
      body
    );
    return [];
  }

  const data = (await res.json()) as { records: AirtableRecord[] };

  return data.records.map((record) => {
    const f = record.fields;

    // hero_image フィールドは Attachment 型（配列）想定
    const heroField = f.hero_image;
    const hero =
      Array.isArray(heroField) && heroField.length > 0 ? heroField[0] : null;

    return {
      id: record.id,
      title: f.title ?? "",
      slug: f.slug ?? "",
      clientName: f.client_name ?? f.clientName,
      industry: f.industry,
      summary: f.summary,
      challenge: f.challenge,
      solution: f.solution,
      result: f.result,
      publishedAt: f.publishedAt ?? f.published_at,
      heroImageUrl: hero?.url ?? undefined, // 添付1枚目のURL
    };
  });
}

export async function getCases(): Promise<Case[]> {
  return fetchCasesFromAirtable();
}

export async function getCaseBySlug(slug: string): Promise<Case | null> {
  const all = await fetchCasesFromAirtable();
  return all.find((c) => c.slug === slug) ?? null;
}

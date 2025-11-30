// src/lib/airtableNews.ts
export type NewsItem = {
  id: string;
  title: string;
  slug: string;
  date?: string;
  category?: string;
  summary?: string;
  body?: string;
  externalUrl?: string;
  heroImageUrl?: string;
};

const API_TOKEN = process.env.AIRTABLE_API_TOKEN;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NEWS = process.env.AIRTABLE_TABLE_NEWS ?? "News";

if (!API_TOKEN || !BASE_ID) {
  console.warn(
    "[airtableNews] AIRTABLE_API_TOKEN または AIRTABLE_BASE_ID が設定されていません。"
  );
}

type NewsFields = {
  title?: string;
  slug?: string;
  date?: string;
  publishedAt?: string;
  published_at?: string;
  category?: string;
  summary?: string;
  excerpt?: string;
  body?: string;
  external_url?: string;
  externalUrl?: string;
  hero_image?: { url?: string }[];
};

type AirtableRecord = {
  id: string;
  fields: NewsFields;
};

async function fetchNewsFromAirtable(): Promise<NewsItem[]> {
  if (!API_TOKEN || !BASE_ID) return [];

  const url = new URL(
    `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NEWS)}`
  );

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(
      "[airtableNews] fetch error:",
      res.status,
      res.statusText,
      body
    );
    return [];
  }

  const data = (await res.json()) as { records: AirtableRecord[] };

  return data.records.map((record) => {
    const f = record.fields;

    // hero_image フィールド（Attachment）から1枚目のURLを取得
    const heroField = f.hero_image;
    const hero =
      Array.isArray(heroField) && heroField.length > 0 ? heroField[0] : null;

    return {
      id: record.id,
      title: f.title ?? "",
      slug: f.slug ?? "",
      date: f.date ?? f.publishedAt ?? f.published_at,
      category: f.category,
      summary: f.summary ?? f.excerpt,
      body: f.body,
      externalUrl: f.external_url ?? f.externalUrl,
      heroImageUrl: hero?.url ?? undefined,
    };
  });
}

export async function getNews(): Promise<NewsItem[]> {
  const items = await fetchNewsFromAirtable();

  // ローカルで日付降順ソート（dateが無ければそのまま）
  return items.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const all = await fetchNewsFromAirtable();
  return all.find((n) => n.slug === slug) ?? null;
}

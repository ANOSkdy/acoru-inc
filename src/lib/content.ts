import "server-only";

import { querySitePublic } from "@/lib/database";

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
  heroImageUrl?: string;
};

export type CompanyProfile = {
  name?: string;
  tagline?: string;
  mission?: string;
  vision?: string;
  ceo?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  established?: string;
  map_url?: string;
  sns_x?: string;
};

type NewsRow = {
  id: string;
  title: string;
  slug: string;
  published_date: string | null;
  category: string | null;
  summary: string | null;
  body_markdown: string | null;
  external_url: string | null;
  hero_media_url: string | null;
};

type CaseRow = {
  id: string;
  title: string;
  slug: string;
  client_name: string | null;
  industry: string | null;
  summary: string | null;
  challenge_markdown: string | null;
  solution_markdown: string | null;
  result_markdown: string | null;
  published_date: string | null;
  hero_media_url: string | null;
};

type CompanyRow = {
  name: string | null;
  tagline: string | null;
  mission: string | null;
  vision: string | null;
  ceo: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  website_url: string | null;
  established_date: string | null;
  map_url: string | null;
  x_url: string | null;
};

function optional(value: string | null): string | undefined {
  return value ?? undefined;
}

function toNews(row: NewsRow): NewsItem {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    date: optional(row.published_date),
    category: optional(row.category),
    summary: optional(row.summary),
    body: optional(row.body_markdown),
    externalUrl: optional(row.external_url),
    heroImageUrl: optional(row.hero_media_url),
  };
}

function toCase(row: CaseRow): Case {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    clientName: optional(row.client_name),
    industry: optional(row.industry),
    summary: optional(row.summary),
    challenge: optional(row.challenge_markdown),
    solution: optional(row.solution_markdown),
    result: optional(row.result_markdown),
    publishedAt: optional(row.published_date),
    heroImageUrl: optional(row.hero_media_url),
  };
}

const NEWS_COLUMNS = `
  id::text,
  title,
  slug,
  to_char(
    published_at AT TIME ZONE 'Asia/Tokyo',
    'YYYY-MM-DD'
  ) AS published_date,
  category,
  summary,
  body_markdown,
  external_url,
  hero_media_url
`;

const CASE_COLUMNS = `
  id::text,
  title,
  slug,
  client_name,
  industry,
  summary,
  challenge_markdown,
  solution_markdown,
  result_markdown,
  to_char(
    published_at AT TIME ZONE 'Asia/Tokyo',
    'YYYY-MM-DD'
  ) AS published_date,
  hero_media_url
`;

export async function getNews(): Promise<NewsItem[]> {
  const rows = await querySitePublic<NewsRow>(`
    SELECT ${NEWS_COLUMNS}
    FROM site_public.news
    ORDER BY published_at DESC, sort_order ASC, id DESC
  `);

  return rows.map(toNews);
}

export async function getNewsBySlug(
  slug: string,
): Promise<NewsItem | null> {
  const rows = await querySitePublic<NewsRow>(
    `
      SELECT ${NEWS_COLUMNS}
      FROM site_public.news
      WHERE slug = $1
      LIMIT 1
    `,
    [slug],
  );

  return rows[0] ? toNews(rows[0]) : null;
}

export async function getCases(): Promise<Case[]> {
  const rows = await querySitePublic<CaseRow>(`
    SELECT ${CASE_COLUMNS}
    FROM site_public.case_studies
    ORDER BY sort_order ASC, published_at DESC, id DESC
  `);

  return rows.map(toCase);
}

export async function getCaseBySlug(
  slug: string,
): Promise<Case | null> {
  const rows = await querySitePublic<CaseRow>(
    `
      SELECT ${CASE_COLUMNS}
      FROM site_public.case_studies
      WHERE slug = $1
      LIMIT 1
    `,
    [slug],
  );

  return rows[0] ? toCase(rows[0]) : null;
}

export async function getCompanyProfile(): Promise<CompanyProfile | null> {
  const rows = await querySitePublic<CompanyRow>(`
    SELECT
      name,
      tagline,
      mission,
      vision,
      ceo,
      address,
      phone,
      email,
      website_url,
      to_char(established_on, 'YYYY-MM-DD') AS established_date,
      map_url,
      x_url
    FROM site_public.company_profile
    LIMIT 1
  `);
  const company = rows[0];

  if (!company) {
    return null;
  }

  return {
    name: optional(company.name),
    tagline: optional(company.tagline),
    mission: optional(company.mission),
    vision: optional(company.vision),
    ceo: optional(company.ceo),
    address: optional(company.address),
    phone: optional(company.phone),
    email: optional(company.email),
    website: optional(company.website_url),
    established: optional(company.established_date),
    map_url: optional(company.map_url),
    sns_x: optional(company.x_url),
  };
}

export async function submitContact(input: {
  companyName: string;
  personName: string;
  email: string;
  phone: string;
  message: string;
  serviceInterest: string;
  privacyAccepted: boolean;
  privacyPolicyVersion: string;
}): Promise<void> {
  await querySitePublic<{ inquiry_id: string }>(
    `
      SELECT site_public.submit_contact(
        $1, $2, $3, $4, $5, $6, $7, $8
      )::text AS inquiry_id
    `,
    [
      input.companyName,
      input.personName,
      input.email,
      input.phone,
      input.message,
      input.serviceInterest,
      input.privacyAccepted,
      input.privacyPolicyVersion,
    ],
  );
}

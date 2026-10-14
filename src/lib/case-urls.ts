export const SUGIMURA_CASE_SLUG = "sugimura-kenki-nfc-nippo";
export const LEGACY_SUGIMURA_CASE_SLUG = "case-1";

export function publicCaseSlug(slug: string): string {
  return slug === LEGACY_SUGIMURA_CASE_SLUG ? SUGIMURA_CASE_SLUG : slug;
}

export function caseUrl(slug: string): string {
  return `https://acoru.jp/cases/${encodeURIComponent(publicCaseSlug(slug))}`;
}

// CMS Markdown may still contain historical internal links. Normalize only this
// site's exact legacy path, retaining query strings and anchors.
export function publicCaseHref(href: string | undefined): string | undefined {
  if (!href) return href;
  try {
    const url = new URL(href, "https://acoru.jp");
    if (!["https:", "http:"].includes(url.protocol) || !["acoru.jp", "www.acoru.jp"].includes(url.host)) return href;
    if (!["/cases/case-1", "/cases/case-1/"].includes(url.pathname)) {
      return url.host === "www.acoru.jp" ? `https://acoru.jp${url.pathname}${url.search}${url.hash}` : href;
    }
    const path = `/cases/${SUGIMURA_CASE_SLUG}${url.search}${url.hash}`;
    return href.startsWith("/") && !href.startsWith("//") ? path : `https://acoru.jp${path}`;
  } catch {
    return href;
  }
}

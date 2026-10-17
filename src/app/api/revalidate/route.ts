import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { PUBLIC_CONTENT_TAG } from "@/lib/public-content-cache";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = process.env.ACORU_REVALIDATE_SECRET;
  if (!secret) {
    return Response.json({ error: "Revalidation is not configured." }, { status: 503 });
  }
  const actual = Buffer.from(request.headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${secret}`);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(PUBLIC_CONTENT_TAG, { expire: 0 });
  for (const path of ["/", "/about", "/news", "/cases", "/sitemap.xml"]) {
    revalidatePath(path);
  }
  revalidatePath("/news/[slug]", "page");
  revalidatePath("/cases/[slug]", "page");
  return Response.json({ invalidated: true });
}

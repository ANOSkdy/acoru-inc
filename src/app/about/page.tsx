import Image from "next/image";
import Link from "next/link";

type CompanyFields = {
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

const AIRTABLE_API_TOKEN = process.env.AIRTABLE_API_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_COMPANY =
  process.env.AIRTABLE_TABLE_COMPANY ?? "Company";

async function getCompany(): Promise<CompanyFields | null> {
  if (!AIRTABLE_API_TOKEN || !AIRTABLE_BASE_ID) return null;

  const url = new URL(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
      AIRTABLE_TABLE_COMPANY
    )}`
  );
  url.searchParams.set("maxRecords", "1");

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  const data = (await res.json()) as {
    records?: { fields?: CompanyFields }[];
  };

  const record = data.records?.[0];
  return record?.fields ?? null;
}

export const runtime = "nodejs";

export default async function AboutPage() {
  const company = await getCompany();

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-8 md:px-6 md:pt-12">
      {/* HERO：枠なし画像のみ */}
      <section className="relative h-52 overflow-hidden rounded-3xl md:h-72 lg:h-80">
        <Image
          src="/about-hero.png"
          alt="Acoruのイメージビジュアル"
          fill
          priority
          sizes="(min-width: 1024px) 960px, (min-width: 768px) 100vw, 100vw"
          className="object-cover"
        />
      </section>

      {/* メッセージ（枠なし） */}
      <section className="mt-12">
        <div className="max-w-4xl">
          <h1 className="text-2xl font-semibold leading-relaxed tracking-tight text-slate-900 md:text-3xl lg:text-[32px]">
            RFIDの「不可能」を北海道から「可能」に。
            <br />
            あらゆるモノが、つながる未来へ。
          </h1>

          <p className="mt-6 text-[13px] leading-relaxed text-slate-700 md:text-[14px]">
            Acoru合同会社は、RFID／NFCとAI技術を核に、企業の成長と競争力向上を支援します。
            タグ一枚から既存システム連携まで、現場の「見えない情報」を自動で拾い上げ、AIが即座に解析・提案します。
            多くの中小企業がDXの必要性を感じながらも、「何から始めればよいか分からない」
            「コストと人手が足りない」という壁に直面しています。
          </p>

          <p className="mt-4 text-[13px] leading-relaxed text-slate-700 md:text-[14px]">
            私たちは、導入計画の策定・機器選定・PoC構築・教育までを一気通貫で伴走し、
            手書き・属人化・重複入力といったムダを排除。
            “現場データの自動取得（RFID）×意思決定の高速化（AI）”でその壁を実務レベルで突破し、
            継続的な改善サイクルまで設計します。補助金活用や小規模スタートにも柔軟に対応し、
            投資対効果を可視化します。
          </p>
        </div>

        {/* 導線 */}
        <div className="mt-8 flex flex-wrap gap-3 text-[12px]">
          <Link
            href="/service"
            className="inline-flex items-center justify-center rounded-full border border-slate-900 px-6 py-2 font-semibold tracking-[0.22em] text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-900 hover:text-white"
          >
            事業内容を見る
          </Link>
          <Link
            href="/cases"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-2 font-semibold tracking-[0.22em] text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-900 hover:text-slate-900"
          >
            導入事例を見る
          </Link>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm shadow-slate-100/70 md:px-7 md:py-6">
          <h2 className="text-sm font-semibold tracking-[0.18em] text-slate-500">
            MISSION
          </h2>
          <p className="mt-2 text-[15px] font-semibold text-slate-900">
            「現場から始まるDX」で、北海道の中小企業を強くする。
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
            現場の負担を増やすDXではなく、現場の「困った」を解消するところから始めるDXを設計します。
            まずは1現場・1プロジェクトから、小さく試しながら確実に定着させることを大切にしています。
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm shadow-slate-100/70 md:px-7 md:py-6">
          <h2 className="text-sm font-semibold tracking-[0.18em] text-slate-500">
            VISION
          </h2>
          <p className="mt-2 text-[15px] font-semibold text-slate-900">
            RFIDとAIが「当たり前の道具」になる未来をつくる。
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
            特別な企業だけが使えるテクノロジーではなく、現場で働くすべての人にとって自然に使える道具として、
            RFIDやAIを届けていきます。そのために、UI/UXと業務フローの両方から設計します。
          </p>
        </div>
      </section>

      {/* インクルーシブDX説明 */}
      <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-6 shadow-sm shadow-slate-100/70 md:px-7 md:py-7">
        <h2 className="text-sm font-semibold tracking-[0.18em] text-slate-500">
          インクルーシブDXとは
        </h2>
        <p className="mt-2 text-[15px] font-semibold text-slate-900">
          ITスキルや役職にかかわらず、全員が迷わず使えるDX。
        </p>
        <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
          「一部の人だけが便利になるDX」ではなく、現場・事務・経営の全員にとって価値のある仕組みをつくること。
          それがAcoruの考えるインクルーシブDXです。画面や導線の分かりやすさ、導入〜定着までの伴走も含めて設計します。
        </p>
      </section>

      {/* 会社情報＋マップ（フッター直上） */}
      <section className="mt-10 grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* 会社情報カード */}
        <div className="rounded-[32px] border border-slate-200 bg-slate-50 px-6 py-6 shadow-sm shadow-slate-100/70 md:px-8 md:py-7">
          <h2 className="text-base font-semibold tracking-[0.18em] text-slate-700">
            会社情報
          </h2>

          {company ? (
            <div className="mt-5 grid gap-6 text-[13px] text-slate-700 md:grid-cols-2 md:text-[14px]">
              <div className="space-y-3">
                {company.name && (
                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      会社名
                    </p>
                    <p className="text-[15px] font-bold text-slate-900">
                      {company.name}
                    </p>
                  </div>
                )}
                {company.tagline && (
                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      タグライン
                    </p>
                    <p className="font-semibold text-slate-900">
                      {company.tagline}
                    </p>
                  </div>
                )}
                {company.mission && (
                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      ミッション
                    </p>
                    <p className="leading-relaxed">{company.mission}</p>
                  </div>
                )}
                {company.vision && (
                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      ビジョン
                    </p>
                    <p className="leading-relaxed">{company.vision}</p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {company.ceo && (
                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      代表
                    </p>
                    <p className="font-semibold text-slate-900">
                      {company.ceo}
                    </p>
                  </div>
                )}

                {company.address && (
                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      所在地
                    </p>
                    <p className="whitespace-pre-line font-semibold text-slate-900">
                      {company.address}
                    </p>
                  </div>
                )}

                {(company.phone || company.email) && (
                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      連絡先
                    </p>
                    {company.phone && (
                      <p className="font-semibold text-slate-900">
                        TEL: {company.phone}
                      </p>
                    )}
                    {company.email && (
                      <p>
                        <span className="font-semibold text-slate-900">
                          Mail:{" "}
                        </span>
                        <a
                          href={`mailto:${company.email}`}
                          className="font-semibold text-slate-900 underline underline-offset-2"
                        >
                          {company.email}
                        </a>
                      </p>
                    )}
                  </div>
                )}

                {(company.website || company.sns_x) && (
                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      Web / SNS
                    </p>
                    {company.website && (
                      <p>
                        <span className="font-semibold text-slate-900">
                          Web:{" "}
                        </span>
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-slate-900 underline underline-offset-2"
                        >
                          {company.website}
                        </a>
                      </p>
                    )}
                    {company.sns_x && (
                      <p>
                        <span className="font-semibold text-slate-900">
                          X:{" "}
                        </span>
                        <a
                          href={company.sns_x}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-slate-900 underline underline-offset-2"
                        >
                          {company.sns_x}
                        </a>
                      </p>
                    )}
                  </div>
                )}

                {company.established && (
                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      設立
                    </p>
                    <p className="font-semibold text-slate-900">
                      {company.established}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="mt-4 text-[13px] text-slate-600 md:text-[14px]">
              会社情報は現在準備中です。
            </p>
          )}
        </div>

        {/* マップ埋め込み */}
        <div className="rounded-[32px] border border-slate-200 bg-white px-3 py-3 shadow-sm shadow-slate-100/70 md:px-4 md:py-4">
          <div className="relative h-72 w-full overflow-hidden rounded-2xl md:h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2915.4915083031533!2d141.33215327562385!3d43.05212919109934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f0b2992a6ca0ed1%3A0x9549e04239c825ac!2z44CSMDY0LTA4MDUg5YyX5rW36YGT5pyt5bmM5biC5Lit5aSu5Yy65Y2X77yV5p2h6KW_77yR77yV5LiB55uu77yS4oiS77yTIO-8su-8ue-8s--8re-8le-8ke-8lQ!5e0!3m2!1sja!2sjp!4v1733638611111!5m2!1sja!2sjp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getNews } from "@/lib/airtableNews";
import { getCases } from "@/lib/airtableCases";

export const metadata: Metadata = {
  title: "Acoru | 北海道発 DX・RFID システム開発と現場DXのホーム",
  description:
    "Acoru は北海道発のDX・RFIDシステムで現場DXを支援。RFID/NFCとAIを組み合わせ、建設・物流・製造の課題を解決する現場DXプラットフォームを提供します。",
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  // Airtable からお知らせ＆導入事例を取得
  const [news, cases] = await Promise.all([getNews(), getCases()]);

  const latestNews = news.slice(0, 5);      // ホームには最大5件
  const featuredCases = cases.slice(0, 2);  // ホームには最大2件（CASE 01 / 02）

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-24 pt-6 md:px-6 md:pb-28 md:pt-10">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-950">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/homeback.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/35 to-slate-950/70" />

        <div className="relative flex min-h-[420px] flex-col items-center justify-center px-6 py-10 md:min-h-[520px] md:px-10 lg:min-h-[640px]">
          <p className="mb-4 text-[12px] font-semibold tracking-[0.28em] text-slate-100/80">
            北海道・札幌発
          </p>

          <h1 className="text-balance text-center text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-[40px]">
            北海道発のDX・RFIDシステムで、
            <br className="hidden md:block" />
            現場の未来をつなぐ。
          </h1>

          <p className="mt-5 max-w-2xl text-center text-[15px] leading-relaxed text-slate-100/85">
            Acoru inc. は、RFID / NFC と AI エージェントを組み合わせた「北海道発のDX・RFIDシステム」で、
            現場の打刻・集計・レポートまでを自動化する開発パートナーです。AIがデータを咀嚼し、
            現場DXの次の一手を提案します。
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/service"
              className="rounded-full bg-white px-6 py-2.5 text-[12px] font-semibold tracking-[0.22em] text-slate-900 shadow-sm shadow-slate-900/40 transition hover:-translate-y-0.5 hover:bg-slate-100"
            >
              事業内容を見る
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/85 bg-transparent px-6 py-2.5 text-[12px] font-semibold tracking-[0.22em] text-white shadow-sm shadow-slate-900/40 transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </section>

      {/* =========================
          DX・RFIDの紹介セクション
         ========================= */}
      <section className="rounded-[32px] border border-slate-200 bg-white px-6 py-8 shadow-sm shadow-slate-100/70 md:px-8 md:py-9">
        <div className="space-y-4">
          <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">DX・RFID・AI</p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-[26px]">
            北海道でRFIDを活用したDXシステムとは？
          </h2>
          <p className="text-[14px] leading-relaxed text-slate-600 md:text-[15px]">
            Acoruは北海道の現場に寄り添い、RFID/NFCとAIを組み合わせたDX・RFIDシステムを設計しています。
            タグに触れるだけでデータを取得し、AIが自動で日報やレポートを生成。離れた拠点や雪の多い環境でも、
            ミスなく記録・共有できる仕組みを提供します。
          </p>
          <p className="text-[14px] leading-relaxed text-slate-600 md:text-[15px]">
            AI要約や異常検知を組み込むことで、RFIDで集めたデータを即座に意思決定に活かせるのが特徴です。
            北海道内の建設・物流・製造を中心に、NFC端末やセンサー、既存クラウドとの連携もサポートします。
          </p>
          <p className="text-[14px] leading-relaxed text-slate-600 md:text-[15px]">
            「Acoru 北海道 DX RFID システム」によって、紙の運用や属人化を減らし、
            現場DXを安全かつスモールスタートで進められます。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 shadow-sm shadow-slate-100/70">
            <h3 className="text-base font-semibold text-slate-900">AcoruのDX・RFIDシステムが解決する課題</h3>
            <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-slate-700 md:text-[14px]">
              <li>・手書き日報や二重入力の削減、リアルタイムな進捗共有</li>
              <li>・寒冷地・屋外でも読取できるRFID/NFCで資材や人の動きを可視化</li>
              <li>・AI要約・音声入力で現場負荷を軽減し、安全ルールの遵守を促進</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-3 text-[12px] font-semibold tracking-[0.2em] text-slate-800">
              <Link href="/service" className="underline underline-offset-4 hover:text-slate-950">
                北海道のDX・RFIDシステムの詳細を見る
              </Link>
              <Link href="/cases" className="underline underline-offset-4 hover:text-slate-950">
                実際の導入事例を確認する
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm shadow-slate-100/70">
            <h3 className="text-base font-semibold text-slate-900">なぜ北海道で必要か</h3>
            <p className="mt-3 text-[13px] leading-relaxed text-slate-700 md:text-[14px]">
              広大な移動距離や厳しい気候により、現場スタッフが紙やExcelで記録する負荷が大きくなりがちです。
              RFIDとAIを組み合わせれば、雪や寒冷地でも読み取りしやすく、遠隔でも状況を即座に共有できます。
              地域特性に合わせたDX・RFIDシステムで、人手不足を補いながら業務品質を高めます。
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          お知らせ：Airtable連動一覧レイアウト（hoverで色変化）
         ========================= */}
      <section className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">
              お知らせ
            </p>
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 md:text-xl">
              最新のお知らせ・採用情報
            </h2>
          </div>
          <Link
            href="/news"
            className="text-[12px] font-semibold tracking-[0.2em] text-slate-700 underline-offset-4 hover:underline"
          >
            一覧を見る
          </Link>
        </div>

        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-slate-50/70">
          {latestNews.length === 0 ? (
            <p className="px-5 py-4 text-[13px] text-slate-500">
              現在表示できるお知らせはありません。Airtable の「News」テーブルにデータを追加してください。
            </p>
          ) : (
            latestNews.map((n, index) => (
              <Link
                key={n.id}
                href={`/news/${n.slug}`}
                className={`group flex items-center gap-4 px-5 py-4 text-sm transition-colors md:gap-6 md:px-8 ${
                  index !== latestNews.length - 1
                    ? "border-b border-slate-200"
                    : ""
                } hover:bg-slate-100`}
              >
                {/* 日付 */}
                <span className="w-24 shrink-0 text-xs font-medium text-slate-500 md:w-28">
                  {n.date ?? ""}
                </span>

                {/* カテゴリバッジ */}
                <span className="inline-flex shrink-0 items-center justify-center rounded-full bg-slate-900 px-3.5 py-1 text-[11px] font-semibold text-white transition-colors group-hover:bg-slate-800">
                  {n.category ?? "NEWS"}
                </span>

                {/* タイトル */}
                <p className="flex-1 text-[14px] font-medium text-slate-900 md:text-[15px] group-hover:text-slate-950">
                  {n.title}
                </p>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* =========================
          事業内容：カード＋2 カラム（画像は右のまま）
         ========================= */}
      <section className="mt-6 rounded-[32px] border border-slate-200 bg-white px-6 py-7 shadow-sm shadow-slate-100/70 md:px-8 md:py-8">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.2fr)] md:items-center">
          {/* 左：テキスト */}
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">
                事業内容
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-[26px]">
                RFID と AI で現場の
                <br />
                “困った”を無くす
              </h2>
              <p className="text-[14px] leading-relaxed text-slate-600 md:text-[15px]">
                Acoru 合同会社は、RFID・NFC などの IoT 技術と AI
                エージェントを活用し、誰一人取り残さない「インクルーシブ DX」を実現します。
                現場の業務フローに寄り添いながら、打刻・集計・レポートまでの一連のプロセスを再設計します。
              </p>
            </div>

            <div>
              <Link
                href="/service"
                className="inline-flex items-center gap-3 rounded-full border border-slate-900 px-7 py-2.5 text-[12px] font-semibold tracking-[0.22em] text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-900 hover:text-white"
              >
                事業内容の詳細を見る
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[11px] text-white">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* 右：画像 */}
          <div className="relative h-52 overflow-hidden rounded-3xl bg-slate-900 md:h-64 lg:h-72">
            <Image
              src="/service-main.jpg"
              alt="RFID タグのイメージ"
              fill
              sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* =========================
          導入事例：Airtable連動（CASE 01 / CASE 02）
         ========================= */}
      <section className="mt-6 rounded-[32px] border border-slate-200 bg-white px-6 py-7 shadow-sm shadow-slate-100/70 md:px-8 md:py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* 左：見出し */}
          <div className="max-w-md space-y-3">
            <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">
              導入事例
            </p>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
              現場起点で設計した、リアルな DX プロジェクト。
            </h2>
            <p className="text-[14px] leading-relaxed text-slate-600">
              「どんな現場で、どれくらい事務負荷が下がったのか？」をイメージしやすいように、
              北海道の建設・運送現場での活用例を、定量・定性の両面から紹介します。AcoruのDX・RFIDシステムが、
              実際にどのように業務を変えたのかをご覧ください。
            </p>
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.2em] text-slate-700 underline-offset-4 hover:underline"
            >
              導入事例をもっと見る
              <span className="text-[12px]">→</span>
            </Link>
          </div>

          {/* 右：事例カード（Casesテーブル連動） */}
          <div className="grow grid gap-3 md:grid-cols-2">
            {featuredCases.length === 0 ? (
              <p className="px-2 py-4 text-[13px] text-slate-500">
                現在表示できる導入事例はありません。Airtable の「Cases」テーブルにデータを追加してください。
              </p>
            ) : (
              featuredCases.map((c, index) => (
                <Link
                  key={c.id}
                  href={`/cases/${c.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 shadow-sm shadow-slate-100/80 transition hover:-translate-y-1 hover:border-slate-900/70 hover:bg-white"
                >
                  <p className="text-[11px] font-semibold tracking-[0.22em] text-slate-400">
                    {`CASE ${String(index + 1).padStart(2, "0")}`}
                  </p>
                  <h3 className="mt-2 text-[15px] font-semibold leading-snug text-slate-900 group-hover:text-slate-950">
                    {c.title}
                  </h3>
                  {c.summary && (
                    <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                      {c.summary}
                    </p>
                  )}
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="rounded-[32px] border border-slate-200 bg-slate-50 px-6 py-7 shadow-sm shadow-slate-100/70 md:px-8 md:py-8">
        <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">FAQ</p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">よくあるご質問</h2>
        <div className="mt-4 space-y-4 text-[14px] leading-relaxed text-slate-700 md:text-[15px]">
          <div>
            <h3 className="font-semibold text-slate-900">Q. どんなDX・RFIDシステムを提供していますか？</h3>
            <p className="mt-1">北海道の建設・物流・製造向けに、RFID/NFCで自動取得したデータをAIが要約する日報・点検・資材管理システムを提供しています。</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Q. 対応業界はどこですか？</h3>
            <p className="mt-1">建設、運送、製造など現場での移動や計測が多い業界を中心に、イベントやヘルスケアなどNFCを活かせる領域にも対応可能です。</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Q. RFID/NFCとAIはどのように連携しますか？</h3>
            <p className="mt-1">タグ読み取りで取得したデータを即座にクラウドへ送り、AIが要約・異常検知・アラートを行います。音声や写真入力も組み合わせ、現場の文脈を失わずにレポート化します。</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Q. 相談や導入の始め方は？</h3>
            <p className="mt-1">
              まずはスモールスタートのPoCやデモからご提案します。お気軽に
              <Link href="/contact" className="ml-1 underline underline-offset-4 hover:text-slate-950">
                お問い合わせフォーム
              </Link>
              よりご連絡ください。
            </p>
          </div>
        </div>
        <div className="mt-5 text-[12px] font-semibold tracking-[0.2em] text-slate-800">
          <Link href="/about" className="underline underline-offset-4 hover:text-slate-950">
            北海道発のDX・RFIDシステム開発パートナーについて詳しく知る
          </Link>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "どんなDX・RFIDシステムを提供していますか？",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "北海道の建設・物流・製造向けに、RFID/NFCで自動取得したデータをAIが要約する日報・点検・資材管理システムを提供しています。",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "対応業界はどこですか？",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "建設、運送、製造など現場での移動や計測が多い業界を中心に、イベントやヘルスケアなどNFCを活かせる領域にも対応可能です。",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "RFID/NFCとAIはどのように連携しますか？",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "タグ読み取りで取得したデータを即座にクラウドへ送り、AIが要約・異常検知・アラートを行います。音声や写真入力も組み合わせ、現場の文脈を失わずにレポート化します。",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "相談や導入の始め方は？",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "まずはスモールスタートのPoCやデモからご提案します。お気軽にお問い合わせフォームよりご連絡ください。",
                    },
                  },
                ],
              },
              null,
              2
            ),
          }}
        />
      </section>
    </div>
  );
}

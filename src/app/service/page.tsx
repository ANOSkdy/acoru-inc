import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { services } from "./_data";

export const metadata: Metadata = {
  title: "サービス | 北海道のDX・RFIDシステムとAI伴走支援",
  description:
    "Acoruのサービス一覧。北海道でDX・RFIDシステムを設計し、RFID/NFCとAIを活用した現場DXや日報自動化、AIエージェント導入を提供します。",
  alternates: {
    canonical: "/service",
  },
};

export default function ServicePage() {
  const sorted = [...services].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 md:px-6 md:pt-12">
      {/* =========================
          HERO：メッセージ ＋ 画像
         ========================= */}
      <section className="space-y-8">
        {/* メッセージ */}
        <div className="max-w-4xl">
          <h1 className="text-3xl font-semibold leading-relaxed tracking-tight text-slate-900 md:text-4xl">
            RFIDとAIで現場の
            <br />
            “困った”を無くす。
          </h1>
          <p className="mt-5 text-[14px] leading-relaxed text-slate-700 md:text-[15px]">
            Acoru合同会社は、RFID・NFCなどのIoT技術とAIエージェントを活用し、北海道発のDX・RFIDシステムで誰一人取り残さない「インクルーシブDX」を実現します。
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-slate-700 md:text-[15px]">
            インクルーシブDXとは、年齢・職種・障がいの有無・ITリテラシー・地域格差といった“デジタル分断”を越え、
            現場の誰もがデータとテクノロジーを当たり前に使いこなせる状態をつくる変革です。寒冷地や広域移動が前提となる北海道でも、RFIDとAIの組み合わせでシンプルに運用できる仕組みを設計しています。
          </p>
        </div>

        {/* ヒーロー画像：service-rfid-nippo.jpg を使用 */}
        <div className="relative h-56 overflow-hidden rounded-3xl md:h-72 lg:h-80">
          <Image
            src="/service-rfid-nippo.jpg"
            alt="RFID / NFC × AI 日報自動化のイメージ"
            fill
            priority
            sizes="(min-width: 1024px) 960px, (min-width: 768px) 100vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* =========================
          サービス一覧
         ========================= */}
      <section className="mt-12 space-y-4">
        <div className="space-y-2">
          <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">
            事業内容
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-[26px]">
            北海道のDX・RFIDシステムとAIを軸にした、現場起点のDXサービス。
          </h2>
          <p className="max-w-2xl text-[14px] leading-relaxed text-slate-600 md:text-[15px]">
            まずは1現場・1プロジェクトから始められるように、Acoruでは3つのサービスラインをご提供しています。
            現場の日報自動化、DX計画の設計、AIエージェント導入支援など、現在地に合わせてお選びいただけます。
          </p>
        </div>

        <div className="text-[12px] font-semibold tracking-[0.2em] text-slate-800">
          <Link href="/" className="underline underline-offset-4 hover:text-slate-950">
            北海道発のDX・RFIDシステムをホームで見る
          </Link>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {sorted.map((service) => (
            <Link
              key={service.slug}
              href={`/service/${service.slug}`}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-100/70 transition hover:-translate-y-1 hover:border-slate-900/70"
            >
              {service.image && (
                <div className="mb-3 overflow-hidden rounded-xl">
                  <Image
                    src={service.image}
                    alt={service.name}
                    width={480}
                    height={240}
                    className="h-32 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
              )}

              <p className="text-[11px] font-semibold tracking-[0.18em] text-slate-500">
                {service.category}
              </p>
              <h3 className="mt-2 text-sm font-semibold text-slate-900 md:text-[15px]">
                {service.name}
              </h3>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate-600">
                {service.shortDescription}
              </p>
              <span className="mt-4 text-[11px] font-semibold tracking-[0.18em] text-slate-700 group-hover:text-slate-900">
                詳細を見る →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { brandMessage, pricingNote, valueMessage } from "@/lib/messaging";
import { services } from "./_data";

export const metadata: Metadata = {
  title: "サービス・料金 | 業務データで現場と経営をつなぐ",
  description:
    "業務データ診断（15万円）、業務システム Osasal（月額7万円〜）、デジタル顧問（月額7万円〜）。人に依存していた業務と情報を、仕組みとして会社に残します。価格は税抜です。",
};

export default function ServicePage() {
  const sorted = services;

  return (
    <>
      <Section className="pt-10 md:pt-12">
        <Container>
          <div className="space-y-6">
            <div className="max-w-4xl space-y-4">
              <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">サービス・料金</p>
              <h1 className="text-2xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-3xl">
                {brandMessage}
              </h1>
              <p className="max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
                {valueMessage}まず業務データ診断で現状を洗い出し、そのあとは業務システムかデジタル顧問で、現場で使い続けられるところまで伴走します。紙のままでも対応できます。
              </p>
            </div>

            <div className="relative h-56 overflow-hidden rounded-3xl md:h-72 lg:h-80">
              <Image
                src="/service-dx-design.jpg"
                alt="業務データ基盤化支援のイメージ"
                fill
                priority
                sizes="(min-width: 1024px) 960px, (min-width: 768px) 100vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-2 pb-20">
        <Container>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">サービス</p>
              <h2 className="text-xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-2xl">まず診断。そのあとは月額で伴走します。</h2>
            </div>

            <Link href="/osasal" className="flex min-h-16 flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#534491]/20 bg-[#534491]/5 px-5 py-4 text-sm text-[#534491] focus-visible:outline-2 focus-visible:outline-offset-4">
              <span><strong>Osasal（AI日報）</strong> — 業務システムの基本プラン。かざすだけで、日報・勤怠。</span>
              <span>製品・料金を見る <span aria-hidden="true">↗</span></span>
            </Link>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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

                  <p className="text-[11px] font-semibold tracking-[0.18em] text-slate-500">{service.category}</p>
                  <h3 className="mt-2 text-base font-semibold leading-relaxed text-slate-900 sm:text-lg">{service.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{service.shortDescription}</p>
                  <p className="mt-4 flex flex-wrap items-baseline gap-x-2 border-t border-slate-200 pt-3">
                    <span className="text-[11px] font-semibold tracking-[0.12em] text-[#534491]">{service.priceLabel}</span>
                    <span className="text-base font-semibold text-slate-900">{service.price}</span>
                  </p>
                  <span className="mt-4 text-[11px] font-semibold tracking-[0.18em] text-slate-700 group-hover:text-slate-900">
                    詳細を見る →
                  </span>
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-6 text-slate-500 sm:max-w-xl">{pricingNote}</p>
              <Button href="/contact" className="w-full justify-center sm:w-auto">業務データ診断を相談する</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

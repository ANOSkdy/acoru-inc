import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { services } from "./_data";

export const metadata: Metadata = {
  title: "サービス一覧 | 現場と事務をつなぐ仕組みづくり",
  description:
    "Acoruは、ICタグとAIを活用し、現場の記録・報告・確認・集計の負担を減らす仕組みを整える会社です。1現場・1プロジェクトから無理なく始められる3つの支援をご紹介します。",
};

export default function ServicePage() {
  const sorted = [...services].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <Section className="pt-10 md:pt-12">
        <Container>
          <div className="space-y-6">
            <div className="max-w-4xl space-y-4">
              <h1 className="text-2xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-3xl">
                現場と事務をつなぐ、
                <br />
                3つの支援
              </h1>
              <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
                Acoruは、ICタグとAIを活用し、現場の記録・報告・確認・集計の負担を減らす仕組みを整える会社です。まずは1現場・1プロジェクトから、無理なく始められます。
              </p>
            </div>

            <div className="relative h-56 overflow-hidden rounded-3xl md:h-72 lg:h-80">
              <Image
                src="/service-rfid-nippo.jpg"
                alt="ICタグとAIで現場改善を進めるイメージ"
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
              <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">事業内容</p>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                課題に合わせて選べる、現場起点の支援メニュー
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                報告や確認の手間を減らしたい、引き継ぎを楽にしたい、前に導入した仕組みを見直したい。Acoruは現場の状況に合わせて、実務で使われる形に整えます。
              </p>
            </div>

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
                  <h3 className="mt-2 text-base font-semibold text-slate-900 sm:text-lg">{service.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{service.shortDescription}</p>
                  <span className="mt-4 text-[11px] font-semibold tracking-[0.18em] text-slate-700 group-hover:text-slate-900">
                    支援内容を見る →
                  </span>
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-700 sm:text-base">詳細や導入ステップは各サービスページをご覧ください。</p>
              <Button href="/contact" className="w-full justify-center sm:w-auto">現場の悩みを相談する</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

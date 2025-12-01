import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { services } from "./_data";

export default function ServicePage() {
  const sorted = [...services].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <Section className="pt-10 md:pt-12">
        <Container>
          <div className="space-y-6">
            <div className="max-w-4xl space-y-4">
              <h1 className="text-2xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-3xl">
                RFIDとAIで現場の
                <br />
                “困った”を無くす。
              </h1>
              <div className="space-y-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                <p>
                  Acoru合同会社は、RFID・NFCなどのIoT技術とAIエージェントを活用し、誰一人取り残さない「インクルーシブDX」を実現します。
                </p>
                <p>
                  インクルーシブDXとは、年齢・職種・障がいの有無・ITリテラシー・地域格差といった“デジタル分断”を越え、現場の誰もがデータとテクノロジーを当たり前に使いこなせる状態をつくる変革です。
                </p>
              </div>
            </div>

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
          </div>
        </Container>
      </Section>

      <Section className="pt-2 pb-20">
        <Container>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">事業内容</p>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">RFID / AI を軸にした、現場起点のDXサービス</h2>
              <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                まずは1現場・1プロジェクトから始められるように、Acoruでは3つのサービスラインをご提供しています。現場の業務自動化、DX計画の設計、AIエージェント導入支援など、現在地に合わせてお選びいただけます。
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
                    詳細を見る →
                  </span>
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-700 sm:text-base">詳細や導入ステップは各サービスページをご覧ください。</p>
              <Button href="/contact" className="w-full justify-center sm:w-auto">導入の相談をする</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

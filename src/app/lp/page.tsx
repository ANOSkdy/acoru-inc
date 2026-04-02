import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "現場業務の記録・報告・管理を回しやすくする仕組み | Acoru",
  description:
    "人を増やしにくい現場でも、記録・報告・確認・集計が回る仕組みを。Acoruは、前に導入した仕組みが合わなかった会社さまにも、今の仕事の流れに合わせてご提案します。",
  alternates: {
    canonical: "/lp",
  },
};

const concerns = [
  "人を増やしたくても増やしにくい",
  "現場の報告や確認に手間がかかる",
  "紙やExcelや口頭連絡が多い",
  "前に導入した仕組みが現場に合わなかった",
  "会社のやり方に合う形で整えたい",
];

const values = [
  {
    title: "現場に合わせて整える",
    body: "記録・報告・確認・集計の流れを、今の運用に沿って整理し直します。無理に現場のやり方を変えるのではなく、回る形へ整えます。",
  },
  {
    title: "前に合わなかった仕組みも見直せる",
    body: "以前の導入で定着しなかった要因を一緒に整理し、入力項目や確認手順を現場に合わせて再設計します。",
  },
  {
    title: "現場の動きを、その場で記録につなげられる",
    body: "たとえばICタグをスマホでタッチするだけで、出勤・作業開始・現場到着・機器利用などの記録につなげられます。転記や確認の負担も減らせます。",
  },
];

const useCases = [
  "日報・作業報告の負担を減らしたい",
  "出勤・作業開始・現場到着を残したい",
  "以前導入した仕組みが定着しなかった",
  "事務所での転記・確認・集計を減らしたい",
];

const process = ["ご相談", "現状の整理", "ご提案", "仕組みづくり", "導入・定着支援"];

export default function LpPage() {
  return (
    <>
      <Section className="pb-8 pt-6 sm:pb-10 md:pt-10">
        <Container>
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white px-5 py-8 sm:px-8 sm:py-10 md:px-12 md:py-14">
            <div className="mx-auto max-w-3xl space-y-5 sm:space-y-6">
              <p className="text-[12px] font-semibold tracking-[0.2em] text-slate-500">現場業務の見直し支援</p>
              <h1 className="text-pretty text-[27px] font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                <span className="block">人を増やしにくい現場でも、</span>
                <span className="mt-1 block">記録・報告・管理が回る仕組みを。</span>
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                Acoruは、現場の記録・報告・確認・集計の負担が大きい企業さま向けに、今の仕事の流れに合わせた仕組みを整えます。前に導入したものが合わなかった会社さまにも、現場に合わせて組み直しから伴走します。
              </p>
              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
                <Button href="/contact" className="w-full justify-center sm:w-auto sm:px-7">
                  現場の悩みを相談する
                </Button>
                <Button
                  href="#concerns"
                  variant="ghost"
                  className="w-full justify-center sm:w-auto sm:px-7"
                >
                  よくあるお悩みを見る
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="concerns" className="py-8 sm:py-10 md:py-12">
        <Container>
          <div className="space-y-5">
            <h2 className="text-pretty text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              <span className="block">こんなお悩みは</span>
              <span className="block">ありませんか？</span>
            </h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {concerns.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-700 sm:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section className="py-8 sm:py-10 md:py-12">
        <Container>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-6 sm:px-8 sm:py-8">
            <div className="max-w-3xl space-y-4">
              <h2 className="text-pretty text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                <span className="block">仕組みを入れても、</span>
                <span className="block">現場で使われない理由があります</span>
              </h2>
              <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                入力の手間が多すぎる、実際の仕事の流れと合わない、必要な確認項目や承認の順番が違う。こうしたズレがあると、結局は紙やExcelに戻ってしまいます。標準機能だけでは、現場ごとの差を吸収しきれないことが少なくありません。
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-8 sm:py-10 md:py-12">
        <Container>
          <div className="space-y-5">
            <h2 className="text-pretty text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Acoruができること</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {values.map((value) => (
                <article key={value.title} className="rounded-2xl border border-slate-200 bg-white px-4 py-5 sm:px-5">
                  <h3 className="text-base font-semibold leading-7 text-slate-900">{value.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{value.body}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-8 sm:py-10 md:py-12">
        <Container>
          <div className="space-y-5">
            <h2 className="text-pretty text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              <span className="block">たとえば、こんな場面で</span>
              <span className="block">役立ちます</span>
            </h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {useCases.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-700 sm:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section className="py-8 sm:py-10 md:py-12">
        <Container>
          <div className="space-y-5">
            <h2 className="text-pretty text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">ご相談から導入まで</h2>
            <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5">
              {process.map((step, index) => (
                <li key={step} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-center">
                  <p className="text-[11px] font-semibold tracking-[0.2em] text-slate-400">STEP {index + 1}</p>
                  <p className="mt-1 text-sm font-medium text-slate-700">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section className="pt-8 sm:pt-10 md:pt-12">
        <Container>
          <div className="rounded-3xl border border-slate-200 bg-slate-950 px-5 py-8 text-white sm:px-8 sm:py-10 md:px-12 md:py-12">
            <div className="mx-auto max-w-3xl space-y-5">
              <h2 className="text-pretty text-2xl font-semibold tracking-tight sm:text-3xl">
                <span className="block">見直すべきなのは、</span>
                <span className="block">人ではなく仕組みかもしれません</span>
              </h2>
              <p className="text-sm leading-7 text-slate-200 sm:text-base sm:leading-8">
                人員を増やす前に、まずは今の記録・報告・確認・集計の流れを整えることで、現場と管理側の負担は軽くできます。まずは現場の状況をお聞かせください。
              </p>
              <Button href="/contact" className="w-full justify-center sm:w-auto sm:px-7">
                相談してみる
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

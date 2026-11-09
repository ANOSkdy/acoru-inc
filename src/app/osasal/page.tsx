import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { broadcastProgramLabel, broadcastVerb, osasal, osasalDescription, osasalFaq, osasalGraph, osasalTitle, OSASAL_CASE_PATH, OSASAL_URL } from "@/lib/osasal";
import { organizationDetails, serializeGraph } from "@/lib/structured-data";
import { hasCompleteCaseSection, sugimuraCase } from "@/lib/sugimura-case";
import { OsasalMotion } from "./OsasalMotion";
import "./osasal.css";

export const metadata: Metadata = {
  title: { absolute: osasalTitle },
  description: osasalDescription,
  alternates: { canonical: OSASAL_URL },
  openGraph: { type: "website", locale: "ja_JP", url: OSASAL_URL, siteName: "Acoru合同会社", title: osasalTitle, description: osasalDescription },
  twitter: { card: "summary_large_image", title: osasalTitle, description: osasalDescription, images: ["/osasal/opengraph-image"] },
};

function Arrow() { return <span aria-hidden="true">↗</span>; }

function Cta({ children, request = false, secondary = false }: { children: ReactNode; request?: boolean; secondary?: boolean }) {
  return <Link className={`osasal-button${secondary ? " osasal-button-secondary" : ""}`} href={request ? "/contact?product=osasal&request=materials" : "/contact?product=osasal"}>{children}<Arrow /></Link>;
}

function SectionHeading({ number, label, title, children }: { number: string; label: string; title: string; children: ReactNode }) {
  return <div className="osasal-section-heading"><p className="osasal-eyebrow"><span>{number}</span>{label}</p><h2>{title}</h2><p className="osasal-lead">{children}</p></div>;
}

function SignalIcon({ type }: { type: "record" | "time" | "chart" }) {
  return <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {type === "record" ? <><rect x="7" y="5" width="18" height="23" rx="3" /><path d="M12 3h8v5h-8zM12 14h8M12 19h8M12 24h5" /></> : type === "time" ? <><circle cx="16" cy="16" r="11" /><path d="M16 9v7l5 3" /></> : <><path d="M5 5v22h22M11 22v-7M17 22V9M23 22v-11" /></>}
  </svg>;
}

const features = [
  { type: "record" as const, title: "スマホをかざして日報を記録", text: "日報の元になる現場記録を、スマホをタグにかざして残せます。作業機械・稼働時間などの情報を記録し、紙に書いて事務所で打ち直す手間を減らします。" },
  { type: "time" as const, title: "現場で出勤・作業開始を記録", text: "出勤や作業開始などの記録を、スマホで残せます。現場の動きに合わせてタグの置き場所と記録のタイミングを整え、無理なく続けられる使い方をつくります。" },
  { type: "chart" as const, title: "記録をそのまま集計に", text: "現場で残した記録を、確認・集計に使える形へまとめます。紙や表計算への転記を減らし、事務担当者が記録を探して集める仕事を軽くします。" },
];
const steps = [
  { title: "相談", text: "今の困りごと、利用人数、希望する開始時期を伺います。", period: "初回相談時に日程をご案内" },
  { title: "現場ヒアリング", text: "紙の日報や現在の手順を確認し、現場に合う使い方を整理します。", period: "相談後に実施日を調整" },
  { title: "導入", text: "タグの配置や記録の手順を整え、操作説明を行って利用を始めます。", period: "ヒアリング後に期間をご案内" },
  { title: "定着支援", text: "使い始めてわかった困りごとを聞き、続けやすい運用へ見直します。", period: "利用開始後も継続して支援" },
];

export default function OsasalPage() {
  const broadcast = osasal.broadcast;
  const testimonialReady = hasCompleteCaseSection(Object.values(sugimuraCase.testimonial));
  const address = organizationDetails.address;

  return (
    <div className="osasal-page" data-osasal-page>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeGraph(osasalGraph()) }} />
      <div className="osasal-reading-progress" aria-hidden="true"><div data-osasal-progress /></div>
      <aside className="osasal-broadcast" aria-label="放送のお知らせ"><span className="osasal-broadcast-dot" aria-hidden="true" /><span>{broadcast.dateLabel}｜{broadcastProgramLabel}で{broadcastVerb}</span></aside>

      <section className="osasal-hero osasal-shell" aria-labelledby="osasal-title" data-motion-hero>
        <div className="osasal-hero-copy">
          <nav className="osasal-breadcrumb" aria-label="パンくずリスト"><Link href="/">ホーム</Link><span aria-hidden="true">/</span><span aria-current="page">Osasal</span></nav>
          <p className="osasal-eyebrow">北海道・札幌発の現場記録システム</p>
          <h1 id="osasal-title"><span className="osasal-wordmark">Osasal<span>オササル</span></span><span className="osasal-catch">かざすだけで、<br />日報・勤怠。</span></h1>
          <p className="osasal-hero-description">スマホをタグにかざして記録。<br />札幌のAcoruが定着まで伴走します。</p>
          <div className="osasal-actions"><Cta request>資料をもらう</Cta><Cta secondary>問い合わせる</Cta></div>
          <div className="osasal-hero-price"><span>初期実装 <strong>35万円</strong></span><span>月額 <strong>7万円〜</strong></span><span>（税抜）</span><a href="#pricing">料金の目安を見る <span aria-hidden="true">↓</span></a></div>
        </div>
        <figure className="osasal-visual" data-osasal-visual>
          <div className="osasal-orbit osasal-orbit-one" aria-hidden="true" /><div className="osasal-orbit osasal-orbit-two" aria-hidden="true" />
          <div className="osasal-photo-shell osasal-photo-shell-flat"><Image src="/osasal-hero-telop.png" alt="重機の運転席でNFCタグにスマホをかざし、日報を記録するイメージ。「スマホをかざすだけで日報完了」" width={1920} height={1080} priority sizes="(min-width: 1000px) 560px, (min-width: 700px) 48vw, 100vw" className="osasal-product-image" /></div>
          <figcaption>操作のイメージ</figcaption>
        </figure>
      </section>

      <nav className="osasal-section-nav" aria-label="製品ページ内のナビゲーション"><div className="osasal-shell"><a href="#about-product">Osasalとは</a><a href="#features">できること</a><a href="#case">導入事例</a><a href="#pricing">料金</a><a href="#faq">よくある質問</a></div></nav>

      <section className="osasal-section osasal-shell" aria-labelledby="broadcast-title">
        <p className="osasal-eyebrow"><span>01</span>HBCでのご紹介</p>
        <h2 id="broadcast-title">{broadcast.status === "aired" ? "HBCの番組で紹介されました" : "HBCの番組で紹介されます"}</h2>
        <p className="osasal-lead">Osasalは、{broadcast.dateLabel}{broadcast.timeLabel}放送の{broadcastProgramLabel}で{broadcastVerb}。{broadcast.video ? "放送の内容は、HBCニュースの公式YouTubeでご覧いただけます。" : null}</p>
        {broadcast.video ? (
          <figure className="osasal-video">
            <div className="osasal-video-frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${broadcast.video.youtubeId}`}
                title={broadcast.video.title}
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <figcaption>出典：{broadcast.video.channel}（YouTube）｜<a href={`https://www.youtube.com/watch?v=${broadcast.video.youtubeId}`} target="_blank" rel="noopener noreferrer">YouTubeで見る<span className="osasal-sr-only">（新しいタブで開きます）</span></a></figcaption>
          </figure>
        ) : null}
        {broadcast.points.length ? <div className="osasal-three-grid">{broadcast.points.map(point => <article className="osasal-note-card" key={point.title}><h3>{point.title}</h3><p>{point.description}</p></article>)}</div> : broadcast.status === "aired" ? null : <p className="osasal-broadcast-note">番組で紹介された内容は、放送後にこのページでお知らせします。</p>}
        {broadcast.background ? <p className="osasal-small">{broadcast.background}</p> : null}
      </section>

      <section id="about-product" className="osasal-section osasal-tint" aria-labelledby="about-product-title"><div className="osasal-shell osasal-about-grid">
        <div><p className="osasal-eyebrow"><span>02</span>Osasalとは</p><h2 id="about-product-title">スマホで日報・勤怠を記録する、<br />現場向けのAI日報システム</h2></div>
        <div><p className="osasal-lead">Osasal（オササル）は、スマホをかざして日報・勤怠を記録する現場向けシステムです。</p><p>建設・物流・設備・ビルメンテナンスなどの、現場担当者と総務・事務担当者の仕事を支えます。紙への記入、事務所での転記、集計の手間を減らし、現場の記録を事務の仕事につなげます。Acoruが現場の作業手順に合わせた導入と定着を支援します。</p></div>
      </div></section>

      <section className="osasal-section osasal-shell" aria-labelledby="problems-title"><p className="osasal-eyebrow"><span>03</span>よくあるお悩み</p><h2 id="problems-title">日報の転記や勤怠の集計に、<br className="osasal-mobile-break" />時間がかかっていませんか</h2><p className="osasal-lead">Osasalは、紙への記入・転記・集計に手間がかかる現場の記録を見直すためのシステムです。</p><ul className="osasal-problems">{["現場で書いた日報を、事務所で打ち直している", "月末になると、勤怠の集計に時間がかかる", "記入漏れの確認で、現場に連絡している", "導入したツールが、現場で使われていない"].map(text => <li key={text}><span aria-hidden="true">✓</span>{text}</li>)}</ul></section>

      <section id="features" className="osasal-section osasal-tint"><div className="osasal-shell"><SectionHeading number="04" label="できること" title="Osasalでできること">Osasalは、現場の記録から事務担当者の確認・集計までを支えます。</SectionHeading><div className="osasal-three-grid">{features.map((feature, index) => <article className="osasal-feature-card" key={feature.type}><div className="osasal-feature-top"><SignalIcon type={feature.type} /><span>0{index + 1}</span></div><h3>{feature.title}</h3><p>{feature.text}</p><div className="osasal-feature-line" aria-hidden="true" /></article>)}</div></div></section>

      <section id="case" className="osasal-section osasal-shell"><div className="osasal-case-panel"><div><p className="osasal-eyebrow"><span>05</span>導入事例：スギムラ建機様</p><h2>事務作業の負担を<br />約85%削減</h2><p className="osasal-lead">スギムラ建機様では、紙の日報をOsasalに切り替え、事務作業の負担を約85%削減しました。</p><Link className="osasal-text-link" href={OSASAL_CASE_PATH}>導入事例を詳しく見る <Arrow /></Link></div><div className="osasal-case-stat"><span>事務作業の削減率</span><strong>85<span>%</span></strong><p>※導入前後の運用状況をもとにした概算値です。<br />すべての現場で同じ削減率を保証するものではありません。</p></div><div className="osasal-before-after"><div><span>導入前</span><p>紙の日報を記入・回収して、事務担当者が転記・集計。</p></div><span className="osasal-before-after-arrow" aria-hidden="true">→</span><div><span>導入後</span><p>現場でスマホをかざして記録。日報の元データから集計へ。</p></div></div>{testimonialReady ? <blockquote className="osasal-testimonial"><p>{sugimuraCase.testimonial.comment}</p><cite>{sugimuraCase.testimonial.company} {sugimuraCase.testimonial.position} {sugimuraCase.testimonial.name}</cite></blockquote> : null}</div></section>

      <section className="osasal-section osasal-shell"><SectionHeading number="06" label="他のツールとの違い" title="導入後の定着まで支援します">Osasalは、ツールを納品して終わりにせず、現場に定着するまで伴走します。</SectionHeading><div className="osasal-table-scroll"><table className="osasal-comparison"><caption className="sr-only">納品のみの支援とOsasalの導入支援の比較</caption><thead><tr><th scope="col">支援のタイミング</th><th scope="col">納品のみで支援が終わる場合</th><th scope="col">Osasal</th></tr></thead><tbody><tr><th scope="row">導入前</th><td>自社で運用手順を決める</td><td>現場の手順を聞き、使い方を一緒に整理</td></tr><tr><th scope="row">使い始め</th><td>自社で現場担当者に説明</td><td>操作説明と現場の使い方の確認</td></tr><tr><th scope="row">導入後</th><td>自社で運用を見直す</td><td>困りごとを聞き、定着まで運用を支援</td></tr></tbody></table></div><p className="osasal-small">比較欄は、ツールの納品のみで支援が終わる場合を想定しています。</p></section>

      <section className="osasal-section osasal-tint"><div className="osasal-shell"><SectionHeading number="07" label="導入の流れ" title="導入の流れ">相談・現場ヒアリング・導入・定着支援の4ステップで進めます。</SectionHeading><ol className="osasal-steps">{steps.map((step, index) => <li key={step.title}><span className="osasal-step-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p><span className="osasal-step-period">{step.period}</span></li>)}</ol><p className="osasal-small">導入期間は現場の状況によって異なります。スギムラ建機様では、2024年10月〜2025年3月に導入し、2025年3月から定着支援を継続しています。</p></div></section>

      <section id="pricing" className="osasal-section osasal-shell"><SectionHeading number="08" label="料金" title="Osasalの料金">初期実装費用は35万円、月額料金は7万円〜です（いずれも税抜）。</SectionHeading><div className="osasal-pricing-grid"><article className="osasal-price-card"><p>初期実装費用</p><div><strong>{osasal.pricing.implementation / 10000}</strong><span>万円</span></div><p>導入時にかかる費用</p></article><article className="osasal-price-card osasal-price-monthly"><p>月額料金</p><div><strong>{osasal.pricing.monthlyEstimate / 10000}</strong><span>万円〜<span className="osasal-price-unit">／月</span></span></div><p>業務システム（ベーシック）の料金</p></article></div><p className="osasal-small">価格は税抜です。料金に含まれる機能・利用人数・支援の範囲、タグなどの別途費用、契約期間はお問い合わせ時にご案内します。</p><div className="osasal-actions"><Cta>自社の料金を確認する</Cta></div></section>

      <section id="faq" className="osasal-section osasal-tint"><div className="osasal-shell osasal-faq-grid"><SectionHeading number="09" label="よくある質問" title="よくある質問">Osasalの利用条件・料金・導入支援について、よくいただくご質問にお答えします。</SectionHeading><div className="osasal-faq-list">{osasalFaq.map(({ question, answer }, index) => <details key={question}><summary><span className="osasal-faq-q">Q{index + 1}.</span>{question}<span className="osasal-faq-toggle" aria-hidden="true">＋</span></summary><p>{answer}</p></details>)}</div></div></section>

      <section className="osasal-section osasal-shell"><SectionHeading number="10" label="会社情報" title="提供会社">Osasalは、北海道札幌市のAcoru合同会社が提供しています。</SectionHeading><div className="osasal-company"><div className="osasal-company-brand"><Image src="/acoru-wide-logo.png" alt="Acoru合同会社" width={1584} height={396} sizes="(min-width: 700px) 340px, 70vw" /><p>北海道の中小企業で、現場の記録を<br />経営の数字につなげる仕組みをつくっています。</p><Link className="osasal-text-link" href="/about">Acoruについて <Arrow /></Link></div><dl><div><dt>会社名</dt><dd>Acoru合同会社</dd></div><div><dt>代表者</dt><dd>角谷亮太</dd></div><div><dt>所在地</dt><dd>〒{address.postalCode}<br />{address.addressRegion}{address.addressLocality}{address.streetAddress}</dd></div><div><dt>お問い合わせ</dt><dd><Link href="/contact?product=osasal">お問い合わせフォーム</Link><br /><a href="mailto:support@acoru.jp">support@acoru.jp</a></dd></div></dl></div></section>

      <section className="osasal-final"><div className="osasal-shell"><p className="osasal-eyebrow">お問い合わせ</p><h2>日報・勤怠の記録について、<br className="osasal-mobile-break" />ご相談ください</h2><p>今の日報の書き方や利用人数をお聞かせください。<br />資料のご請求も承ります。</p><div className="osasal-actions"><Cta>問い合わせる</Cta><Cta request secondary>資料をもらう</Cta></div><Link className="osasal-text-link" href={OSASAL_CASE_PATH}>まずは導入事例を見る <Arrow /></Link></div></section>
      <OsasalMotion />
    </div>
  );
}

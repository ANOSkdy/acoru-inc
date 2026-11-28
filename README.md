This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Public content cache

Public news, cases and company information share a tagged data cache. Public
pages use ISR with a 24-hour fallback refresh; CMS saves normally invalidate
them immediately. Contact submissions always write directly to the database.

Set `ACORU_REVALIDATE_SECRET` as a Production Secret in Vercel. Configure the CMS
with the same secret and `ACORU_REVALIDATE_URL=https://acoru.jp/api/revalidate`.
The authenticated POST endpoint invalidates only the fixed public content tag
and routes. A successful response means invalidation was accepted; pages are
regenerated on their next request. Use separate URLs and secrets for previews.

Verify changes with `pnpm typecheck`, `pnpm build`, and
`node --test tests/public-content-cache.test.cjs tests/case-urls.test.cjs tests/structured-data.test.cjs`.

## Acoru Knowledge の記事管理

既存CMSの Acoru → お知らせで記事を作成し、カテゴリに
`Knowledge:外注・納品確認`、`Knowledge:AI開発の判断`、`Knowledge:現場事例`、
`Knowledge:保守運用` などと入力します。コロンの後の文字列が一覧のテーマになります。
タイトル・slug・概要・画像・公開状態は通常の記事と同じ入力欄を使います。

本文は Markdown で記入します。見出し（`##`、`###`）から目次を自動生成します。
確認条件、出典は本文に、内容を改訂した日は「更新日」として記入してください。
関連動画・記事・サービスは該当箇所に Markdown のリンクを置けます。
記事末尾の相談リンクは自動で表示されます。

公開後のURLは `/knowledge/<slug>` です。CMSの公開・更新・非公開が
公式サイトの既存の更新通知を通じて、一覧・詳細・サイトマップに反映されます。
現在のカテゴリに従って振り分けるため、公開後に掲載先を変えるときは共有済みのURLも確認してください。

公開済み記事の転送・一覧・サイトマップは、`KNOWLEDGE_BASE_URL` に検証先、
`KNOWLEDGE_ARTICLE_SLUG` にその記事のslugを指定し、`node --test tests/knowledge-http.test.cjs` で確認できます。

Knowledgeで使うWeb用CSSとロゴはデザインシステム正本に由来します。
正本の更新時は `node scripts/sync-knowledge-brand.mjs` で配布用ファイルを更新します。
正本の場所は `ACORU_DESIGN_SYSTEM_DIR` で指定できます。

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

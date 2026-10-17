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

// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Both legacy spellings must redirect directly, before slash normalization.
  skipTrailingSlashRedirect: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oxgzoulsmkdcoyjk.public.blob.vercel-storage.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/cases/case-1", destination: "/cases/sugimura-kenki-nfc-nippo", permanent: true },
      { source: "/cases/case-1/", destination: "/cases/sugimura-kenki-nfc-nippo", permanent: true },
      // Preserve the previous no-trailing-slash behavior for other page routes.
      // Vercel hoists slash redirects. Exclude the legacy URL even after hoisting.
      { source: "/:path((?!cases/case-1(?:/|$)|api(?:/|$)|_next(?:/|$)|.*\\.[^/]+/?$).+)/", destination: "/:path", statusCode: 308 },
      {
        source: "/company",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/cases/1_JcrEth",
        destination: "/cases/case-4",
        permanent: true,
      },
      {
        source: "/cases/IYpZ_6vL",
        destination: "/cases/case-8",
        permanent: true,
      },
      {
        source: "/cases/hclG8Utv",
        destination: "/cases/case-5",
        permanent: true,
      },
      {
        source: "/cases/zGvuo2O7",
        destination: "/cases/case-6",
        permanent: true,
      },
      {
        source: "/cases/joIsWFPE",
        destination: "/cases/case-2",
        permanent: true,
      },
      {
        source: "/cases/Abc4rmRG",
        destination: "/cases/case-3",
        permanent: true,
      },
      {
        source: "/cases/4qdWsex3",
        destination: "https://acoru.jp/news/post1",
        permanent: true,
      },
      {
        source: "/cases/eXpX1Yfl",
        destination: "https://acoru.jp/news/post7",
        permanent: true,
      },
      {
        source: "/cases/23dBDo0a",
        destination: "https://acoru.jp/news/post6",
        permanent: true,
      },
      {
        source: "/cases/jJgWcKcx",
        destination: "https://acoru.jp/news/post5",
        permanent: true,
      },
      {
        source: "/cases/CGnEZvsr",
        destination: "https://acoru.jp/news/post4",
        permanent: true,
      },
      {
        source: "/cases/K4MFMKdP",
        destination: "https://acoru.jp/news/post3",
        permanent: true,
      },
      {
        source: "/cases/q2leQNYQ",
        destination: "https://acoru.jp/news/post8",
        permanent: true,
      },
      {
        source: "/cases/E3499Bzc",
        destination: "https://acoru.jp/news/post9",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

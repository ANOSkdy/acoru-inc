// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "v5.airtableusercontent.com",
      },
      {
        protocol: "https",
        hostname: "dl.airtable.com",
      },
    ],
  },
  async redirects() {
    return [
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
        destination: "https://www.acoru.jp/news/post1",
        permanent: true,
      },
      {
        source: "/cases/eXpX1Yfl",
        destination: "https://www.acoru.jp/news/post7",
        permanent: true,
      },
      {
        source: "/cases/23dBDo0a",
        destination: "https://www.acoru.jp/news/post6",
        permanent: true,
      },
      {
        source: "/cases/jJgWcKcx",
        destination: "https://www.acoru.jp/news/post5",
        permanent: true,
      },
      {
        source: "/cases/CGnEZvsr",
        destination: "https://www.acoru.jp/news/post4",
        permanent: true,
      },
      {
        source: "/cases/K4MFMKdP",
        destination: "https://www.acoru.jp/news/post3",
        permanent: true,
      },
      {
        source: "/cases/q2leQNYQ",
        destination: "https://www.acoru.jp/news/post8",
        permanent: true,
      },
      {
        source: "/cases/E3499Bzc",
        destination: "https://www.acoru.jp/news/post9",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

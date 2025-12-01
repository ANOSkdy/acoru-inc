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
        source: "/cases/K4MFMKdP",
        destination: "/news/post3",
        permanent: true,
      },
      {
        source: "/cases/CGnEZvsr",
        destination: "/news/post4",
        permanent: true,
      },
      {
        source: "/cases/q2leQNYQ",
        destination: "/news/post8",
        permanent: true,
      },
      {
        source: "/cases/jJgWcKcx",
        destination: "/news/post5",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

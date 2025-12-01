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
        destination: "/news/poet4",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

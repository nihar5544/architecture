/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "architecture-kappa.vercel.app" },
      { protocol: "https", hostname: "**.vercel.app" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;

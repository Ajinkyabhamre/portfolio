/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
    ],
  },
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: [
      "@react-email/components",
      "@react-email/render",
      "@react-email/tailwind",
    ],
  },
  webpack: (config, { isServer }) => {
    // Ensure tree-shaking for react-icons and other libraries
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        sideEffects: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;

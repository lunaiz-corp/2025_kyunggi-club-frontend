import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })
    return config
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.lunaiz.com",
      },
      // Only for mock data
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
    ],
  },

  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  transpilePackages: ["@packages/ui"],
  reactStrictMode: true,
}

export default nextConfig

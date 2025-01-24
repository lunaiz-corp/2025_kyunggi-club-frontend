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

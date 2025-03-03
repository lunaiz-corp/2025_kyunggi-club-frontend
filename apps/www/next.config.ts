import type { NextConfig } from "next"
import * as packageJson from "./package.json"

const nextConfig: NextConfig = {
  /* config options here */
  output:
    process.env.NODE_ENV === "production" ? "standalone" : undefined,
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? `${process.env.NEXT_PUBLIC_CDN_URL}/${packageJson.version}`
      : undefined,

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
        hostname: "kg-cdn-toast.schooler.kr",
      },
    ],

    dangerouslyAllowSVG: true,
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

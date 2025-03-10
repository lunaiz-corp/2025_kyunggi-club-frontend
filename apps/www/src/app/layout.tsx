import type { Metadata } from "next"
import Script from "next/script"

import { GoogleTagManager } from "@next/third-parties/google"

import ProgressBarProvider from "@packages/ui/components/ProgressBar"
import { A11ySkipLink } from "@packages/ui/components/krds/Explore"

import ChannelIO from "@packages/channelio"

import "react-loading-skeleton/dist/skeleton.css"
import "@/styles/globals.css"

import OverlayProvider from "@packages/ui/providers/OverlayProvider"
import QueryClientProvider from "@/providers/QueryClientProvider"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: {
    template: "%s - 경기고등학교 이공계동아리연합",
    default: "경기고등학교 이공계동아리연합",
  },

  description:
    "경기고등학교 이공계동아리연합 - 동아리 모집/선발 시스템",
  keywords: [
    "경기고등학교",
    "경기고",
    "이공계",
    "동아리",
    "STEM",
    "STEAM",
  ],

  metadataBase: new URL("https://kyunggi.club"),
  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: {
      template: "%s - 경기고등학교 이공계동아리연합",
      default: "경기고등학교 이공계동아리연합",
    },
    description:
      "경기고등학교 이공계동아리연합 - 동아리 모집/선발 시스템",
    url: "https://kyunggi.club",
    siteName: "경기고등학교 이공계동아리연합",
    images: [
      {
        url: "https://kg-cdn-toast.schooler.kr/assets/og-image.png",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: {
      template: "%s - 경기고등학교 이공계동아리연합",
      default: "경기고등학교 이공계동아리연합",
    },
    description:
      "경기고등학교 이공계동아리연합 - 동아리 모집/선발 시스템",
    images: ["https://kg-cdn-toast.schooler.kr/assets/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
  },

  icons: {
    icon: "https://kg-cdn-toast.schooler.kr/assets/icon/logo_margin.svg",
    shortcut:
      "https://kg-cdn-toast.schooler.kr/assets/icon/logo_margin.svg",
    apple:
      "https://kg-cdn-toast.schooler.kr/assets/icon/logo_margin@2x.png",
  },

  verification: {
    other: {
      monetag: "89f32e814a74861e68ca66c5c2c1ac92",
      "naver-site-verification":
        "95b75837c7d57d83723f91228e09c1e26d97621a",
    },
  },
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-gov-dynamic-subset.min.css"
        />

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/hack-font@3/build/web/hack-subset.css"
        />

        {process.env.NODE_ENV === "development" && (
          <Script
            crossOrigin="anonymous"
            src="https://cdn.jsdelivr.net/npm/react-scan/dist/auto.global.js"
          />
        )}
      </head>
      <body className="relative top-[90px] bg-gray-950 text-gray-100 antialiased md:static md:top-0">
        <ProgressBarProvider>
          <QueryClientProvider>
            <OverlayProvider>
              <A11ySkipLink />

              <Navbar />
              {children}
              <Footer />
            </OverlayProvider>
          </QueryClientProvider>
        </ProgressBarProvider>

        <ChannelIO />
        <GoogleTagManager gtmId="GTM-5P32C3PP" />
      </body>
    </html>
  )
}

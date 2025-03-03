import type { Metadata } from "next"
import Script from "next/script"
import { Toaster } from "react-hot-toast"

import ProgressBarProvider from "@packages/ui/components/ProgressBar"
import ChannelIO from "@packages/channelio"

import OverlayProvider from "@packages/ui/providers/OverlayProvider"

import "react-loading-skeleton/dist/skeleton.css"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: {
    template: "%s - 경기고등학교 이공계동아리연합",
    default: "경기고등학교 이공계동아리연합",
  },

  description: "",
  keywords: [],

  metadataBase: new URL("https://admin.kyunggi.club"),
  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: {
      template: "%s - 경기고등학교 이공계동아리연합",
      default: "경기고등학교 이공계동아리연합",
    },
    description: "",
    url: "https://admin.kyunggi.club",
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
    description: "",
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
      "naver-site-verification": "",
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

        {process.env.NODE_ENV === "development" && (
          <Script
            crossOrigin="anonymous"
            src="https://cdn.jsdelivr.net/npm/react-scan/dist/auto.global.js"
          />
        )}
      </head>
      <body className="bg-gray-900 text-gray-100 antialiased">
        <ProgressBarProvider>
          <OverlayProvider>{children}</OverlayProvider>
        </ProgressBarProvider>

        <Toaster />
        <ChannelIO />
      </body>
    </html>
  )
}

import type { Metadata } from "next"
import { Toaster } from "react-hot-toast"

import ProgressBarProvider from "@packages/ui/components/ProgressBar"
import A11ySkipLink from "@packages/ui/components/krds/A11ySkipLink"

import ChannelIO from "@packages/channelio"

import "@/styles/globals.css"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "경기고등학교 이공계동아리연합",
  description: "Welcome to Next.js",
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
      </head>
      <body className="bg-gray-950 text-gray-100 antialiased">
        <ProgressBarProvider>
          <A11ySkipLink />

          <Navbar />
          {children}
          <Footer />
        </ProgressBarProvider>

        <Toaster />
        <ChannelIO />
      </body>
    </html>
  )
}

import type { Metadata } from "next"
import { Toaster } from "react-hot-toast"

import ProgressBarProvider from "@packages/ui/components/ProgressBar"

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
          href="https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.3/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css"
        />
      </head>
      <body className="bg-zinc-900 text-ceruleanBlue-50 antialiased">
        <ProgressBarProvider>
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

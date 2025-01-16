import type { Metadata } from "next"
import { Toaster } from "react-hot-toast"

import ProgressBarProvider from "@packages/ui/components/ProgressBar"
import Happytalk from "@packages/channelio/component"

import "@/styles/globals.css"

export const metadata: Metadata = {
  title: "경기고등학교 이공계동아리연합",
  description: "Welcome to Next.js",
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.3/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css"
        />
      </head>
      <body className="antialiased">
        <ProgressBarProvider>{children}</ProgressBarProvider>
        <Toaster />

        <Happytalk />
      </body>
    </html>
  )
}

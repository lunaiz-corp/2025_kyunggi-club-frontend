import type { Metadata } from "next"
import { Toaster } from "react-hot-toast"

import ProgressBarProvider from "@packages/ui/components/ProgressBar"
import ChannelIO from "@packages/channelio"

import "react-loading-skeleton/dist/skeleton.css"
import "@/styles/globals.css"

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
      <body className="bg-gray-900 text-gray-100 antialiased">
        <ProgressBarProvider>{children}</ProgressBarProvider>

        <Toaster />
        <ChannelIO />
      </body>
    </html>
  )
}

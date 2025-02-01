import { NextLink } from "@packages/ui/components/krds/Link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "공지사항",
  openGraph: {
    title: "공지사항",
  },
  twitter: {
    title: "공지사항",
  },
}

export default function NoticeList() {
  return (
    <main className="mx-auto mt-8 flex max-w-[1200px] flex-col gap-12 px-6 md:mt-16 lg:px-0">
      <h1 className="text-[42px] font-bold">공지사항</h1>

      <NextLink
        href="/notice/1"
        className="flex-col items-start gap-4 px-4 py-3"
      >
        <div className="inline-flex items-center gap-2.5">
          <div className="size-2 rounded-full bg-ceruleanBlue-600" />
          <h2 className="text-3xl font-bold">Title</h2>
        </div>

        <span className="text-gray-300">
          2025년 1월 21일 00:05:08
        </span>
      </NextLink>
    </main>
  )
}

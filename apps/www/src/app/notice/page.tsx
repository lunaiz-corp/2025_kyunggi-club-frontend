import type { Metadata } from "next"

import Advertisements from "@/components/Advertisements"

import NoticeLinks from "./_components/Links"

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
    <main className="mx-auto mb-12 flex max-w-[1200px] flex-col gap-12 px-6 pt-8 lg:px-0">
      <h1 className="text-4xl font-bold tracking-tight md:text-[42px]">
        공지사항
      </h1>

      <Advertisements page="notice" />

      <div className="flex flex-col gap-8">
        <NoticeLinks />
      </div>
    </main>
  )
}

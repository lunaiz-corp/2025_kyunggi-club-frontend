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
      <h1 className="text-4xl font-bold">동아리 소개</h1>
    </main>
  )
}

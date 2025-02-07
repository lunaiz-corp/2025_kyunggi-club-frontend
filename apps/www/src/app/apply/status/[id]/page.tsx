import type { Metadata } from "next"

import Advertisements from "@/components/Advertisements"

export const metadata: Metadata = {
  title: "결과 확인",
  openGraph: {
    title: "결과 확인",
  },
  twitter: {
    title: "결과 확인",
  },
}

export default function StatusDetail() {
  return (
    <main className="mx-auto mb-12 flex max-w-[1200px] flex-col gap-19 px-6 pt-8 lg:px-0">
      <div className="inline-flex flex-col gap-3">
        <span className="text-2xl text-gray-400">지원서 확인</span>
        <h1 className="text-4xl font-bold tracking-tight md:text-[42px]">
          지원서를 확인 및 수정합니다.
        </h1>
      </div>

      <Advertisements page="apply" />
    </main>
  )
}

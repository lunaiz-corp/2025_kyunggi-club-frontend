import type { Metadata } from "next"

import ApplyNewFunnel from "./_funnels"

export const metadata: Metadata = {
  title: "지원하기",
  openGraph: {
    title: "지원하기",
  },
  twitter: {
    title: "지원하기",
  },
}

export default function ApplyNew() {
  return (
    <main className="mx-auto mt-8 flex max-w-[1200px] flex-col gap-12 px-6 md:mt-16 lg:px-0">
      <ApplyNewFunnel />
    </main>
  )
}

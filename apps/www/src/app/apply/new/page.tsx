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
    <main className="mx-auto my-8 flex max-w-[1200px] flex-col gap-19 px-6 md:my-16 lg:px-0">
      <ApplyNewFunnel />
    </main>
  )
}

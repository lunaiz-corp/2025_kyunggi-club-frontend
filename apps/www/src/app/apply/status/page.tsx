import type { Metadata } from "next"

import ApplyForm from "./_components/ApplyForm"

export const metadata: Metadata = {
  title: "결과 확인",
  openGraph: {
    title: "결과 확인",
  },
  twitter: {
    title: "결과 확인",
  },
}

export default function ApplyStatus() {
  return (
    <main className="mx-auto mb-12 flex max-w-[1200px] flex-col gap-19 px-6 pt-8 lg:px-0">
      <ApplyForm />
    </main>
  )
}

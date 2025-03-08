import type { Metadata } from "next"

import TitleBar from "@/components/common/TitleBar"

import Status from "./_components/Status"

export const metadata: Metadata = {
  title: "사이트 상태 설정",
  openGraph: {
    title: "사이트 상태 설정",
  },
  twitter: {
    title: "사이트 상태 설정",
  },
}

export default function ServiceStatus() {
  return (
    <div className="flex flex-col gap-10">
      <TitleBar category="일정 관리" title="사이트 상태 설정" />

      <Status />
    </div>
  )
}

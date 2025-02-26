import type { Metadata } from "next"

import TitleBar from "@/components/common/TitleBar"
import ClubSelect from "../_components/ClubSelect"

export const metadata: Metadata = {
  title: "동아리 접수된 지원서 목록",
  openGraph: {
    title: "동아리 접수된 지원서 목록",
  },
  twitter: {
    title: "동아리 접수된 지원서 목록",
  },
}

export default function ClubApplicationGate() {
  return (
    <div className="flex flex-col gap-10">
      <TitleBar category="동아리 관리" title="접수된 지원서 목록" />
      <ClubSelect nextUrl="/dashboard/club/application" />
    </div>
  )
}

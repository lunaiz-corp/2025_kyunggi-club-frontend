import type { Metadata } from "next"

import TitleBar from "@/components/common/TitleBar"
import ClubSelect from "../_components/ClubSelect"

export const metadata: Metadata = {
  title: "동아리 지원서 양식 관리",
  openGraph: {
    title: "동아리 지원서 양식 관리",
  },
  twitter: {
    title: "동아리 지원서 양식 관리",
  },
}

export default function ClubTemplate() {
  return (
    <div className="flex flex-col gap-10">
      <TitleBar category="동아리 관리" title="지원서 양식 관리" />
      <ClubSelect nextUrl="/dashboard/club/template" />
    </div>
  )
}

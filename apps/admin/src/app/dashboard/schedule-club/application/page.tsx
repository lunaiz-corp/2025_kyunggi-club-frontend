import type { Metadata } from "next"

import TitleBar from "@/components/common/TitleBar"
import ClubSelect from "../../club/_components/ClubSelect"

export const metadata: Metadata = {
  title: "모집 일정 관리",
  openGraph: {
    title: "모집 일정 관리",
  },
  twitter: {
    title: "모집 일정 관리",
  },
}

export default function ScheduleApplication() {
  return (
    <div className="flex flex-col gap-10">
      <TitleBar category="일정 관리" title="모집 일정 관리" />
      <ClubSelect nextUrl="/dashboard/schedule-club/application" />
    </div>
  )
}

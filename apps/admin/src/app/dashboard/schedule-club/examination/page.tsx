import type { Metadata } from "next"

import TitleBar from "@/components/common/TitleBar"
import ClubSelect from "../../club/_components/ClubSelect"

export const metadata: Metadata = {
  title: "지필 일정 관리",
  openGraph: {
    title: "지필 일정 관리",
  },
  twitter: {
    title: "지필 일정 관리",
  },
}

export default function ScheduleExamination() {
  return (
    <div className="flex flex-col gap-10">
      <TitleBar category="일정 관리" title="지필 일정 관리" />
      <ClubSelect nextUrl="/dashboard/schedule-club/examination" />
    </div>
  )
}

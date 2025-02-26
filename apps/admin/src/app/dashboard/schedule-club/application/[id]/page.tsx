import type { Metadata } from "next"

import TitleBarWithButton from "@/components/schedule/TitleBarWithButton"

export const metadata: Metadata = {
  title: "모집 일정 관리",
  openGraph: {
    title: "모집 일정 관리",
  },
  twitter: {
    title: "모집 일정 관리",
  },
}

export default function ScheduleApplicationDetail() {
  return (
    <div className="flex flex-col gap-10">
      <TitleBarWithButton type="APPLICATION" />
    </div>
  )
}

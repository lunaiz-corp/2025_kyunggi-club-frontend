import type { Metadata } from "next"

import CalendarList from "@/components/schedule/CalendarList"

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
      <CalendarList type="APPLICATION" />
    </div>
  )
}

import type { Metadata } from "next"

import CalendarList from "@/components/schedule/CalendarList"

export const metadata: Metadata = {
  title: "운영 일정 관리",
  openGraph: {
    title: "운영 일정 관리",
  },
  twitter: {
    title: "운영 일정 관리",
  },
}

export default function ScheduleOperation() {
  return (
    <div className="flex flex-col gap-10">
      <CalendarList type="OPERATION" />
    </div>
  )
}

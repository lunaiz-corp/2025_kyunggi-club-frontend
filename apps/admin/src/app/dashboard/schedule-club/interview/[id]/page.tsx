import type { Metadata } from "next"

import CalendarList from "@/components/schedule/CalendarList"

export const metadata: Metadata = {
  title: "면접 일정 관리",
  openGraph: {
    title: "면접 일정 관리",
  },
  twitter: {
    title: "면접 일정 관리",
  },
}

export default function ScheduleInterviewDetail() {
  return (
    <div className="flex flex-col gap-10">
      <CalendarList type="INTERVIEW" />
    </div>
  )
}

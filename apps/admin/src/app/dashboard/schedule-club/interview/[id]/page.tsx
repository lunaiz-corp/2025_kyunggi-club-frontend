import type { Metadata } from "next"

import TitleBarWithButton from "@/components/schedule/TitleBarWithButton"

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
      <TitleBarWithButton type="INTERVIEW" />
    </div>
  )
}

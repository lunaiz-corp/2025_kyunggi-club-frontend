import type { Metadata } from "next"

import CalendarList from "@/components/schedule/CalendarList"

export const metadata: Metadata = {
  title: "지필 일정 관리",
  openGraph: {
    title: "지필 일정 관리",
  },
  twitter: {
    title: "지필 일정 관리",
  },
}

export default async function ScheduleExaminationDetail({
  params,
}: Readonly<{
  params: Promise<{ id: string }>
}>) {
  const { id } = await params

  return (
    <div className="flex flex-col gap-10">
      <CalendarList club={id} category="EXAMINATION" />
    </div>
  )
}

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

export default async function ScheduleApplicationDetail({
  params,
}: Readonly<{
  params: Promise<{ id: string }>
}>) {
  const { id } = await params

  return (
    <div className="flex flex-col gap-10">
      <CalendarList club={id} category="APPLICATION" />
    </div>
  )
}

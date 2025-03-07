"use client"

import { useState } from "react"
import toast from "react-hot-toast"

import { ALink } from "../krds/Action"

import SchedulesCalendar from "./calendar"
import type { Schedule } from "./types"

function SchedulesList({
  admin,
  schedule,
}: Readonly<{
  admin?: boolean
  schedule: Schedule
}>) {
  return admin ? (
    <ALink
      href="#"
      className="inline-flex flex-col items-start gap-1.5"
      onClick={async () => {
        if (
          // eslint-disable-next-line no-alert
          window.confirm(
            `'${schedule.title}' 일정을 삭제하시겠습니까?`,
          )
        ) {
          const deleteRequest = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/schedule/${schedule.id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            },
          )

          const saveResponse = await deleteRequest.json()
          if (deleteRequest.ok) {
            toast.success("일정이 삭제되었습니다.")
            window.location.reload()
          } else {
            toast.error(
              saveResponse.message ||
                "서버와의 통신 중 오류가 발생했습니다.",
            )

            // eslint-disable-next-line no-console
            console.error(saveResponse)
          }
        }
      }}
    >
      <span className="text-sm text-gray-200">
        {new Date(schedule.start_at).toLocaleString("ko-KR", {
          timeZone: "Asia/Seoul",

          month: "long",
          day: "numeric",

          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>

      <div className="inline-flex items-center gap-2">
        <div className="size-1.5 rounded-full bg-ceruleanBlue-700" />
        <span className="text-xl font-bold text-gray-200">
          {schedule.title}
        </span>
      </div>
    </ALink>
  ) : (
    <div className="inline-flex flex-col gap-1.5">
      <span className="text-sm text-gray-200">
        {new Date(schedule.start_at).toLocaleString("ko-KR", {
          timeZone: "Asia/Seoul",

          month: "long",
          day: "numeric",

          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>

      <div className="inline-flex items-center gap-2">
        <div className="size-1.5 rounded-full bg-ceruleanBlue-700" />
        <span className="text-xl font-bold text-gray-200">
          {schedule.title}
        </span>
      </div>
    </div>
  )
}

export default function Schedules({
  schedules,
}: Readonly<{
  schedules: Schedule[]
}>) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  return (
    <>
      <div className="md:w-1/2">
        <SchedulesCalendar
          schedules={schedules}
          selectedDateState={[selectedDate, setSelectedDate]}
        />
      </div>

      <div className="flex flex-col gap-5 py-4 md:w-1/2">
        {schedules.map((schedule, i) => (
          <div
            className="flex flex-col gap-5"
            key={`schedules-${i.toString()}`}
          >
            <SchedulesList schedule={schedule} />

            {i !== schedules.length - 1 && (
              <div className="h-0.5 bg-gray-800" />
            )}
          </div>
        ))}
      </div>
    </>
  )
}

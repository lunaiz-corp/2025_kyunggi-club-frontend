"use client"

import { useState } from "react"

import SchedulesCalendar from "./calendar"
import type { Schedule } from "./types"

function SchedulesList({
  schedule,
}: Readonly<{
  schedule: Schedule
}>) {
  return (
    <div className="inline-flex flex-col gap-1.5">
      <span className="text-sm text-gray-200">
        {new Intl.DateTimeFormat("ko-KR", {
          month: "long",
          day: "numeric",
        }).format(new Date(schedule.start_at))}
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

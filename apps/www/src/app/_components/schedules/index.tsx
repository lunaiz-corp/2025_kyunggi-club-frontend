"use client"

import { useState } from "react"

import SchedulesCalendar from "@packages/ui/components/schedules/Calendar"
import SchedulesList from "./list"

export default function Schedules() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  return (
    <>
      <div className="md:w-1/2">
        <SchedulesCalendar
          selectedDateState={[selectedDate, setSelectedDate]}
        />
      </div>

      <div className="flex flex-col gap-5 py-4 md:w-1/2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            className="flex flex-col gap-5"
            key={`schedules-${i.toString()}`}
          >
            <SchedulesList selectedDate={selectedDate!} />

            {i !== Array.from({ length: 2 }).length - 1 && (
              <div className="h-0.5 bg-gray-800" />
            )}
          </div>
        ))}
      </div>
    </>
  )
}

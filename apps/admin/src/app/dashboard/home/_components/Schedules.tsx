"use client"

import { useState } from "react"

import SchedulesCalendar from "@packages/ui/components/schedules/Calendar"

export default function Schedules() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  return (
    <SchedulesCalendar
      selectedDateState={[selectedDate, setSelectedDate]}
    />
  )
}

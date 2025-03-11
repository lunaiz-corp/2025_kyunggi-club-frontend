"use client"

import Skeleton from "react-loading-skeleton"

import Schedules from "@packages/ui/components/schedules"

import { useQuery } from "@tanstack/react-query"
import { getScheduleList } from "@/api/schedule"

export default function ScheduleList() {
  const {
    isLoading: isListLoading,
    error: scheduleListError,
    data: scheduleList,
  } = useQuery({
    queryKey: ["scheduleList"],
    queryFn: getScheduleList,
    retry: false,
  })

  return (
    <div className="flex min-h-[467px] w-full flex-col gap-8 rounded-xl border border-[#eff6ff]/10 px-6 py-4 md:flex-row">
      {isListLoading || scheduleListError || !scheduleList ? (
        <Skeleton
          height={407}
          baseColor="var(--color-gray-900)"
          highlightColor="var(--color-gray-800)"
        />
      ) : (
        <Schedules schedules={scheduleList} />
      )}
    </div>
  )
}

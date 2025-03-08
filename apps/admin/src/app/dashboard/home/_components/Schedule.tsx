"use client"

import Skeleton from "react-loading-skeleton"

import { useQuery } from "@tanstack/react-query"
import { getSchedules } from "@/api/schedule"

import { Preset } from "@packages/ui/components/schedules/types"

export const PresetTitle = {
  // 모집 일정
  [Preset.APPLICATION_START]: "모집 일정",
  [Preset.APPLICATION_END]: "모집 일정",

  // 지필
  [Preset.EXAMINATION]: "지필 일정",

  // 면접
  [Preset.INTERVIEW]: "면접 일정",
}

export default function ScheduleList() {
  const {
    isLoading: isListLoading,
    error: scheduleListError,
    data: scheduleList,
  } = useQuery({
    queryKey: ["schedule"],
    queryFn: () => getSchedules({}),
  })

  return (
    <div className="flex flex-col gap-3">
      {isListLoading || scheduleListError || !scheduleList ? (
        <Skeleton
          height={84}
          baseColor="var(--color-gray-800)"
          highlightColor="var(--color-gray-700)"
        />
      ) : (
        scheduleList.slice(0, 2).map(schedule => (
          <div
            key={schedule.id}
            className="flex rounded-xl bg-gray-100/10"
          >
            <div className="inline-flex w-36 items-center justify-center gap-2.5 overflow-hidden rounded-l-xl bg-ceruleanBlue-700 py-7">
              <div className="text-lg font-bold text-blue-50">
                {
                  PresetTitle[
                    schedule.category as keyof typeof PresetTitle
                  ]
                }
              </div>
            </div>
            <div className="inline-flex w-full items-center justify-between rounded-r-xl px-10">
              <span className="font-semibold">{schedule.title}</span>
              <span className="flex-1 text-right text-sm">
                일정 :{" "}
                {new Date(schedule.start_at).toLocaleString("ko-KR", {
                  timeZone: "Asia/Seoul",

                  month: "long",
                  day: "numeric",

                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

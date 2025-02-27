"use client"

import { useState } from "react"
import { overlay } from "overlay-kit"

import Schedules from "@packages/ui/components/schedules"
import {
  Preset,
  type Schedule,
} from "@packages/ui/components/schedules/types"

import TitleBarWithButton from "./TitleBarWithButton"
import ModifyModal from "./ModifyModal"

import "./_styles/customCalendar.css"

const allowedTypes = {
  OPERATION: new Set([
    Preset.OPERATION_START,
    Preset.OPERATION_PRESTART,
    Preset.OPERATION_MAINTENANCE_START,
    Preset.OPERATION_MAINTENANCE_END,
  ]),
  APPLICATION: new Set([
    Preset.APPLICATION_START,
    Preset.APPLICATION_END,
  ]),
  EXAMINATION: new Set([Preset.ETC]),
  INTERVIEW: new Set([Preset.ETC]),
}

export default function CalendarList({
  type,
}: Readonly<{
  type: "OPERATION" | "APPLICATION" | "EXAMINATION" | "INTERVIEW"
}>) {
  const [schedules, setSchedules] = useState<Schedule[]>([])

  const createOrModify = async (prefilled?: Schedule) => {
    const result = await overlay.openAsync<Schedule | undefined>(
      ({ isOpen, close, unmount }) => {
        return (
          <ModifyModal
            isOpen={isOpen}
            close={props => {
              close(props)
              setTimeout(unmount, 200)
            }}
            prefilled={prefilled}
            allowedTypes={allowedTypes[type]}
          />
        )
      },
    )

    if (result) {
      // schedules에 result.type값이 같은 schedule이 있는지 확인
      // 있으면 수정, 없으면 추가

      const isModify = !!schedules.find(
        schedule => schedule.type === result.type,
      )

      if (isModify) {
        setSchedules(
          schedules.map(schedule =>
            schedule.type === result.type ? result : schedule,
          ),
        )
      } else {
        setSchedules([...schedules, result])
      }
    }
  }

  return (
    <>
      <TitleBarWithButton
        type={type}
        createOrModify={() => createOrModify()}
      />

      <div className="flex min-h-[407px] w-full flex-col gap-8 rounded-xl border border-[#eff6ff]/10 p-6 md:flex-row">
        <Schedules schedules={schedules} />
      </div>
    </>
  )
}

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next-nprogress-bar"

import toast from "react-hot-toast"

import { overlay } from "overlay-kit"

import Schedules from "@packages/ui/components/schedules"
import {
  Preset,
  type Schedule,
} from "@packages/ui/components/schedules/types"

import { useQuery } from "@tanstack/react-query"
import { getProfile } from "@/api/profile"
import { getSchedules } from "@/api/schedule"

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
  EXAMINATION: new Set([Preset.EXAMINATION]),
  INTERVIEW: new Set([Preset.INTERVIEW]),
}

export default function CalendarList({
  category,
}: Readonly<{
  category: "OPERATION" | "APPLICATION" | "EXAMINATION" | "INTERVIEW"
}>) {
  const router = useRouter()
  const [schedules, setSchedules] = useState<Schedule[]>([])

  const {
    isLoading: isProfileLoading,
    error: profileError,
    data: profile,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  })

  useEffect(() => {
    ;(async () => {
      // Check the token is exist
      if (!localStorage.getItem("accessToken")) {
        router.replace("/auth/signin")
        return
      }

      // Check the token is valid
      if ((!isProfileLoading && !profile) || profileError) {
        localStorage.removeItem("accessToken")
        router.replace("/auth/signin")
        return
      }

      // Check the role is not OWNER
      if (profile && profile.role !== "OWNER") {
        toast.error("권한이 없습니다.")
        router.replace("/dashboard/home")
      }
    })()
  }, [isProfileLoading, profile, profileError, router])

  const { isLoading, error, data } = useQuery({
    queryKey: ["schedule", category],
    queryFn: () => getSchedules({ category }),
    enabled: profile?.role === "OWNER",
  })

  useEffect(() => {
    if (error) {
      toast.error(
        error.message || "서버와의 통신 중 오류가 발생했습니다.",
      )
    }

    if (data) {
      setSchedules(data)
    }
  }, [data, error])

  const createOrModify = async () => {
    const result = await overlay.openAsync<
      Omit<Schedule, "id"> | undefined
    >(({ isOpen, close, unmount }) => {
      return (
        <ModifyModal
          isOpen={isOpen}
          close={props => {
            close(props)
            setTimeout(unmount, 200)
          }}
          allowedTypes={allowedTypes[category]}
        />
      )
    })

    if (result) {
      // schedules에 result.type값이 같은 schedule이 있는지 확인
      // 있으면 수정, 없으면 추가

      const alreadySavedData = schedules.find(
        schedule =>
          result.category !== Preset.ETC &&
          schedule.category === result.category,
      )

      if (alreadySavedData) {
        // 서버에 저장
        const saveRequest = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/schedule/${alreadySavedData.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(result),
          },
        )

        const saveResponse = await saveRequest.json()
        if (saveRequest.ok) {
          toast.success("일정을 수정했습니다.")
          window.location.reload()
        } else {
          toast.error(
            saveResponse.message ||
              "서버와의 통신 중 오류가 발생했습니다.",
          )

          // eslint-disable-next-line no-console
          console.error(saveResponse)
        }
      } else {
        // 서버에 저장
        const saveRequest = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/schedule?type=${category === "OPERATION" ? "OPERATION" : "SCHEDULE"}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(result),
          },
        )

        const saveResponse = await saveRequest.json()
        if (saveRequest.ok) {
          toast.success("일정을 추가했습니다.")
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
    }
  }

  return (
    <>
      <TitleBarWithButton
        type={category}
        createOrModify={() => createOrModify()}
      />

      <div className="flex min-h-[407px] w-full flex-col gap-8 rounded-xl border border-[#eff6ff]/10 p-6 md:flex-row">
        {!isLoading && !error && data && (
          <Schedules schedules={schedules} />
        )}
      </div>
    </>
  )
}

"use client"

import { useState, useEffect } from "react"
import toast from "react-hot-toast"

import { useQuery } from "@tanstack/react-query"
import { getCurrentStatus } from "@/api/schedule"

import { cn } from "@packages/ui/utils/tailwindMerge"

import { ServiceStatus } from "@/api/types/schedule"
import { statusInText } from "../types"

export default function Status() {
  const [serviceStatus, setServiceStatus] = useState<ServiceStatus>(
    ServiceStatus.OPEN,
  )

  const { isLoading, error, data } = useQuery({
    queryKey: ["status"],
    queryFn: getCurrentStatus,
  })

  useEffect(() => {
    if (error) {
      toast.error(
        error.message || "서버와의 통신 중 오류가 발생했습니다.",
      )
    }

    if (data) {
      setServiceStatus(data.status)
    }
  }, [data, error])

  return (
    <div className="flex flex-col gap-9">
      <div className="inline-flex w-full items-center justify-between rounded-xl bg-gray-800 px-9 py-6">
        <div className="inline-flex flex-col gap-1">
          <div className="flex flex-col gap-2">
            <span className="text-xl">현재 사이트 상태는</span>
            {!isLoading && !error && data && (
              <span className="text-4xl font-bold">
                {statusInText[serviceStatus]}입니다.
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex shrink-0 gap-3 rounded-xl bg-gray-700 px-3 py-2">
        {Object.entries(statusInText).map(([id, value]) => (
          <button
            key={id}
            type="button"
            className={cn(
              "inline-flex w-full cursor-pointer items-center justify-center rounded-xl bg-gray-700 px-4 py-1.5 hover:bg-gray-600",
              serviceStatus === id && "bg-gray-600",
            )}
            onClick={async () => {
              const saveRequest = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/status`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                  },
                  body: JSON.stringify({
                    status: serviceStatus,
                  }),
                },
              )

              const saveResponse = await saveRequest.json()
              if (saveRequest.ok) {
                toast.success("운영 상태를 변경했습니다.")
                setServiceStatus(id as ServiceStatus)
              } else {
                toast.error(
                  saveResponse.message ||
                    "서버와의 통신 중 오류가 발생했습니다.",
                )

                // eslint-disable-next-line no-console
                console.error(saveResponse)
              }
            }}
          >
            <span className="font-bold">{value}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"

import { cn } from "@packages/ui/utils/tailwindMerge"

import { ServiceStatus, statusInText } from "../types"

export default function Status() {
  const [serviceStatus, setServiceStatus] = useState<ServiceStatus>(
    ServiceStatus.OPEN,
  )

  useEffect(() => {
    // fetch service status
    setServiceStatus(ServiceStatus.OPEN)
  }, [])

  return (
    <div className="flex flex-col gap-9">
      <div className="inline-flex w-full items-center justify-between rounded-xl bg-gray-800 px-9 py-6">
        <div className="inline-flex flex-col gap-1">
          <div className="flex flex-col gap-2">
            <span className="text-xl">현재 사이트 상태는</span>
            <span className="text-4xl font-bold">
              {statusInText[serviceStatus]}입니다.
            </span>
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
            onClick={() => setServiceStatus(id as ServiceStatus)}
          >
            <span className="font-bold">{value}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"

import { NextLink } from "../krds/Action"

export type NoticesSummaryProps = {
  id: number
  title: string
  baseUrl: string
  date: Date
}

export default function NoticesSummary({
  id,
  title,
  baseUrl,
  date,
}: Readonly<NoticesSummaryProps>) {
  const [currentTime, setCurrentTime] = useState(new Date(0))
  const IS_NEW_CRITERIA = 2 * 24 * 60 * 60 * 1000

  useEffect(() => {
    setCurrentTime(new Date())
  }, [])

  return (
    <NextLink
      href={`${baseUrl}/${id}`}
      className="flex justify-between"
    >
      <div className="inline-flex items-center gap-2.5">
        {currentTime.getTime() - date.getTime() <= IS_NEW_CRITERIA ? (
          <div className="size-1.5 rounded-full bg-ceruleanBlue-700" />
        ) : null}

        <span className="w-56 truncate text-lg">{title}</span>
      </div>

      <span className="text-right text-sm">
        {date.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </span>
    </NextLink>
  )
}

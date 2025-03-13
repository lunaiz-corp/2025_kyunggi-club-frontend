"use client"

import { NextLink } from "@packages/ui/components/krds/Action"

import { useQuery } from "@tanstack/react-query"
import { getNoticeList } from "@/api/notice"

export default function NoticeLinks() {
  const {
    isLoading: isListLoading,
    error: noticeListError,
    data: noticeList,
  } = useQuery({
    queryKey: ["noticeList"],
    queryFn: getNoticeList,
    retry: false,
  })

  return (
    !isListLoading &&
    !noticeListError &&
    noticeList
      ?.sort((a, b) => b.id - a.id)
      .map(x => {
        return (
          <NextLink
            key={x.id}
            href={`/notice/${x.id}`}
            className="flex-col items-start gap-4 px-4 py-3"
          >
            <div className="inline-flex items-center gap-2.5">
              <div className="size-2 rounded-full bg-ceruleanBlue-600" />
              <h2 className="text-2xl font-bold md:text-3xl">
                {x.title}
              </h2>
            </div>

            <span className="text-gray-300">
              {new Date(x.createdAt).toLocaleString("ko-KR", {
                timeZone: "Asia/Seoul",

                year: "numeric",
                month: "long",
                day: "numeric",

                hourCycle: "h24",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </NextLink>
        )
      })
  )
}

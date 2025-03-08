"use client"

import Skeleton from "react-loading-skeleton"

import { NextLink } from "@packages/ui/components/krds/Action"
import NoticesSummary from "@packages/ui/components/notices/summary"

import { useQuery } from "@tanstack/react-query"
import { getNoticeList } from "@/api/notice"

export default function SummaryList() {
  const {
    isLoading: isListLoading,
    error: noticeListError,
    data: noticeList,
  } = useQuery({
    queryKey: ["noticeList"],
    queryFn: () => getNoticeList({ board: "admin" }),
  })

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-5 lg:w-1/2 2xl:w-lg">
      <div className="inline-flex items-center justify-between">
        <h2 className="text-lg font-bold">관리자 공지사항</h2>

        <NextLink href="/dashboard/common-notice">
          <span className="text-sm">더보기</span>
        </NextLink>
      </div>

      <div className="flex h-full w-full flex-col gap-4 rounded-xl border border-[#eff6ff]/10 p-5">
        {isListLoading || noticeListError || !noticeList ? (
          <Skeleton
            height={352}
            baseColor="var(--color-gray-800)"
            highlightColor="var(--color-gray-700)"
          />
        ) : (
          noticeList
            .sort((a, b) => b.id - a.id)
            .slice(0, 8)
            .map(x => {
              return (
                <NoticesSummary
                  key={x.id}
                  id={x.id}
                  title={x.title}
                  baseUrl="/dashboard/common-notice"
                  date={new Date(x.created_at)}
                />
              )
            })
        )}
      </div>
    </div>
  )
}

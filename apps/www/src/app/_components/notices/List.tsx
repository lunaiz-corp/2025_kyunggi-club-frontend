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
    queryFn: getNoticeList,
  })

  return (
    <div className="flex w-full flex-1 flex-col gap-5">
      <div className="inline-flex items-center justify-between">
        <h2 className="text-lg font-bold">공지사항</h2>

        <NextLink href="/notice">
          <span className="text-sm">더보기</span>
        </NextLink>
      </div>

      <div className="flex flex-col gap-4">
        {isListLoading || noticeListError || !noticeList ? (
          <Skeleton
            height={304}
            baseColor="var(--color-gray-900)"
            highlightColor="var(--color-gray-800)"
          />
        ) : (
          noticeList
            .sort((a, b) => b.id - a.id)
            .slice(0, 6)
            .map(x => {
              return (
                <NoticesSummary
                  key={x.id}
                  id={x.id}
                  title={x.title}
                  baseUrl="/notice"
                  date={new Date(x.created_at)}
                />
              )
            })
        )}
      </div>
    </div>
  )
}

import { Suspense } from "react"
import type { Metadata } from "next"

import Skeleton from "react-loading-skeleton"

import { NextLink } from "@packages/ui/components/krds/Link"
import SelectChances from "@packages/ui/components/select-chances"

import Advertisements from "@/components/Adverisements"

import Schedules from "./_components/schedules"
import NoticesSummary from "./_components/notices/summary"

export const metadata: Metadata = {
  title: "홈 - 경기고등학교 이공계동아리연합",
  openGraph: {
    title: "홈 - 경기고등학교 이공계동아리연합",
  },
  twitter: {
    title: "홈 - 경기고등학교 이공계동아리연합",
  },
}

export default function Main() {
  return (
    <main className="mx-auto mt-8 flex max-w-[1200px] flex-col gap-8 md:mt-16">
      <div className="flex w-full flex-col gap-8 px-6 md:flex-row md:px-0">
        <div className="flex w-full flex-1 flex-col gap-5">
          <div className="inline-flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-100">
              선발 일정
            </h2>
          </div>

          <div className="flex min-h-[407px] w-full flex-col gap-8 rounded-xl border border-[#eff6ff]/10 px-6 py-4 md:flex-row">
            <Suspense
              fallback={
                <Skeleton
                  height={407}
                  baseColor="var(--color-gray-900)"
                  highlightColor="var(--color-gray-800)"
                />
              }
            >
              <Schedules />
            </Suspense>
          </div>
        </div>

        <div className="flex flex-col gap-5 md:w-[414px]">
          <div className="inline-flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-100">
              동아리 경쟁률 현황
            </h2>
          </div>

          <div className="flex size-full min-h-[407px] gap-8 rounded-xl border border-[#eff6ff]/10 px-6 py-4">
            <SelectChances />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-8 px-6 md:flex-row md:px-0">
        <Advertisements />

        <div className="flex w-full flex-1 flex-col gap-5">
          <div className="inline-flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-100">
              공지사항
            </h2>

            <NextLink href="/notice">
              <span className="text-sm text-gray-100">더보기</span>
            </NextLink>
          </div>

          <div className="flex flex-col gap-4">
            <Suspense
              fallback={
                <Skeleton
                  height={352}
                  baseColor="var(--color-gray-900)"
                  highlightColor="var(--color-gray-800)"
                />
              }
            >
              {[
                {
                  id: 1,
                  title: "어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고",
                  date: new Date("2025-01-01"),
                },
                {
                  id: 2,
                  title: "어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고",
                  date: new Date("2025-01-13"),
                },
                {
                  id: 3,
                  title: "어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고",
                  date: new Date("2025-01-26"),
                },
              ]
                .sort((a, b) => b.id - a.id)
                .map(x => {
                  return <NoticesSummary key={x.id} {...x} />
                })}
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}

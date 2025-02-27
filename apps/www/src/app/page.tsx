import { Suspense } from "react"
import type { Metadata } from "next"

import Skeleton from "react-loading-skeleton"

import { NextLink } from "@packages/ui/components/krds/Action"
import SelectChances from "@packages/ui/components/select-chances"

import Schedules from "@packages/ui/components/schedules"
import { Preset } from "@packages/ui/components/schedules/types"

import NoticesSummary from "@packages/ui/components/notices/summary"

import Advertisements from "@/components/Advertisements"

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
    <main className="mx-auto mb-12 flex max-w-[1200px] flex-col gap-8 px-6 pt-8 lg:px-0">
      <div className="flex w-full flex-col gap-8 md:flex-row">
        <div className="flex w-full flex-1 flex-col gap-5">
          <div className="inline-flex items-center justify-between">
            <h2 className="text-lg font-bold">선발 일정</h2>
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
              <Schedules
                schedules={[
                  {
                    title: "Event Name",
                    type: Preset.APPLICATION_START,
                    datetime: new Date("2025-03-11"),
                  },
                  {
                    title: "Event Name",
                    type: Preset.APPLICATION_END,
                    datetime: new Date("2025-03-11"),
                  },
                ]}
              />
            </Suspense>
          </div>
        </div>

        <div className="flex flex-col gap-5 md:w-[414px]">
          <div className="inline-flex items-center justify-between">
            <h2 className="text-lg font-bold">동아리 경쟁률 현황</h2>
          </div>

          <div className="flex size-full min-h-[407px] gap-8 rounded-xl border border-[#eff6ff]/10 px-6 py-4">
            <SelectChances />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-8 md:flex-row">
        <Advertisements page="main" />

        <div className="flex w-full flex-1 flex-col gap-5">
          <div className="inline-flex items-center justify-between">
            <h2 className="text-lg font-bold">공지사항</h2>

            <NextLink href="/notice">
              <span className="text-sm">더보기</span>
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
                  return (
                    <NoticesSummary
                      key={x.id}
                      baseUrl="/notice"
                      {...x}
                    />
                  )
                })}
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}

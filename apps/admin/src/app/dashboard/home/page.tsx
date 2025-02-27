import { Suspense } from "react"
import type { Metadata } from "next"

import Skeleton from "react-loading-skeleton"

import SelectChances from "@packages/ui/components/select-chances"
import NoticesSummary from "@packages/ui/components/notices/summary"
import { NextLink } from "@packages/ui/components/krds/Action"

export const metadata: Metadata = {
  title: "홈",
  openGraph: {
    title: "홈",
  },
  twitter: {
    title: "홈",
  },
}

export default function Home() {
  return (
    <div className="flex flex-col gap-11 lg:mb-16">
      <div className="h-52 rounded-xl bg-gradient-to-r from-[#132b75] to-ceruleanBlue-700" />

      <div className="flex flex-col gap-5">
        <div className="inline-flex items-center justify-between">
          <h2 className="text-lg font-bold">
            지금 일어나고 있는 일들
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex rounded-xl bg-gray-100/10">
            <div className="inline-flex w-36 items-center justify-center gap-2.5 overflow-hidden rounded-l-xl bg-ceruleanBlue-700 py-7">
              <div className="text-lg font-bold text-blue-50">
                이름
              </div>
            </div>
            <div className="inline-flex w-full items-center justify-between rounded-r-xl px-10">
              <span className="font-semibold">제목</span>
              <span className="flex-1 text-right text-sm">
                일정 : 6월 12일 오후 11:59
              </span>
            </div>
          </div>

          <div className="flex rounded-xl bg-gray-100/10">
            <div className="inline-flex w-36 items-center justify-center gap-2.5 overflow-hidden rounded-l-xl bg-ceruleanBlue-700 py-7">
              <div className="text-lg font-bold text-blue-50">
                이름
              </div>
            </div>
            <div className="inline-flex w-full items-center justify-between rounded-r-xl px-10">
              <span className="font-semibold">제목</span>
              <span className="flex-1 text-right text-sm">
                일정 : 6월 12일 오후 11:59
              </span>
            </div>
          </div>

          <div className="flex rounded-xl bg-gray-100/10">
            <div className="inline-flex w-36 items-center justify-center gap-2.5 overflow-hidden rounded-l-xl bg-ceruleanBlue-700 py-7">
              <div className="text-lg font-bold text-blue-50">
                이름
              </div>
            </div>
            <div className="inline-flex w-full items-center justify-between rounded-r-xl px-10">
              <span className="font-semibold">제목</span>
              <span className="flex-1 text-right text-sm">
                일정 : 6월 12일 오후 11:59
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-7 lg:h-[463px] lg:flex-row">
        <div className="flex h-full w-full flex-1 flex-col gap-5 lg:w-1/2 2xl:w-full">
          <div className="inline-flex items-center justify-between">
            <h2 className="text-lg font-bold">경쟁률 리더보드</h2>
          </div>

          <div className="h-full rounded-xl border border-[#eff6ff]/10 p-5">
            <SelectChances />
          </div>
        </div>

        <div className="flex h-full w-full flex-col gap-5 lg:w-1/2 2xl:w-lg">
          <div className="inline-flex items-center justify-between">
            <h2 className="text-lg font-bold">공지사항</h2>

            <NextLink href="/dashboard/common-notice">
              <span className="text-sm">더보기</span>
            </NextLink>
          </div>

          <div className="flex h-full w-full flex-col gap-4 rounded-xl border border-[#eff6ff]/10 p-5">
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
                      baseUrl="/dashboard/common-notice"
                      {...x}
                    />
                  )
                })}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

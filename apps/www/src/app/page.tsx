import type { Metadata } from "next"

import SelectChances from "@packages/ui/components/select-chances"

import Advertisements from "@/components/Advertisements"

import ScheduleList from "./_components/Schedule"
import NoticeList from "./_components/notices/List"

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

          <ScheduleList />
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

        <NoticeList />
      </div>
    </main>
  )
}

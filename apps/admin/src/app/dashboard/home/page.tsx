import type { Metadata } from "next"

import SelectChances from "@packages/ui/components/select-chances"

import ScheduleList from "./_components/Schedule"
import NoticeList from "./_components/NoticeList"

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

        <ScheduleList />
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

        <NoticeList />
      </div>
    </div>
  )
}

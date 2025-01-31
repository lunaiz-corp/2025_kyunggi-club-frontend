import type { Metadata } from "next"

import SelectChances from "@packages/ui/components/select-chances"
import Schedules from "./_components/Schedules"

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
    <div className="mb-16 flex flex-col gap-11">
      <div className="h-52 rounded-xl bg-gradient-to-r from-[#132b75] to-ceruleanBlue-700" />

      <div className="flex flex-col gap-5">
        <div className="inline-flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-100">
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
              <span className="font-semibold text-gray-100">
                제목
              </span>
              <span className="text-right text-sm text-gray-100">
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
              <span className="font-semibold text-gray-100">
                제목
              </span>
              <span className="text-right text-sm text-gray-100">
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
              <span className="font-semibold text-gray-100">
                제목
              </span>
              <span className="text-right text-sm text-gray-100">
                일정 : 6월 12일 오후 11:59
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[463px] items-center justify-between gap-7">
        <div className="flex h-full w-full flex-col gap-5">
          <div className="inline-flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-100">
              경쟁률 리더보드
            </h2>
          </div>

          <div className="h-full rounded-xl border border-[#eff6ff]/10 p-5">
            <SelectChances />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="inline-flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-100">
              선발 일정
            </h2>

            <span className="text-sm text-gray-100">더보기</span>
          </div>

          <div className="w-[360px] rounded-xl border border-[#eff6ff]/10 p-5">
            <Schedules />
          </div>
        </div>
      </div>
    </div>
  )
}

import { Metadata } from "next"
import Link from "next/link"

import SchedulesCalendar from "@packages/ui/components/schedules/Calendar"

export const metadata: Metadata = {
  title: "홈 - 경기고등학교 이공계동아리연합",
  description: "Welcome to Next.js",
}

export default function Main() {
  return (
    <main className="mx-auto mt-16 flex max-w-[1200px] flex-col gap-8">
      <div className="flex w-full gap-8">
        <div className="flex w-full flex-col gap-5">
          <div className="inline-flex items-center justify-between">
            <h2 className="text-lg font-bold text-ceruleanBlue-50">
              선발 일정
            </h2>

            <Link href="/schedule">
              <span className="text-sm text-ceruleanBlue-50">
                더보기
              </span>
            </Link>
          </div>

          <div className="flex w-full gap-8 rounded-xl border border-[#eff6ff]/10 px-6 py-4">
            <div className="w-1/2">
              <SchedulesCalendar />
            </div>

            <div className="flex w-1/2 flex-col gap-5 py-4">
              <div className="inline-flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-zinc-200">
                  3월 11일
                </span>

                <div className="inline-flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-ceruleanBlue-700" />
                  <span className="text-xl font-bold text-zinc-200">
                    Event Name
                  </span>
                </div>
              </div>

              <div className="h-0.5 bg-zinc-800" />

              <div className="inline-flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-zinc-200">
                  3월 12일
                </span>

                <div className="inline-flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-ceruleanBlue-700" />
                  <span className="text-xl font-bold text-zinc-200">
                    Event Name
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-[414px] flex-col gap-5">
          <div className="inline-flex items-center justify-between">
            <h2 className="text-lg font-bold text-ceruleanBlue-50">
              동아리 경쟁률 현황
            </h2>
          </div>

          <div className="h-80 rounded-xl bg-[#eff6ff]/10" />
        </div>
      </div>

      <div className="flex w-full gap-8">
        <div className="inline-flex h-[352px] w-[570px] items-center justify-center rounded-xl bg-gradient-to-r from-[#132b75] to-ceruleanBlue-700">
          <span className="text-[27px] font-bold text-ceruleanBlue-50">
            광고
          </span>
        </div>

        <div className="flex w-full flex-1 flex-col gap-5">
          <div className="inline-flex items-center justify-between">
            <h2 className="text-lg font-bold text-ceruleanBlue-50">
              공지사항
            </h2>

            <Link href="/notice">
              <span className="text-sm text-ceruleanBlue-50">
                더보기
              </span>
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <Link href="/notice/1" className="flex justify-between">
              <div className="inline-flex items-center gap-2.5">
                <div className="size-1.5 rounded-full bg-ceruleanBlue-700" />
                <span className="w-56 truncate text-lg font-semibold text-ceruleanBlue-50">
                  어쩌고 저쩌고 어쩌고 저쩌고 어쩌고 저쩌고
                </span>
              </div>

              <span className="text-right text-sm font-medium text-ceruleanBlue-50">
                2025. 01. 01
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

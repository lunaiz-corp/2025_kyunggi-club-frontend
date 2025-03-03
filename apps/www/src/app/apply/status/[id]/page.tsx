import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

import {
  CheckIcon,
  ChevronLeftIcon,
  ClockIcon,
} from "@heroicons/react/24/outline"

import * as clubsJson from "@/data/clubs.json"

import Advertisements from "@/components/Advertisements"
import { NextLink } from "@packages/ui/components/krds/Action"

const { clubs } = clubsJson

export const metadata: Metadata = {
  title: "결과 확인",
  openGraph: {
    title: "결과 확인",
  },
  twitter: {
    title: "결과 확인",
  },
}

export default async function ApplyStatus({
  params,
}: Readonly<{
  params: Promise<{ id: string }>
}>) {
  const { id } = await params
  const currentClub = clubs.find(club => club.id === id)

  if (!currentClub) {
    return notFound()
  }

  return (
    <main className="mx-auto mb-12 flex max-w-[1200px] flex-col gap-19 px-6 pt-8 lg:px-0">
      <div className="flex flex-col gap-18">
        <div className="inline-flex flex-col gap-3">
          <span className="text-2xl text-gray-400">결과 확인</span>

          <div className="inline-flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-4">
              <NextLink
                href="/apply/status"
                className="hidden p-1.5 md:inline"
                title="뒤로 가기"
                onClick={e => {
                  e.preventDefault()
                  window.history.back()
                }}
              >
                <span className="sr-only">뒤로 가기</span>
                <ChevronLeftIcon className="size-5" />
              </NextLink>

              <h1 className="inline-flex gap-3 text-4xl font-bold tracking-tight md:text-5xl">
                <span className="hidden md:inline">
                  {currentClub.name.split(" ")[0]}
                </span>
                <span>{currentClub.name.split(" ")[1]}</span>
              </h1>
            </div>

            <Image
              src={`https://kg-cdn-toast.schooler.kr/assets/badge/${id}.webp`}
              alt={`${currentClub.name} 로고`}
              height={72}
              width={128}
            />
          </div>
        </div>

        <Advertisements page="apply" />

        <div className="mt-4 flex items-center gap-8">
          <div className="flex flex-col items-center gap-6">
            <div className="flex size-16 items-center justify-center rounded-xl bg-ceruleanBlue-600">
              <CheckIcon className="size-8" />
            </div>

            <div className="inline-flex flex-col items-center gap-1.5">
              <span className="text-xl font-bold">지원서 제출</span>
              <span className="text-sm text-gray-400">
                2025. 03. 04
              </span>
            </div>
          </div>

          <div className="box-border h-[1px] w-full flex-1 border border-dashed border-gray-950 bg-gray-100" />

          <div className="flex flex-col items-center gap-6">
            <div className="flex size-16 items-center justify-center rounded-xl bg-ceruleanBlue-600">
              <CheckIcon className="size-8" />
            </div>

            <div className="inline-flex flex-col items-center gap-1.5">
              <span className="text-xl font-bold">지필 평가</span>
              <span className="text-sm text-gray-400">
                2025. 03. 04
              </span>
            </div>
          </div>

          <div className="box-border h-[1px] w-full flex-1 border border-dashed border-gray-950 bg-gray-100" />

          <div className="flex flex-col items-center gap-6">
            <div className="flex size-16 items-center justify-center rounded-xl bg-ceruleanBlue-600">
              <CheckIcon className="size-8" />
            </div>

            <div className="inline-flex flex-col items-center gap-1.5">
              <span className="text-xl font-bold">면접</span>
              <span className="text-sm text-gray-400">
                2025. 03. 04
              </span>
            </div>
          </div>

          <div className="box-border h-[1px] w-full flex-1 border border-dashed border-gray-950 bg-gray-100" />

          <div className="flex flex-col items-center gap-6">
            <div className="flex size-16 items-center justify-center rounded-xl bg-warning-300">
              <ClockIcon className="size-8" />
            </div>

            <div className="inline-flex flex-col items-center gap-1.5">
              <span className="text-xl font-bold">최종 접수</span>
              <span className="text-sm text-gray-400">
                2025. 03. 04
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 inline-flex flex-col gap-6">
          <h2 className="text-4xl font-bold">평가 기준</h2>

          <ol className="ml-4 inline-flex list-disc flex-col gap-3 text-lg">
            <li>평가 기준 어쩌구 저쩌구</li>
            <li>평가 기준 어쩌구 저쩌구</li>
            <li>평가 기준 어쩌구 저쩌구</li>
            <li>평가 기준 어쩌구 저쩌구</li>
            <li>평가 기준 어쩌구 저쩌구</li>
            <li>평가 기준 어쩌구 저쩌구</li>
            <li>평가 기준 어쩌구 저쩌구</li>
          </ol>
        </div>
      </div>
    </main>
  )
}

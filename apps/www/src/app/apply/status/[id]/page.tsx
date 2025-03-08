import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

import * as clubsJson from "@/data/clubs.json"
import * as clubsCriteriaJson from "@/data/clubs.criteria.json"

import Advertisements from "@/components/Advertisements"

import { CurrentStatus } from "../types"
import StatusBadge from "../_components/Badge"

const { clubs } = clubsJson
const { criteria } = clubsCriteriaJson

export const metadata: Metadata = {
  title: "결과 확인",
  openGraph: {
    title: "결과 확인",
  },
  twitter: {
    title: "결과 확인",
  },
}

const processTitle = {
  DOCUMENT: "지원서 제출",
  EXAM: "지필 평가",
  INTERVIEW: "면접",
  FINAL: "최종 접수",
}

const findCurrentBadgeStatus = (
  status: CurrentStatus,
  location: "DOCUMENT" | "EXAM" | "INTERVIEW" | "FINAL",
): "WAITING" | "REJECTED" | "PASSED" | "FINAL_PASSED" => {
  if (location === "DOCUMENT") {
    if (status === CurrentStatus.WAITING) {
      return "WAITING"
    }

    if (status === CurrentStatus.DOCUMENT_REJECTED) {
      return "REJECTED"
    }

    return "PASSED"
  }

  if (location === "EXAM") {
    if (
      [CurrentStatus.WAITING, CurrentStatus.DOCUMENT_PASSED].includes(
        status,
      )
    ) {
      return "WAITING"
    }

    if (
      [
        CurrentStatus.DOCUMENT_REJECTED,
        CurrentStatus.EXAM_REJECTED,
      ].includes(status)
    ) {
      return "REJECTED"
    }

    return "PASSED"
  }

  if (location === "INTERVIEW") {
    if (
      [
        CurrentStatus.WAITING,
        CurrentStatus.DOCUMENT_PASSED,
        CurrentStatus.EXAM_PASSED,
      ].includes(status)
    ) {
      return "WAITING"
    }

    if (
      [
        CurrentStatus.DOCUMENT_REJECTED,
        CurrentStatus.EXAM_REJECTED,
        CurrentStatus.INTERVIEW_REJECTED,
      ].includes(status)
    ) {
      return "REJECTED"
    }

    return "PASSED"
  }

  if (location === "FINAL") {
    if (
      [
        CurrentStatus.WAITING,
        CurrentStatus.DOCUMENT_PASSED,
        CurrentStatus.INTERVIEW_PASSED,
        CurrentStatus.FINAL_SUBMISSION,
      ].includes(status)
    ) {
      return "WAITING"
    }

    if (
      [
        CurrentStatus.DOCUMENT_REJECTED,
        CurrentStatus.EXAM_REJECTED,
        CurrentStatus.INTERVIEW_REJECTED,
        CurrentStatus.FINAL_REJECTED,
      ].includes(status)
    ) {
      return "REJECTED"
    }

    return "FINAL_PASSED"
  }

  return "REJECTED"
}

export default async function ApplyStatus({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ id: string }>
  searchParams: Promise<{ status: CurrentStatus }>
}>) {
  const { id } = await params
  const { status } = await searchParams

  const currentClub = clubs.find(club => club.id === id)
  const currentCriteria = criteria.find(
    club => club.id === id,
  )?.criteria

  if (!currentClub || !status) {
    return notFound()
  }

  return (
    <main className="mx-auto mb-12 flex max-w-[1200px] flex-col gap-19 px-6 pt-8 lg:px-0">
      <div className="flex flex-col gap-18">
        <div className="inline-flex flex-col gap-3">
          <span className="text-2xl text-gray-400">결과 확인</span>

          <div className="inline-flex flex-col items-center justify-between gap-8 md:flex-row">
            <h1 className="inline-flex gap-3 text-4xl font-bold tracking-tight md:text-5xl">
              <span className="hidden md:inline">
                {currentClub.name.split(" ")[0]}
              </span>
              <span>{currentClub.name.split(" ")[1]}</span>
            </h1>

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
            <StatusBadge
              status={findCurrentBadgeStatus(status, "DOCUMENT")}
            />

            <div className="inline-flex flex-col items-center gap-1.5">
              <span className="text-xl font-bold">지원서 제출</span>
              <span className="text-sm text-gray-400">
                {/* 2025. 03. 08 */}
                &nbsp;
              </span>
            </div>
          </div>

          <div className="box-border h-[1px] w-full flex-1 border border-dashed border-gray-950 bg-gray-100" />

          <div className="flex flex-col items-center gap-6">
            <StatusBadge
              status={findCurrentBadgeStatus(status, "EXAM")}
            />

            <div className="inline-flex flex-col items-center gap-1.5">
              <span className="text-xl font-bold">지필 평가</span>
              <span className="text-sm text-gray-400">
                2025. 03. 11 ~ 12
              </span>
            </div>
          </div>

          <div className="box-border h-[1px] w-full flex-1 border border-dashed border-gray-950 bg-gray-100" />

          <div className="flex flex-col items-center gap-6">
            <StatusBadge
              status={findCurrentBadgeStatus(status, "INTERVIEW")}
            />

            <div className="inline-flex flex-col items-center gap-1.5">
              <span className="text-xl font-bold">면접</span>
              <span className="text-sm text-gray-400">
                2025. 03. 14, 17
              </span>
            </div>
          </div>

          <div className="box-border h-[1px] w-full flex-1 border border-dashed border-gray-950 bg-gray-100" />

          <div className="flex flex-col items-center gap-6">
            <StatusBadge
              status={findCurrentBadgeStatus(status, "FINAL")}
            />

            <div className="inline-flex flex-col items-center gap-1.5">
              <span className="text-xl font-bold">최종 접수</span>
              <span className="text-sm text-gray-400">
                2025. 03. 18
              </span>
            </div>
          </div>
        </div>

        {currentCriteria && (
          <div className="mt-8 inline-flex flex-col gap-8">
            <h2 className="text-4xl font-bold">평가 기준</h2>

            <ol className="ml-4 inline-flex list-decimal flex-col gap-6 text-lg">
              {Object.entries(currentCriteria).map(
                ([process, criterion]) => (
                  <li key={process}>
                    <span className="font-bold">
                      {
                        processTitle[
                          process as keyof typeof processTitle
                        ]
                      }
                    </span>
                    <ul>
                      <li className="whitespace-pre-line">
                        {criterion}
                      </li>
                    </ul>
                  </li>
                ),
              )}
            </ol>
          </div>
        )}
      </div>
    </main>
  )
}

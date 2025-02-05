"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export const TITLE_BY_STEP = {
  step1: "약관에 동의해 주세요.",
  step2: "인적 사항을 입력해 주세요.",
  step3: "동아리 지원서를 작성해 주세요.",
  step4: "제출할 지원서를 다시 확인해 주세요.",
}

export default function TitleBar({
  title,
}: Readonly<{ title?: string }>) {
  const searchParams = useSearchParams()
  // Client side에서 실제 타이틀을 가져옴으로써 hydration 오류 방지
  // @use-funnel 로딩 중일 때는 현재 파라미터를 가지고 추론
  const [realText, setRealText] = useState<string | undefined>()
  const stepFromParams = searchParams.get(
    "apply.step",
  ) as keyof typeof TITLE_BY_STEP

  useEffect(() => {
    setRealText(title)
  }, [title])

  return (
    <div className="inline-flex flex-col gap-3">
      <span className="text-2xl text-gray-600">지원하기</span>
      <h1 className="text-4xl font-bold tracking-tight md:text-[42px]">
        {realText ??
          TITLE_BY_STEP[stepFromParams] ??
          TITLE_BY_STEP.step1}
      </h1>
    </div>
  )
}

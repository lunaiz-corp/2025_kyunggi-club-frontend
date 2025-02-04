"use client"

import { useEffect, useState } from "react"
import { TITLE_BY_STEP } from "../_funnels"

export default function TitleBar({
  title,
}: Readonly<{ title: string }>) {
  // Client side에서 실제 타이틀을 가져옴으로써 hydration 오류 방지
  const [realText, setRealText] = useState<string | undefined>()

  useEffect(() => {
    setRealText(title)
  }, [title])

  return (
    <div className="inline-flex flex-col gap-3">
      <span className="text-2xl text-gray-600">지원하기</span>
      <h1 className="text-4xl font-bold tracking-tight md:text-[42px]">
        {realText ?? TITLE_BY_STEP.step1}
      </h1>
    </div>
  )
}

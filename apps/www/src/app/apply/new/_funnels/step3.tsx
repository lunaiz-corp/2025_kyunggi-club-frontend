import { useEffect, useState } from "react"

import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/20/solid"

import Button from "@packages/ui/components/krds/Button"

import type { ApplyBaseContext } from "."
import type { DataNeedsToBeFilled as DataNeedsToBeFilledStep1 } from "./step1"
import type { DataNeedsToBeFilled as DataNeedsToBeFilledStep2 } from "./step2"

// 3. 인적 사항 입력 완료 - 지원서 작성 중
export type ApplyStep3 = DataNeedsToBeFilledStep1 &
  DataNeedsToBeFilledStep2

export type DataNeedsToBeFilled = {
  formAnswers: {
    id: number // 질문 번호
    answer: string // 답변
  }[]
}

export default function ApplyNewFunnelStep3({
  onPrev,
  onNext,
  ...context
}: Readonly<
  {
    onPrev: () => void
    onNext: (data: DataNeedsToBeFilled) => void
  } & ApplyBaseContext
>) {
  const [formAnswers, setFormAnswers] = useState<
    DataNeedsToBeFilled["formAnswers"]
  >([])

  useEffect(() => {
    // 만약 이미 데이터가 저장되어 있으면 데이터를 채워준다.
    if (context.formAnswers) {
      setFormAnswers(context.formAnswers)
    }
  }, [context])

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={e => {
        e.preventDefault()
        onNext({ formAnswers })
      }}
    >
      <div className="h-0.5 bg-gray-900" />
      <div className="h-0.5 bg-gray-900" />
      <div className="h-0.5 bg-gray-900" />

      <div className="flex w-full gap-5">
        <Button
          type="button"
          className="w-full border-gray-900 bg-gray-900 font-bold hover:bg-gray-800 focus:bg-gray-800 focus:outline-gray-700 active:bg-gray-800"
          onClick={() => onPrev()}
        >
          이전 <ArrowLeftIcon className="size-5" />
        </Button>

        <Button type="submit" className="w-full font-bold">
          다음 <ArrowRightIcon className="size-5" />
        </Button>
      </div>
    </form>
  )
}

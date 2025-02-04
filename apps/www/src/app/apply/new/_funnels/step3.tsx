/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useRef, useState } from "react"
import { useFunnel } from "@use-funnel/browser"

import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/20/solid"

import Input from "@packages/ui/components/krds/Input"
import Textarea from "@packages/ui/components/krds/Textarea"
import Checkbox from "@packages/ui/components/Checkbox"
import Button from "@packages/ui/components/krds/Button"

import { clubs } from "@/data/clubs.json"

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
  const formFunnel = useFunnel<{
    [key: string]: DataNeedsToBeFilled["formAnswers"]
  }>({
    id: "forms",
    initial: {
      step: context.applingClubs![0],
      context: [],
    },
  })

  const havePrefilled = useRef<boolean>(false)

  const [formAnswers, setFormAnswers] = useState<
    DataNeedsToBeFilled["formAnswers"]
  >([])

  useEffect(() => {
    if (!havePrefilled.current) {
      // 만약 이미 데이터가 저장되어 있으면 데이터를 채워준다.
      if (context.formAnswers) {
        setFormAnswers(context.formAnswers)
      }

      havePrefilled.current = true
    }
  }, [context])

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={e => {
        e.preventDefault()

        window.scrollTo({
          top: 0,
          behavior: "instant",
        })

        onNext({ formAnswers })
      }}
    >
      <div className="h-0.5 bg-gray-900" />

      <div className="inline-flex flex-col gap-5">
        <span className="text-xl">학생 지망 동아리</span>

        <div className="inline-flex gap-6 text-4xl font-bold">
          {context
            .applingClubs!.filter(club => club !== "")
            .map(club => (
              <span
                key={club}
                className={
                  formFunnel.step === club
                    ? "opacity-100"
                    : "opacity-10"
                }
              >
                {clubs.find(c => c.id === club)!.name.split(" ")[1]}
              </span>
            ))}
        </div>
      </div>

      <div className="h-0.5 bg-gray-900" />

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <label
            htmlFor="q-1"
            className="cursor-pointer text-2xl font-bold"
          >
            Q. 무임승차를 하실건가요?
          </label>

          {/* TODO: 단답형 */}
          <Input
            id="q-1"
            type="text"
            placeholder="응답을 입력하세요."
            required
          />
        </div>

        <div className="flex flex-col gap-5">
          <label
            htmlFor="q-2"
            className="cursor-pointer text-2xl font-bold"
          >
            Q. 무임승차를 하실건가요?
          </label>

          {/* TODO: 장문형 */}
          <Textarea
            id="q-2"
            placeholder="응답을 입력하세요."
            className="h-40"
            required
          />
        </div>

        <div className="flex flex-col gap-5">
          <label className="cursor-pointer text-2xl font-bold">
            Q. 무임승차를 하실건가요?
          </label>

          <div className="inline-flex items-center gap-3">
            {/* TODO: 객관식 */}
            <Checkbox id="q-3" required />

            <label
              htmlFor="q-3"
              className="inline-flex cursor-pointer items-center gap-2 text-lg"
            >
              린도 린도 린도
            </label>
          </div>
        </div>
      </div>

      <div className="h-0.5 bg-gray-900" />

      <div className="flex w-full gap-5">
        <Button
          type="button"
          className="w-full border-gray-900 bg-gray-900 font-bold hover:bg-gray-800 focus:bg-gray-800 focus:outline-gray-700 active:bg-gray-800"
          onClick={() => onPrev()}
        >
          <ArrowLeftIcon className="size-5" /> 이전
        </Button>

        <Button type="submit" className="w-full font-bold">
          다음 <ArrowRightIcon className="size-5" />
        </Button>
      </div>
    </form>
  )
}

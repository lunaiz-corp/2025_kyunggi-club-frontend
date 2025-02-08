import { useState } from "react"

import {
  PencilIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@heroicons/react/20/solid"

import { Button } from "@packages/ui/components/krds/Action"
import type { UploadedFile } from "@packages/ui/components/krds/Input/FileUpload"

import FormPreview from "../../_components/FormPreview"

import type { ApplyBaseContext } from "."

import type { DataNeedsToBeFilled as DataNeedsToBeFilledStep1 } from "./step1"
import type { DataNeedsToBeFilled as DataNeedsToBeFilledStep2 } from "./step2"
import type { DataNeedsToBeFilled as DataNeedsToBeFilledStep3 } from "./step3"

// 4. 입력한 지원서의 Visual Check
export type ApplyStep4 = DataNeedsToBeFilledStep1 &
  DataNeedsToBeFilledStep2 &
  DataNeedsToBeFilledStep3

export default function ApplyNewFunnelStep4({
  onPrev,
  onNext,
  ...context
}: Readonly<
  {
    onPrev: () => void
    onNext: () => void
  } & ApplyBaseContext
>) {
  const [currentStep, setCurrentStep] = useState<string>(
    context.applingClubs![0],
  )
  const willUploadedForm = context.formAnswers!.map(form => ({
    club: form.club,
    answers: form.answers.map(answer => {
      if (
        answer.answer instanceof Array &&
        answer.answer[0] instanceof File
      ) {
        return {
          id: answer.id,
          answer: answer.answer.map(file => ({
            name: file.name,
            url: URL.createObjectURL(file),
          })),
        }
      }

      return answer
    }) as {
      id: number
      answer: string | UploadedFile[]
    }[],
  }))

  return (
    <div className="flex flex-col gap-6">
      <FormPreview
        form={{
          applingClubs: context.applingClubs!,
          formAnswers: willUploadedForm,
        }}
        stepState={[currentStep, setCurrentStep]}
      />

      <div className="h-0.5 bg-gray-900" />

      <div className="flex w-full gap-5">
        {/* 페이지 1 -> 수정 버튼으로 */}
        {/* 페이지 2, 3 -> 이전 버튼으로 */}
        {currentStep === context.applingClubs![0] ? (
          <Button
            type="button"
            className="w-full border-gray-900 bg-gray-900 font-bold hover:bg-gray-800 focus:bg-gray-800 focus:outline-gray-700 active:bg-gray-800"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "instant",
              })

              onPrev()
            }}
          >
            <PencilIcon className="size-5" /> 수정
          </Button>
        ) : (
          <Button
            type="button"
            className="w-full border-gray-900 bg-gray-900 font-bold hover:bg-gray-800 focus:bg-gray-800 focus:outline-gray-700 active:bg-gray-800"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "instant",
              })

              const prevClubIndex =
                context.applingClubs!.findIndex(
                  club => club === currentStep,
                ) - 1

              setCurrentStep(context.applingClubs![prevClubIndex])
            }}
          >
            <ArrowLeftIcon className="size-5" /> 이전
          </Button>
        )}

        {/* 페이지 1, 2 -> 다음 버튼으로 */}
        {/* 페이지 3 -> 제출 버튼으로 */}
        {currentStep !== context.applingClubs![2] ? (
          <Button
            type="button"
            className="w-full font-bold"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "instant",
              })

              const nextClubIndex =
                context.applingClubs!.findIndex(
                  club => club === currentStep,
                ) + 1

              setCurrentStep(context.applingClubs![nextClubIndex])
            }}
          >
            다음 <ArrowRightIcon className="size-5" />
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full font-bold"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "instant",
              })

              onNext()
            }}
          >
            제출 <CheckIcon className="size-5" />
          </Button>
        )}
      </div>
    </div>
  )
}

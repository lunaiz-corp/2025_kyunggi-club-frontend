import type { Dispatch, SetStateAction } from "react"
import { useEffect, useRef, useState } from "react"

import { getForm } from "@/api/apply/form"
import { QuestionType } from "@/api/types/form"
import { useQuery } from "@tanstack/react-query"

import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/20/solid"

import { Button } from "@packages/ui/components/krds/Action"

import * as clubsJson from "@/data/clubs.json"
import type { FormAnswers } from "./_questions/types"

import type { ApplyBaseContext } from "."

import type { DataNeedsToBeFilled as DataNeedsToBeFilledStep1 } from "./step1"
import type { DataNeedsToBeFilled as DataNeedsToBeFilledStep2 } from "./step2"

import {
  ShortInput,
  LongInput,
  MultipleChoice,
  Dropdown,
  FileUpload,
} from "./_questions"

const { clubs } = clubsJson

// 3. 인적 사항 입력 완료 - 지원서 작성 중
export type ApplyStep3 = DataNeedsToBeFilledStep1 &
  DataNeedsToBeFilledStep2

export type DataNeedsToBeFilled = {
  formAnswers: {
    club: string // 학생 지망 동아리
    answers: FormAnswers[]
  }[]
}

function Questions({
  club,
  formAnswersState,
}: Readonly<{
  club: string
  formAnswersState: [
    FormAnswers[],
    Dispatch<SetStateAction<FormAnswers[]>>,
  ]
}>) {
  const {
    isLoading,
    error,
    data: questions,
  } = useQuery({
    queryKey: ["questions", club],
    queryFn: () => getForm({ club }),
    retry: false,
  })

  return (
    !isLoading &&
    !error &&
    questions && (
      <div className="flex flex-col gap-8">
        {questions.map(question => {
          const QuestionComponent = (() => {
            switch (question.type) {
              case QuestionType.SHORT_INPUT:
                return ShortInput

              case QuestionType.LONG_INPUT:
                return LongInput

              case QuestionType.MULTIPLE_CHOICE:
                return MultipleChoice

              case QuestionType.DROPDOWN:
                return Dropdown

              case QuestionType.FILE_UPLOAD:
                return FileUpload

              default:
                return ShortInput
            }
          })()

          return (
            <QuestionComponent
              key={`${club}-${question.id}`}
              id={question.id}
              question={question.question}
              options={
                question.type === QuestionType.MULTIPLE_CHOICE ||
                question.type === QuestionType.DROPDOWN
                  ? (question.options ?? [])
                  : []
              }
              maxFiles={
                question.type === QuestionType.FILE_UPLOAD
                  ? (question.maxFiles ?? 1)
                  : -1
              }
              required={question.required ?? false}
              formAnswersState={formAnswersState}
            />
          )
        })}
      </div>
    )
  )
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
  const havePrefilled = useRef<boolean>(false)
  const havePrefilledForEachQuestion = useRef<boolean>(false)

  const [currentStep, setCurrentStep] = useState<string>(
    context.applingClubs![0],
  )

  const [formAnswers, setFormAnswers] = useState<
    DataNeedsToBeFilled["formAnswers"]
  >([])

  const [formAnswersByStep, setFormAnswersByStep] = useState<
    FormAnswers[]
  >([])

  useEffect(() => {
    if (context.formAnswers) {
      // 만약 이미 데이터가 저장되어 있으면 데이터를 채워준다.
      if (!havePrefilled.current) {
        setFormAnswers(context.formAnswers)
      }

      // 만약 이미 지원서 응답이 저장되어 있으면 데이터를 채워준다.
      if (!havePrefilledForEachQuestion.current) {
        if (
          context.formAnswers.find(
            answer => answer.club === currentStep,
          )
        ) {
          setFormAnswersByStep(
            context.formAnswers.find(
              answer => answer.club === currentStep,
            )!.answers,
          )
        }
      }
    }

    havePrefilled.current = true
    havePrefilledForEachQuestion.current = true
  }, [context.formAnswers, currentStep, formAnswers])

  function saveFormAnswers() {
    // formAnswer값이 바로 변하지 않기에 새로운 배열을 만들어서 이를 return한다.
    // @see https://velog.io/@woohm402/why-my-state-doesnt-change

    const newFormAnswers = formAnswers.find(
      answer => answer.club === currentStep,
    )
      ? formAnswers.map(answer =>
          answer.club === currentStep
            ? { club: currentStep, answers: formAnswersByStep }
            : answer,
        )
      : [
          ...formAnswers,
          { club: currentStep, answers: formAnswersByStep },
        ]

    setFormAnswers(newFormAnswers)
    return newFormAnswers
  }

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={e => {
        e.preventDefault()

        havePrefilledForEachQuestion.current = false

        window.scrollTo({
          top: 0,
          behavior: "instant",
        })

        const savedFormAnswers = saveFormAnswers()

        const nextClubIndex =
          context.applingClubs!.findIndex(
            club => club === currentStep,
          ) + 1

        if (context.applingClubs![nextClubIndex]) {
          setFormAnswersByStep([])
          setCurrentStep(context.applingClubs![nextClubIndex])
        } else {
          havePrefilled.current = false
          onNext({ formAnswers: savedFormAnswers })
        }
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
                  currentStep === club ? "opacity-100" : "opacity-10"
                }
              >
                {clubs.find(c => c.id === club)!.name.split(" ")[1]}
              </span>
            ))}
        </div>
      </div>

      <div className="h-0.5 bg-gray-900" />

      <Questions
        club={currentStep}
        formAnswersState={[formAnswersByStep, setFormAnswersByStep]}
      />

      <div className="h-0.5 bg-gray-900" />

      <div className="flex w-full gap-5">
        <Button
          type="button"
          className="w-full border-gray-900 bg-gray-900 font-bold hover:bg-gray-800 focus:bg-gray-800 focus:outline-gray-700 active:bg-gray-800"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "instant",
            })

            saveFormAnswers()
            setFormAnswersByStep([])

            if (currentStep === context.applingClubs![0]) {
              onPrev()
            } else {
              const prevClubIndex =
                context.applingClubs!.findIndex(
                  club => club === currentStep,
                ) - 1

              havePrefilledForEachQuestion.current = false
              setCurrentStep(context.applingClubs![prevClubIndex])
            }
          }}
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

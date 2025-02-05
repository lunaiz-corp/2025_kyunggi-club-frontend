"use client"

import { useEffect } from "react"
import dynamic from "next/dynamic"
import { useFunnel } from "@use-funnel/browser"

import Advertisements from "@/components/Advertisements"
import ScreenLoading from "@/components/ScreenLoading"

import TitleBar, { TITLE_BY_STEP } from "../_components/TitleBar"

import type { ApplyStep1 } from "./step1"
import type { ApplyStep2 } from "./step2"
import type { ApplyStep3 } from "./step3"

const Step1 = dynamic(() => import("./step1"), {
  ssr: false,
  loading: () => <ScreenLoading />,
})
const Step2 = dynamic(() => import("./step2"), {
  ssr: false,
  loading: () => <ScreenLoading />,
})
const Step3 = dynamic(() => import("./step3"), {
  ssr: false,
  loading: () => <ScreenLoading />,
})

export type ApplyBaseContext = {
  // Step1
  agreedTerms?: number[]

  // Step2
  userInfo?: {
    id: number // 학번
    name: string // 이름
    phone: string // 전화번호
    verifiedRefId: string // 전화번호, CI 등을 서버에서 참조할 수 있는 refId
    isVerifiedPhoneIsParent: boolean // 전화번호가 본인 또는 부모님 전화번호인지 여부 (default: false)
  }
  parentInfo?: {
    name: string // 부모님 이름
    relationship: string // 학생 간 관계
    phone: string // 부모님 전화번호
  }
  applingClubs?: string[] // 학생 지망 동아리 리스트

  // Step3
  formAnswers?: {
    club: string // 학생 지망 동아리
    answers: {
      id: number // 질문 번호
      answer: string // 답변
    }[]
  }[]
}

export default function ApplyNewFunnel() {
  const funnel = useFunnel<{
    step1: ApplyStep1
    step2: ApplyStep2
    step3: ApplyStep3
  }>({
    id: "apply",
    initial: {
      step: "step1",
      context: {},
    },
  })

  useEffect(() => {
    const preventLeave = (e: BeforeUnloadEvent) => {
      e.preventDefault()
    }

    window.addEventListener("beforeunload", preventLeave)
    return () => {
      window.removeEventListener("beforeunload", preventLeave)
    }
  }, [funnel.context])

  return (
    <>
      <TitleBar title={TITLE_BY_STEP[funnel.step]} />

      <Advertisements page="apply" />

      <funnel.Render
        step1={({ context, history }) => (
          <Step1
            onNext={props => history.push("step2", props)}
            {...context}
          />
        )}
        step2={({ context, history }) => {
          if (
            !context ||
            !context.agreedTerms ||
            context.agreedTerms.length === 0
          ) {
            // step1에서 넘어온 데이터가 없으면 step1 페이지로 이동
            history.replace("step1", { agreedTerms: [] })
          }

          return (
            <Step2
              onPrev={() => history.push("step1", context)}
              onNext={props => history.push("step3", props)}
              {...context}
            />
          )
        }}
        step3={({ context, history }) => {
          if (
            !context ||
            !context.userInfo ||
            !context.parentInfo ||
            !context.applingClubs ||
            context.applingClubs.length === 0
          ) {
            // step2에서 넘어온 데이터가 없으면 step1 페이지로 이동
            // step1에서 데이터가 제대로 왔다는 보장이 없으므로 아예 초기화하여 step1으로 보내기로
            history.replace("step1", { agreedTerms: [] })
          }

          return (
            // TODO: step3 -> step4 구현
            <Step3
              onPrev={() => history.push("step2", context)}
              // eslint-disable-next-line no-console
              onNext={props => console.log(props)}
              {...context}
            />
          )
        }}
      />
    </>
  )
}

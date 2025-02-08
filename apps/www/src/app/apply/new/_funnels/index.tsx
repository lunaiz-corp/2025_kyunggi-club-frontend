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
import type { ApplyStep4 } from "./step4"

// dynamic으로 불러옴으로 @use-funnel Hydration 문제 해결
// @see https://use-funnel.slash.page/ko/docs/get-started#%EC%B4%88%EA%B8%B0-%EB%8B%A8%EA%B3%84-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0
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
const Step4 = dynamic(() => import("./step4"), {
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
      answer: string | File[] // 답변
    }[]
  }[]
}

export default function ApplyNewFunnel() {
  const funnel = useFunnel<{
    step1: ApplyStep1
    step2: ApplyStep2
    step3: ApplyStep3
    step4: ApplyStep4
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

    const preventAutoSubmit = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "NumpadEnter") {
        e.preventDefault()
      }
    }

    document.addEventListener("keydown", preventAutoSubmit)
    window.addEventListener("beforeunload", preventLeave)

    return () => {
      document.removeEventListener("keydown", preventAutoSubmit)
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
          if (!context?.agreedTerms?.length) {
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
            !context?.userInfo ||
            !context?.parentInfo ||
            !context?.applingClubs?.length
          ) {
            // step2에서 넘어온 데이터가 없으면 step1 페이지로 이동
            // step1에서 데이터가 제대로 왔다는 보장이 없으므로 아예 초기화하여 step1으로 보내기로
            history.replace("step1", { agreedTerms: [] })
          }

          return (
            <Step3
              onPrev={() => history.push("step2", context)}
              onNext={props => history.push("step4", props)}
              {...context}
            />
          )
        }}
        step4={({ context, history }) => {
          if (!context?.formAnswers?.length) {
            // step3에서 넘어온 데이터가 없으면 step1 페이지로 이동
            // step1에서 데이터가 제대로 왔다는 보장이 없으므로 아예 초기화하여 step1으로 보내기로
            history.replace("step1", { agreedTerms: [] })
          }

          return (
            // TODO: step4 -> 서버 제출
            <Step4
              onPrev={() => history.push("step3", context)}
              onNext={() => {
                // eslint-disable-next-line no-console
                console.log("submit")
              }}
              {...context}
            />
          )
        }}
      />
    </>
  )
}

"use client"

import dynamic from "next/dynamic"
import { useFunnel } from "@use-funnel/browser"

import Advertisements from "@/components/Advertisements"
import TitleBar from "../_components/TitleBar"

import type { ApplyStep1 } from "./step1"
import type { ApplyStep2 } from "./step2"

const Step1 = dynamic(() => import("./step1"), { ssr: false })
const Step2 = dynamic(() => import("./step2"), { ssr: false })

export type ApplyBaseContext = {
  // Step1
  agreedTerms?: number[]

  // Step2
  userInfo?: {
    id: number // 학번
    name: string // 이름
    verifiedRefId: string // 전화번호, CI 등을 서버에서 참조할 수 있는 refId
    isVerifiedPhoneIsParent: boolean // 전화번호가 본인 또는 부모님 전화번호인지 여부 (default: false)
  }
  parentInfo?: {
    name: string // 부모님 이름
    relationship: string // 학생 간 관계
    phone: string // 부모님 전화번호
  }
  applingClubs?: string[] // 학생 지망 동아리
}

const TITLE_BY_STEP = {
  step1: "약관에 동의해 주세요.",
  step2: "인적 사항을 입력해 주세요.",
  step3: "동아리 지원서를 작성해 주세요.",
  step4: "제출할 지원서를 다시 확인해 주세요.",
}

export default function ApplyNewFunnel() {
  const funnel = useFunnel<{
    step1: ApplyStep1
    step2: ApplyStep2
  }>({
    id: "apply",
    initial: {
      step: "step1",
      context: {},
    },
  })

  return (
    <>
      <TitleBar title={TITLE_BY_STEP[funnel.step]} />

      <Advertisements page="apply" />

      <funnel.Render
        step1={({ history }) => (
          <Step1 onNext={props => history.push("step2", props)} />
        )}
        step2={({ context, history }) => {
          if (context.agreedTerms.length === 0) {
            history.replace("step1", { agreedTerms: [] })
          }

          return (
            // <Step2 onNext={props => history.push("step3", props)} />
            // eslint-disable-next-line no-console
            <Step2 onNext={props => console.log(props)} />
          )
        }}
      />
    </>
  )
}

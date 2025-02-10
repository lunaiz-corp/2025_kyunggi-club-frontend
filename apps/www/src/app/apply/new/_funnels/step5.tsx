import { useEffect } from "react"

import type { Dispatch, SetStateAction } from "react"
import type { ApplyBaseContext } from "."

import type { ApplyStep4 } from "./step4"

// 5. 입력한 지원서의 서버 제출
// Step4랑 똑같음
export type ApplyStep5 = ApplyStep4

export default function ApplyNewFunnelStep5({
  submittedState,
  ...context
}: Readonly<
  {
    submittedState: [boolean, Dispatch<SetStateAction<boolean>>]
  } & ApplyBaseContext
>) {
  const [submitted, setSubmitted] = submittedState

  useEffect(() => {
    if (context && !submitted) {
      // 서버에 지원서 제출

      setTimeout(() => {
        setSubmitted(true)
      }, 1500)
    }
  }, [context, setSubmitted, submitted])

  return null
}

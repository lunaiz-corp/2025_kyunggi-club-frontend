import { useEffect, useState } from "react"
import { overlay } from "overlay-kit"

import { Modal } from "@packages/ui/components/krds/Layout"

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
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = submittedState

  useEffect(() => {
    if (context && submitting && !submitted) {
      ;(async () => {
        setSubmitting(true)

        const submitRequest = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/apply/new`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userInfo: context.userInfo,
              parentInfo: context.parentInfo,
              formAnswers: context.formAnswers,
            }),
          },
        )

        const submitResponse = await submitRequest.json()
        if (submitRequest.ok) {
          setSubmitted(true)
        } else {
          overlay.open(({ isOpen, close, unmount }) => {
            return (
              <Modal
                isOpen={isOpen}
                close={() => {
                  close()
                  setTimeout(unmount, 200)
                }}
                title="오류"
              >
                서버와의 통신 중 오류가 발생했습니다.
                <br />
                오류 메시지: {submitResponse.message}
                <br />
                <br />
                고객센터 (070-4138-4014) 혹은 하단 채팅 상담으로
                문의해주세요.
              </Modal>
            )
          })

          // eslint-disable-next-line no-console
          console.error(submitResponse)
        }
      })()
    }
  }, [context, setSubmitted, submitted])

  return null
}

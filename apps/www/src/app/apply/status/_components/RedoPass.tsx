import { useEffect, useRef } from "react"

import { overlay } from "overlay-kit"
import { customAlphabet } from "nanoid"

import { Modal } from "@packages/ui/components/krds/Layout"

export default function RedoPass({
  id,
  name,
  password,
  controller,
}: Readonly<{
  id: string
  name: string
  password: string
  controller: {
    isOpen: boolean
    close: () => void
    unmount: () => void
  }
}>) {
  const kcpAuthPop = useRef<WindowProxy | null>(null)

  const requestVerifyPhone = async () => {
    const nanoid = customAlphabet(
      "0123456789abcdefghijklmnopqrstuvwxyz",
      10,
    )

    const orderId = `KGH${new Date().toISOString().substring(0, 19).replace(/[\D]/g, "")}@${nanoid()}`

    if (window.matchMedia("(max-width: 768px)").matches) {
      kcpAuthPop.current = window.open(
        `/apply/pass/request?orderId=${orderId}`,
        "auth_popup",
      )
    } else {
      const width = 410
      // const height = 500
      const height = 724

      const leftpos = window.screen.width / 2 - width / 2
      const toppos = window.screen.height / 2 - height / 2

      kcpAuthPop.current = window.open(
        `/apply/pass/request?orderId=${orderId}`,
        "auth_popup",
        `width=${width}, height=${height}, left=${leftpos}, top=${toppos}, toolbar=no, status=no, statusbar=no, menubar=no, scrollbars=no, resizable=no, fullscreen=no, titlebar=no, location=no`,
      )
    }

    if (kcpAuthPop.current) {
      kcpAuthPop.current.focus()
    } else {
      overlay.open(
        ({
          isOpen: popErrIsOpen,
          close: popErrClose,
          unmount: popErrUnmount,
        }) => {
          return (
            <Modal
              isOpen={popErrIsOpen}
              close={() => {
                popErrClose()
                setTimeout(popErrUnmount, 200)
              }}
              title="오류"
            >
              팝업 차단을 해제해주세요.
            </Modal>
          )
        },
      )
    }
  }

  useEffect(() => {
    // checkplus message 이벤트를 팝업으로 부터 받아서 처리
    const receiveMessage = async (event: MessageEvent<string>) => {
      try {
        const data = JSON.parse(event.data) as {
          type: "kcpcert:done"

          orderId?: string

          user_name?: string
          phone_no?: string

          is_parent?: boolean
        }

        if (data.type === "kcpcert:done") {
          // eslint-disable-next-line no-console
          console.log("KCP Cert result =>", data)
          kcpAuthPop.current!.close()

          const registerRequest = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/apply/student/${id}/cidi`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                studentName: name,
                password,
                verifiedRefId: data.orderId,
              }),
            },
          )

          const registerResponse = await registerRequest.json()

          if (!registerRequest.ok) {
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
                  {registerResponse.message ||
                    "서버와의 통신 중 오류가 발생했습니다."}
                </Modal>
              )
            })
          }

          controller.close()
          setTimeout(controller.unmount, 200)
        }
      } catch {} // eslint-disable-line no-empty
    }

    window.addEventListener("message", receiveMessage)

    return () => {
      window.removeEventListener("message", receiveMessage)
    }
  }, [controller, id, name, password])

  return (
    <Modal
      isOpen={controller.isOpen}
      close={() => requestVerifyPhone()}
      title="실명 인증 안내"
    >
      {/* 실명 인증이 완료되지 않은 사용자입니다.
      <br /> */}
      지원 상태를 조회하기 전, 최초 1회 실명 인증을 완료해주세요.
      <br />
      <br />
      확인 버튼을 누르면, 실명 인증 페이지로 이동합니다.
    </Modal>
  )
}

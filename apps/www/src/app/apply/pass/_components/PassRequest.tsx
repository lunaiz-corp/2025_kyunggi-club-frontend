"use client"

import { useEffect, useRef, useState } from "react"

import { useQuery } from "@tanstack/react-query"
import { encryptPassRequest } from "@/api/apply/pass"

export default function PassRequest({
  orderId,
}: Readonly<{
  orderId: string
}>) {
  const [device, setDevice] = useState<
    null | "pc" | "android" | "ios"
  >(null)

  const {
    isLoading: isPassEncryptLoading,
    data: passEncrypted,
    error: passEncryptError,
  } = useQuery({
    queryKey: ["pass", orderId],
    queryFn: () => encryptPassRequest(orderId, device!),
    enabled: !!orderId && !!device,
    retry: false,
  })

  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    document.body.style.overflow = "hidden"

    if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent)) {
      setDevice("ios")
    } else if (/(Android)/i.test(navigator.userAgent)) {
      setDevice("android")
    } else {
      setDevice("pc")
    }
  }, [])

  useEffect(() => {
    if (!orderId) {
      // eslint-disable-next-line no-alert
      window.alert("잘못된 접근입니다.")

      window.close()
      window.stop()

      return
    }

    if (passEncryptError) {
      // eslint-disable-next-line no-alert
      window.alert(
        passEncryptError ||
          "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.",
      )

      window.close()
      window.stop()

      return
    }

    if (passEncrypted) {
      formRef.current!.submit()
    }
  }, [passEncrypted, passEncryptError, orderId])

  return (
    orderId &&
    device &&
    !isPassEncryptLoading &&
    !passEncryptError &&
    passEncrypted && (
      <form
        ref={formRef}
        action={passEncrypted.url}
        acceptCharset="EUC-KR"
        method="POST"
      >
        {Object.entries(passEncrypted.formData)
          .filter(([, value]) => value !== undefined)
          .map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value} />
          ))}
      </form>
    )
  )
}

"use client"

import { useEffect, useRef, useState } from "react"

import useSWR from "swr"
import fetcher from "@packages/swr/fetcher"

export default function PassRequest({
  orderId,
}: Readonly<{
  orderId: string
}>) {
  const [device, setDevice] = useState<
    null | "pc" | "android" | "ios"
  >(null)

  const { data, error, isLoading } = useSWR(
    orderId && device
      ? `${process.env.NEXT_PUBLIC_API_URL}/apply/pass/encrypt?orderId=${orderId}&device=${device}`
      : null,
    fetcher,
  )

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

    if (error) {
      // eslint-disable-next-line no-alert
      window.alert(
        error || "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.",
      )

      window.close()
      window.stop()

      return
    }

    if (data) {
      formRef.current!.submit()
    }
  }, [data, error, orderId])

  return (
    orderId &&
    device &&
    !isLoading &&
    !error &&
    data && (
      <form
        ref={formRef}
        action={data.data.url}
        acceptCharset="EUC-KR"
        method="POST"
      >
        {Object.entries(data.data.formData)
          .filter(([, value]) => value !== undefined)
          .map(([key, value]) => (
            <input
              key={key}
              type="hidden"
              name={key}
              value={value as string}
            />
          ))}
      </form>
    )
  )
}

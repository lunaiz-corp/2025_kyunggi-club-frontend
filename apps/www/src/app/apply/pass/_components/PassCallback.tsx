"use client"

import { useEffect } from "react"

export default function PassCallback({
  orderId,
  data,
}: {
  orderId: string
  data: {
    res_cd: string
    res_msg: string
    user_name?: string
    phone_no?: string
    is_parent?: boolean
  }
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden"

    // eslint-disable-next-line no-console
    console.log(data, {
      type: "kcpcert:done",
      orderId,
      ...data,
    })

    if (data.res_cd !== "0000") {
      if (data.res_msg === "cancel") {
        // eslint-disable-next-line no-alert
        window.alert("본인 확인이 취소되었습니다.")
      } else {
        // eslint-disable-next-line no-alert
        window.alert(
          data.res_msg ||
            "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.",
        )
      }
    } else {
      // eslint-disable-next-line no-alert
      window.alert("성공적으로 본인 확인이 완료되었습니다.")

      const $opener = window.opener as WindowProxy
      if ($opener) {
        $opener.postMessage(
          JSON.stringify({
            type: "kcpcert:done",
            orderId,
            ...data,
          }),
          "*",
        )
      }
    }

    window.close()
    window.stop()
  }, [data, orderId])

  return null
}

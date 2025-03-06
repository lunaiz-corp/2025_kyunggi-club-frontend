/* eslint-disable import/prefer-default-export */

type PassEncrypted = {
  data: {
    res_cd: string
    res_msg: string
  }
  url: string
  formData: {
    [key: string]: string
  }
}

export async function encryptPassRequest(
  orderId: string,
  device: "pc" | "android" | "ios",
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/apply/pass/encrypt?orderId=${orderId}&device=${device}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  )

  if (!response.ok) {
    throw new Error((await response.json()).message)
  }

  return (await response.json()).data as PassEncrypted
}

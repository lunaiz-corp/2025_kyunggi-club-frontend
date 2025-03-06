/* eslint-disable import/prefer-default-export */

import { Member } from "./types/member"

export async function getList({ club }: { club: string }) {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("로그인을 해 주세요.")
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/club/${club}/members`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error((await response.json()).message)
  }

  return (await response.json()).data as Member[]
}

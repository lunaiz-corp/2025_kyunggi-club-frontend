import { Schedule } from "@packages/ui/components/schedules/types"

import { Status } from "./types/schedule"

export async function getCurrentStatus() {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("로그인을 해 주세요.")
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/status`,
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

  return (await response.json()).data as Status
}

export async function getSchedules({
  category,
}: {
  category?: "OPERATION" | "APPLICATION" | "EXAMINATION" | "INTERVIEW"
}) {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("로그인을 해 주세요.")
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/schedule${category ? `?type=${category}` : ""}`,
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

  return (await response.json()).data as Schedule[]
}

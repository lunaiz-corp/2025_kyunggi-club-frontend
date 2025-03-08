/* eslint-disable import/prefer-default-export */

import { Schedule } from "@packages/ui/components/schedules/types"

export async function getScheduleList() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/schedule`,
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

  return (await response.json()).data as Schedule[]
}

/* eslint-disable import/prefer-default-export */

import { Question } from "../types/form"

export async function getForm({ club }: { club: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/club/${club}/forms`,
    {
      method: "GET",
    },
  )

  if (!response.ok) {
    throw new Error((await response.json()).message)
  }

  return (await response.json()).data as Question[]
}

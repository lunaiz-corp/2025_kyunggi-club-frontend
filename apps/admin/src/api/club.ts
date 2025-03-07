import { Member } from "./types/member"
import { Question } from "./types/form"

export async function getMemberList({ club }: { club: string }) {
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

export async function getForm({ club }: { club: string }) {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("로그인을 해 주세요.")
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/club/${club}/forms`,
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

  return (await response.json()).data as Question[]
}

export async function getApplicationList({ club }: { club: string }) {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("로그인을 해 주세요.")
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/apply/${club}`,
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

  return (await response.json()).data
}

export async function getApplication({
  club,
  id,
}: {
  club: string
  id: string
}) {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("로그인을 해 주세요.")
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/apply/${club}/${id}`,
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

  return (await response.json()).data
}

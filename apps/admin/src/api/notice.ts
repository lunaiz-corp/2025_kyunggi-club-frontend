import type { Notice } from "./types/notice"

export async function getNoticeList({ board }: { board: string }) {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("로그인을 해 주세요.")
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/notice/${board}`,
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

  return (await response.json()).data as Notice[]
}

export async function getNotice({
  board,
  id,
}: {
  board: string
  id: string
}) {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("로그인을 해 주세요.")
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/notice/${board}/${id}`,
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

  return (await response.json()).data as Notice
}

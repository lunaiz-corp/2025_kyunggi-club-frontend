type Notice = {
  id: number
  title: string
  content: string
  createdAt: string
}

export async function getNoticeList() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/notice/www`,
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

  return (await response.json()).data as Notice[]
}

export async function getNotice({ id }: { id: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/notice/www/${id}`,
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

  return (await response.json()).data as Notice
}

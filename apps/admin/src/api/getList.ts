type Member = {
  email: string

  name: string
  phone: string

  role: string
  permission: string
}

export default async function getList({ club }: { club: string }) {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    return null
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/club/${club}/members`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    if (response.ok) {
      return (await response.json()).data as Member[]
    }

    return null
  } catch {
    return null
  }
}

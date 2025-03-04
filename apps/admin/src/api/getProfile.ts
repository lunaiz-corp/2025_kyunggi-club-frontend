export default async function getProfile() {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    return null
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    if (response.ok) {
      return (await response.json()).data
    }

    return null
  } catch {
    return null
  }
}

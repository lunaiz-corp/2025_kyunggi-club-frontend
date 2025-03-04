"use client"

import { useEffect } from "react"
import { useRouter } from "next-nprogress-bar"

import PageInitialLoading from "@/components/PageInitialLoading"

import getProfile from "@/api/getProfile"
import { useQuery } from "@tanstack/react-query"

export default function Home() {
  const router = useRouter()

  const {
    isLoading: isProfileLoading,
    error: profileError,
    data: profile,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  })

  useEffect(() => {
    ;(async () => {
      // Check the token is exist
      if (!localStorage.getItem("accessToken")) {
        router.replace("/auth/signin")
        return
      }

      // Check the token is valid
      if ((!isProfileLoading && !profile) || profileError) {
        router.replace("/auth/signin")
        return
      }

      router.replace("/dashboard/home")
    })()
  }, [isProfileLoading, profile, profileError, router])

  return <PageInitialLoading />
}

"use client"

import { useEffect } from "react"
import { useRouter } from "next-nprogress-bar"

import PageInitialLoading from "@/components/PageInitialLoading"

import { getProfile } from "@/api/profile"
import { useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"

export default function Home() {
  const router = useRouter()

  const {
    isLoading: isProfileLoading,
    error: profileError,
    data: profile,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: false,
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
        localStorage.removeItem("accessToken")

        if (profileError) {
          toast.error(
            profileError.message ||
              "서버와의 통신 중 오류가 발생했습니다.",
          )
        }

        router.replace("/auth/signin")
        return
      }

      router.replace("/dashboard/home")
    })()
  }, [isProfileLoading, profile, profileError, router])

  return <PageInitialLoading />
}

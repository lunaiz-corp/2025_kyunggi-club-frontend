"use client"

import { useEffect } from "react"
import { useRouter } from "next-nprogress-bar"

import PageInitialLoading from "@/components/PageInitialLoading"

export default function Home() {
  // TODO: Check if the user is authenticated
  // If not, redirect to the signin page
  // If authenticated, redirect to the dashboard page

  const router = useRouter()

  useEffect(() => {
    // router.replace("/auth/signin")
    router.replace("/dashboard")
  })

  return <PageInitialLoading />
}

"use client"

import { useEffect } from "react"
// import { useRouter } from "next-nprogress-bar"

import Navbar from "@/components/Navbar"

export default function DashboardLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: Check if the user is authenticated
  // If not, redirect to the signin page

  // const router = useRouter()

  useEffect(() => {
    // router.replace("/auth/signin")
  })

  return (
    <main className="flex">
      <Navbar />
      {children}
    </main>
  )
}

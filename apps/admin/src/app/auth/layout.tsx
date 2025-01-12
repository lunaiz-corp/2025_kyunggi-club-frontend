import type { Metadata } from "next"

import LoginBackground from "@/assets/images/login-background.svg"

export const metadata: Metadata = {
  title: "경기고등학교 이공계동아리연합 - 관리자 로그인",
  description: "Welcome to Next.js",
}

export default function AuthLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-dvh bg-gradient-to-b from-[#0072ff] to-ceruleanBlue-700">
      <LoginBackground className="h-dvh max-w-full object-contain" />

      <div className="absolute right-0 top-0 size-full min-h-dvh bg-zinc-900/55 shadow-md backdrop-blur-2xl lg:w-[840px] lg:rounded-l-2xl">
        {children}
      </div>
    </div>
  )
}

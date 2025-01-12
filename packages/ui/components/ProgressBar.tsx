"use client"

import { AppProgressBar as ProgressBar } from "next-nprogress-bar"

export default function ProgressBarProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}

      <ProgressBar
        height="2px"
        color="#65a3f5"
        options={{ showSpinner: false }}
      />
    </>
  )
}

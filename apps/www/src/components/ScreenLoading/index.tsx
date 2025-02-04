"use client"

import { useEffect } from "react"
import styles from "./_styles/spinner.module.css"

export default function ScreenLoading() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    })

    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <div className="absolute inset-0 top-[-90px] z-[9999] flex h-dvh w-screen items-center justify-center bg-black/60 md:top-0">
      <div className={styles.spinner} />
    </div>
  )
}

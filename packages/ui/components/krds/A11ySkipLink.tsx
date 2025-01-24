"use client"

import { ALink } from "./Link"

export default function A11ySkipLink() {
  return (
    <div className="fixed top-0 left-0 z-[10000] w-full text-center bg-gray-900">
      <ALink
        href="#main"
        className="absolute size-[1px] overflow-hidden focus:static focus:size-auto focus:overflow-visible !transition-none"
        onClick={e => {
          e.preventDefault()

          const $main = document.querySelector("main")
          if ($main) {
            $main.scrollIntoView({ behavior: "smooth" })
            $main.focus()
          }

          e.currentTarget.blur()
        }}
      >
        본문 바로가기
      </ALink>
    </div>
  )
}

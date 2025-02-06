"use client"

export default function A11ySkipLink() {
  return (
    <div className="fixed top-0 left-0 z-[10000] inline-flex w-full bg-gray-900">
      <a
        href="#main"
        className="absolute size-[1px] overflow-hidden py-1.5 text-center text-sm !transition-none focus:static focus:h-auto focus:w-full focus:overflow-visible focus:outline focus:-outline-offset-2 focus:outline-ceruleanBlue-700"
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
      </a>
    </div>
  )
}

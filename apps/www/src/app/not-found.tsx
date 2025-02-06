"use client"

import { useRef } from "react"

import { usePathname } from "next/navigation"
import { useRouter } from "next-nprogress-bar"

import { ArrowLeftIcon } from "@heroicons/react/20/solid"
import Button from "@packages/ui/components/krds/Action/Button"

export default function NotFound() {
  const pathname = usePathname()
  const router = useRouter()

  // 돌아갔는지 아닌지 확인하기 위한 '현재' 페이지의 url 저장
  const currentPathname = useRef(pathname)

  return (
    <main className="mx-auto flex h-[calc(100dvh-90px)] max-w-[1200px] items-center justify-center px-6 lg:px-0">
      <div className="flex flex-col items-center gap-16 md:flex-row">
        <div className="inline-flex flex-col items-center gap-6 md:items-start">
          <h1 className="bg-gradient-to-b from-gray-100 to-ceruleanBlue-600 bg-clip-text text-8xl font-bold text-transparent">
            404
          </h1>

          <span className="font-mono text-xl font-bold tracking-tight text-gray-100">
            NOT_FOUND
          </span>
        </div>

        <div className="h-1 w-7 rounded-full bg-gray-200 md:h-7 md:w-1" />

        <div className="flex flex-col items-center gap-12 tracking-tight md:items-start md:gap-8">
          <div className="inline-flex flex-col items-center gap-4 md:items-start">
            <span className="text-xl font-bold text-gray-100">
              어...라? 여긴 어디지..?
            </span>

            <p className="text-center text-gray-300 md:text-start">
              <span>
                찾으시는 웹페이지나 파일의 이름이 바뀌었거나,
                <br className="inline md:hidden" />
                삭제되었습니다.
                <br className="inline md:hidden" />
              </span>

              <br />

              <span>
                입력하신 페이지의 주소가 정확한지,
                <br className="inline md:hidden" />
                접근 권한이 있는지 다시 한번 확인해 주세요.
              </span>
            </p>
          </div>

          <Button
            type="button"
            className="w-fit font-bold"
            onClick={e => {
              e.preventDefault()
              currentPathname.current = pathname

              router.back()

              setTimeout(() => {
                if (currentPathname.current === pathname) {
                  router.push("/")
                }
              }, 100)
            }}
          >
            <ArrowLeftIcon className="size-5" />
            이전 페이지로 돌아가기
          </Button>
        </div>
      </div>
    </main>
  )
}

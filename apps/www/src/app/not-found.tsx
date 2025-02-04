"use client"

import { useRef } from "react"

import { usePathname } from "next/navigation"
import { useRouter } from "next-nprogress-bar"

import { ArrowLeftIcon } from "@heroicons/react/20/solid"
import Button from "@packages/ui/components/krds/Button"

export default function NotFound() {
  const pathname = usePathname()
  const router = useRouter()

  // 돌아갔는지 아닌지 확인하기 위한 '현재' 페이지의 url 저장
  const currentPathname = useRef(pathname)

  return (
    <main className="mx-auto flex h-[calc(100dvh-90px)] max-w-[1200px] items-center justify-center px-6 lg:px-0">
      <div className="flex items-center gap-16">
        <div className="inline-flex flex-col gap-6">
          <h1 className="bg-gradient-to-b from-gray-100 to-ceruleanBlue-600 bg-clip-text text-8xl font-bold text-transparent">
            404
          </h1>

          <span className="font-mono text-xl font-bold tracking-tight text-gray-100">
            NOT_FOUND
          </span>
        </div>

        <div className="h-7 w-1 rounded-full bg-gray-200" />

        <div className="flex flex-col gap-8 tracking-tight">
          <div className="inline-flex flex-col gap-4">
            <span className="text-xl font-bold text-gray-100">
              어...라? 여긴 어디지..?
            </span>

            <p className="text-gray-300">
              찾으시는 웹페이지나 파일의 이름이 바뀌었거나,
              삭제되었습니다.
              <br />
              입력하신 페이지의 주소가 정확한지, 접근 권한이 있는지
              다시 한번 확인해 주세요.
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

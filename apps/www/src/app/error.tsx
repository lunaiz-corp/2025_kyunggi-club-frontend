"use client"

import { useEffect } from "react"

import { ArrowPathIcon } from "@heroicons/react/20/solid"
import Button from "@packages/ui/components/krds/Action/Button"

export default function ErrorPage({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string }
  reset: () => void
}>) {
  useEffect(() => {
    // TODO: Log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error(error, error.digest)
  }, [error])

  return (
    <main className="mx-auto flex h-[calc(100dvh-90px)] max-w-[1200px] items-center justify-center px-6 lg:px-0">
      <div className="flex flex-col items-center gap-16 md:flex-row">
        <div className="inline-flex flex-col items-center gap-6 md:items-start">
          <h1 className="bg-gradient-to-b from-gray-100 to-ceruleanBlue-600 bg-clip-text text-8xl font-bold text-transparent">
            500
          </h1>

          <span className="font-mono text-xl font-bold tracking-tight text-gray-100">
            INTERNAL_SERVER_ERROR
          </span>
        </div>

        <div className="h-1 w-7 rounded-full bg-gray-200 md:h-7 md:w-1" />

        <div className="flex flex-col items-center gap-12 tracking-tight md:items-start md:gap-8">
          <div className="inline-flex flex-col items-center gap-4 md:items-start">
            <span className="text-xl font-bold text-gray-100">
              이런! 동아리 서류들이 바람에 날라가버렸어요...
            </span>

            <p className="text-center text-gray-300 md:text-start">
              <span>
                시스템에 문제가 발생했습니다.
                <br className="inline md:hidden" />
              </span>

              <br />

              <span>
                지금 개발자들이 열심히 서류를 주우러 전력 질주 중이니
                <br className="inline md:hidden" />
                조금만 기다려 주세요.
              </span>
            </p>
          </div>

          <Button
            type="button"
            className="w-fit font-bold"
            onClick={e => {
              e.preventDefault()
              reset()
            }}
          >
            <ArrowPathIcon className="size-5" />
            다시 시도해보기
          </Button>
        </div>
      </div>
    </main>
  )
}

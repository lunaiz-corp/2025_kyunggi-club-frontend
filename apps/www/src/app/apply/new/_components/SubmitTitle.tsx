import Link from "next/link"

import { ArrowLeftIcon } from "@heroicons/react/20/solid"
import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline"

import { Button } from "@packages/ui/components/krds/Action"
import { cn } from "@packages/ui/utils/tailwindMerge"

export default function SubmitTitle({
  submitted,
}: Readonly<{ submitted: boolean }>) {
  return (
    <div className="flex flex-col items-center gap-12">
      <div
        className={cn(
          "rounded-3xl p-8",
          !submitted ? "bg-gray-900" : "bg-ceruleanBlue-700",
        )}
      >
        {!submitted ? (
          <ClockIcon className="size-16" />
        ) : (
          <CheckIcon className="size-16" />
        )}
      </div>

      {!submitted ? (
        <div className="inline-flex flex-col justify-center gap-8 text-center">
          <h1 className="text-4xl font-bold">
            지원서를 제출 중입니다.
          </h1>

          <div className="inline-flex flex-col justify-center gap-3">
            <span className="text-lg">잠시만 기다려 주세요.</span>
          </div>
        </div>
      ) : (
        <div className="inline-flex flex-col justify-center gap-8 text-center">
          <h1 className="text-4xl font-bold">
            지원서 제출이 완료되었습니다.
          </h1>

          <div className="inline-flex flex-col justify-center gap-3">
            <span className="text-lg">
              접수 번호 등 추후 단계 진행을 위한 정보를 알림톡으로
              발송해 드렸습니다.
            </span>
            <span className="text-lg">
              알림톡 수신을 못하셨거나, 문의 사항이 있으시면
              고객센터로 언제든지 문의해 주세요.
            </span>
          </div>
        </div>
      )}

      {submitted && (
        <Link href="/">
          <Button type="button">
            <ArrowLeftIcon className="size-5" />
            메인 페이지로 가기
          </Button>
        </Link>
      )}
    </div>
  )
}

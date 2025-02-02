import { ArrowRightIcon } from "@heroicons/react/20/solid"

import Button from "@packages/ui/components/krds/Button"

import type { ApplyBaseContext } from "."
import TitleBar from "../_components/TitleBar"

// 2. 약관 동의 완료 - 인적 사항 입력 중
export type ApplyStep2 = ApplyBaseContext & {
  agreedTerms: number[]
}

type DataNeedsToBeFilled = {
  userInfo: {
    id: number // 학번
    name: string // 이름
    verifiedRefId: string // 전화번호, CI 등을 서버에서 참조할 수 있는 refId
    isVerifiedPhoneIsParent: boolean // 전화번호가 본인 또는 부모님 전화번호인지 여부 (default: false)
  }
  parentInfo: {
    name: string // 부모님 이름
    relationship: string // 학생 간 관계
    phone: string // 부모님 전화번호
  }
  applingClubs: string[] // 학생 지망 동아리
}

export default function ApplyNewFunnelStep2({
  onNext,
}: Readonly<{
  onNext: (data: DataNeedsToBeFilled) => void
}>) {
  return (
    <div className="flex flex-col gap-19">
      <TitleBar title="인적사항을 입력해주세요." />

      <form
        className="flex flex-col gap-6"
        onSubmit={e => {
          e.preventDefault()
          onNext({
            userInfo: {
              id: 0,
              name: "",
              verifiedRefId: "010-1234-5678",
              isVerifiedPhoneIsParent: false,
            },
            parentInfo: {
              name: "",
              relationship: "",
              phone: "010-1234-5678",
            },
            applingClubs: ["", "", ""],
          })
        }}
      >
        <div className="h-0.5 bg-gray-900" />
        <div className="h-0.5 bg-gray-900" />
        <div className="h-0.5 bg-gray-900" />
        <div className="h-0.5 bg-gray-900" />

        <Button type="submit" className="font-bold">
          다음 <ArrowRightIcon className="size-5" />
        </Button>
      </form>
    </div>
  )
}

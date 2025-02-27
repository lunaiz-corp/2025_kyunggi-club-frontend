"use client"

import { PencilIcon } from "@heroicons/react/24/solid"
import { Button } from "@packages/ui/components/krds/Action"

import TitleBar from "../common/TitleBar"

const title = {
  OPERATION: "운영 일정 관리",
  APPLICATION: "모집 일정 관리",
  EXAMINATION: "지필 일정 관리",
  INTERVIEW: "면접 일정 관리",
}

export default function TitleBarWithButton({
  type,
  createOrModify,
}: Readonly<{
  type: "OPERATION" | "APPLICATION" | "EXAMINATION" | "INTERVIEW"
  createOrModify: () => Promise<void>
}>) {
  return (
    <div className="flex items-center justify-between">
      <TitleBar category="일정 관리" title={title[type]} />

      <Button
        type="button"
        className="mt-5 border-gray-100 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:outline-gray-100 active:bg-gray-200 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-300"
        onClick={createOrModify}
      >
        <PencilIcon className="size-4 fill-gray-900" />
        <span className="text-gray-900">새로 만들기</span>
      </Button>
    </div>
  )
}

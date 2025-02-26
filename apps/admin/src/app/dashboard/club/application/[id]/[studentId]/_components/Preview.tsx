"use client"

import { useState } from "react"

import {
  ChatBubbleOvalLeftEllipsisIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/solid"

import {
  CheckIcon,
  XMarkIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline"

import { Button, NextLink } from "@packages/ui/components/krds/Action"
import { cn } from "@packages/ui/utils/tailwindMerge"

import { SubmittedForm } from "../../_components/types"

import actionRowStyle from "./_styles/actionrow.module.css"

import PersonalInfoPreview from "./PersonalInfoPreview"
import FormPreview from "./FormPreview"

function ActionRows() {
  return (
    <div className={actionRowStyle.staticActionRow}>
      <Button
        type="button"
        className="border-gray-100 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:outline-gray-100 active:bg-gray-200 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-300"
      >
        <NewspaperIcon className="size-5 fill-gray-900" />
        <span className="text-gray-900">지원서 다운로드</span>
      </Button>

      <Button
        type="button"
        className="border-ceruleanBlue-600 bg-ceruleanBlue-600 hover:bg-ceruleanBlue-700 focus:bg-ceruleanBlue-700 focus:outline-ceruleanBlue-700 active:bg-ceruleanBlue-700 disabled:cursor-not-allowed disabled:border-ceruleanBlue-700 disabled:bg-ceruleanBlue-800"
      >
        <ChatBubbleOvalLeftEllipsisIcon className="size-5 fill-gray-100" />
        <span className="text-gray-100">알림톡 발송</span>
      </Button>

      <Button
        type="button"
        className="border-success-400 bg-success-400 hover:bg-success-500 focus:bg-success-500 focus:outline-success-500 active:bg-success-500 disabled:cursor-not-allowed disabled:border-success-500 disabled:bg-success-600"
      >
        <CheckIcon className="size-5 stroke-gray-100" />
        <span className="text-gray-100">합격 처리</span>
      </Button>

      <Button
        type="button"
        className="border-point-500 bg-point-500 hover:bg-point-600 focus:bg-point-600 focus:outline-point-600 active:bg-point-600 disabled:cursor-not-allowed disabled:border-point-600 disabled:bg-point-700"
      >
        <XMarkIcon className="size-5 stroke-gray-100" />
        <span className="text-gray-100">불합격 처리</span>
      </Button>
    </div>
  )
}

export default function Preview({
  club,
  form,
}: Readonly<{
  club: {
    id: string
    name: string
  }
  form: SubmittedForm
}>) {
  const [type, setType] = useState<"PERSONAL_INFO" | "FORM">(
    "PERSONAL_INFO",
  )

  return (
    <>
      <div className="mt-5 inline-flex flex-col gap-4">
        <span className="text-xl text-gray-400">
          동아리 관리 / 접수된 지원서 목록
        </span>

        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <NextLink
              href={`/dashboard/club/application/${club.id}`}
              className="p-1.5"
            >
              <ChevronLeftIcon className="size-5" />
            </NextLink>

            <div className="text-gray-10 text-3xl font-bold">
              {form.userInfo.name}
            </div>
          </div>

          <div className="flex shrink-0 gap-3 rounded-xl bg-gray-700 px-3 py-2">
            <button
              onClick={() => setType("PERSONAL_INFO")}
              type="button"
              className={cn(
                "inline-flex cursor-pointer items-center justify-center rounded-xl bg-gray-700 px-4 py-1.5 hover:bg-gray-600",
                type === "PERSONAL_INFO" && "bg-gray-600",
              )}
            >
              <span className="font-bold">개인 정보</span>
            </button>

            <button
              onClick={() => setType("FORM")}
              type="button"
              className={cn(
                "inline-flex cursor-pointer items-center justify-center rounded-xl bg-gray-700 px-4 py-1.5 hover:bg-gray-600",
                type === "FORM" && "bg-gray-600",
              )}
            >
              <span className="font-bold">지원서</span>
            </button>
          </div>
        </div>
      </div>

      {type === "PERSONAL_INFO" && (
        <PersonalInfoPreview
          form={{
            userInfo: form.userInfo,
            parentInfo: form.parentInfo,
          }}
        />
      )}

      {type === "FORM" && <FormPreview club={club.id} form={form} />}

      <ActionRows />
    </>
  )
}

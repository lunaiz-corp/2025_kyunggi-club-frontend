"use client"

import { overlay } from "overlay-kit"

import { PencilIcon } from "@heroicons/react/24/solid"

import { Button } from "@packages/ui/components/krds/Action"

import TitleBar from "../common/TitleBar"
import ModifyModal from "./ModifyModal"
import { Preset } from "./types"

export default function TitleBarWithButton({
  type,
}: Readonly<{
  type: "OPERATION" | "APPLICATION" | "EXAMINATION" | "INTERVIEW"
}>) {
  const title = {
    OPERATION: "운영 일정 관리",
    APPLICATION: "모집 일정 관리",
    EXAMINATION: "지필 일정 관리",
    INTERVIEW: "면접 일정 관리",
  }

  const allowedTypes = {
    OPERATION: new Set([
      Preset.OPERATION_START,
      Preset.OPERATION_PRESTART,
      Preset.OPERATION_MAINTENANCE_START,
      Preset.OPERATION_MAINTENANCE_END,
    ]),
    APPLICATION: new Set([
      Preset.APPLICATION_START,
      Preset.APPLICATION_END,
    ]),
    EXAMINATION: new Set([Preset.ETC]),
    INTERVIEW: new Set([Preset.ETC]),
  }

  return (
    <div className="flex items-center justify-between">
      <TitleBar category="일정 관리" title={title[type]} />

      <Button
        type="button"
        className="mt-5 border-gray-100 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:outline-gray-100 active:bg-gray-200 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-300"
        onClick={() => {
          overlay.open(({ isOpen, close, unmount }) => {
            return (
              <ModifyModal
                isOpen={isOpen}
                close={() => {
                  close()
                  setTimeout(unmount, 200)
                }}
                allowedTypes={allowedTypes[type]}
              />
            )
          })
        }}
      >
        <PencilIcon className="size-4 fill-gray-900" />
        <span className="text-gray-900">새로 만들기</span>
      </Button>
    </div>
  )
}

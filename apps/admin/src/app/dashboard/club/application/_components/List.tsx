"use client"

import { useState } from "react"

import {
  CheckIcon,
  ClockIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"

import { Button } from "@packages/ui/components/krds/Action"
import { TextInput } from "@packages/ui/components/krds/Input"
import Checkbox from "@packages/ui/components/Checkbox"

import { CurrentStatus, statusInText, SubmittedForm } from "./types"

const MOCK_LIST: {
  [key: string]: SubmittedForm["userInfo"][]
} = {
  [CurrentStatus.PASSED]: [
    {
      id: "12345",
      name: "홍길동",
    },
  ],
  [CurrentStatus.WAITING]: [
    {
      id: "12345",
      name: "홍길동",
    },
  ],
  [CurrentStatus.REJECTED]: [
    {
      id: "12345",
      name: "홍길동",
    },
  ],
  [CurrentStatus.FINAL_SUBMISSION]: [
    {
      id: "12345",
      name: "홍길동",
    },
  ],
}

export default function List() {
  const [searchInput, setSearchInput] = useState("")

  return (
    <>
      <form
        className="flex items-center gap-4"
        onSubmit={e => {
          e.preventDefault()

          // eslint-disable-next-line no-console
          console.log("submit")
        }}
      >
        <TextInput
          type="text"
          placeholder="학번을 입력하여 지원서 검색"
          className="w-full flex-1 px-4 py-3 font-bold"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />

        <Button type="submit" className="px-4 py-3">
          <MagnifyingGlassIcon className="size-4" />
          검색
        </Button>
      </form>

      {Object.entries(MOCK_LIST).map(([status, list]) => (
        <div key={status} className="flex flex-col gap-5">
          <h3 className="text-3xl font-bold text-gray-200">
            {statusInText[status as CurrentStatus]}
          </h3>

          <span>{JSON.stringify(list)}</span>

          {list.map(student => (
            <div
              key={student.id}
              className="flex items-center gap-5 rounded-xl bg-gray-800 p-5"
            >
              <div className="flex size-6 items-center justify-center p-1">
                <Checkbox id={student.id} />
              </div>

              <div className="flex flex-col gap-2">
                <div className="inline-flex gap-2">
                  {status === CurrentStatus.PASSED && (
                    <div className="flex size-5 items-center justify-center rounded-sm bg-ceruleanBlue-600">
                      <CheckIcon className="size-3" />
                    </div>
                  )}

                  {status === CurrentStatus.WAITING && (
                    <div className="flex size-5 items-center justify-center rounded-sm bg-warning-300">
                      <ClockIcon className="size-3" />
                    </div>
                  )}

                  {status === CurrentStatus.REJECTED && (
                    <div className="flex size-5 items-center justify-center rounded-sm bg-point-500">
                      <XMarkIcon className="size-3" />
                    </div>
                  )}

                  {status === CurrentStatus.FINAL_SUBMISSION && (
                    <div className="flex size-5 items-center justify-center rounded-sm bg-success-400">
                      <CheckIcon className="size-3" />
                    </div>
                  )}

                  <span className="text-sm">
                    {statusInText[status as CurrentStatus]}
                  </span>
                </div>

                <span className="text-2xl font-bold">
                  {student.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

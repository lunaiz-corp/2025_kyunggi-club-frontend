"use client"

import { useEffect, useRef, useState } from "react"

import {
  CheckIcon,
  ClockIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"

import { Button } from "@packages/ui/components/krds/Action"
import { TextInput } from "@packages/ui/components/krds/Input"
import Checkbox from "@packages/ui/components/Checkbox"

import { cn } from "@packages/ui/utils/tailwindMerge"

import { CurrentStatus, statusInText, SubmittedForm } from "./types"

const MOCK_LIST: {
  [key: string]: SubmittedForm["userInfo"][]
} = {
  [CurrentStatus.PASSED]: [
    {
      id: "12345",
      name: "홍길동",
    },
    {
      id: "23456",
      name: "홍길동",
    },
  ],
  [CurrentStatus.WAITING]: [
    {
      id: "12345",
      name: "홍길동",
    },
    {
      id: "23456",
      name: "홍길동",
    },
  ],
  [CurrentStatus.REJECTED]: [
    {
      id: "12345",
      name: "홍길동",
    },
    {
      id: "23456",
      name: "홍길동",
    },
  ],
  [CurrentStatus.FINAL_SUBMISSION]: [
    {
      id: "12345",
      name: "홍길동",
    },
    {
      id: "23456",
      name: "홍길동",
    },
  ],
}

function ActionRows({
  checkedItems,
}: Readonly<{
  checkedItems: Set<SubmittedForm["userInfo"]>
}>) {
  type TAnimation = "fadeInUp" | "fadeOutDown"

  const [itemsSize, setItemsSize] = useState<number>(-1)
  const [animation, setAnimation] =
    useState<TAnimation>("fadeOutDown")

  useEffect(() => {
    if (!checkedItems.size) {
      setItemsSize(0)
      setAnimation("fadeOutDown")
    } else {
      setItemsSize(checkedItems.size)
      setAnimation("fadeInUp")
    }
  }, [checkedItems, itemsSize])

  return (
    <div
      className={cn(
        "fixed bottom-1/50 left-1/2 flex transform-[translate(-50%,30px)] gap-4 rounded-md bg-gray-700/25 px-8 py-4 opacity-0 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.25)] backdrop-blur-lg",
        animation === "fadeInUp"
          ? "animate-[fadeInUp_0.5s_forwards]"
          : "animate-[fadeOutDown_0.5s_forwards]",
      )}
    >
      aaaa
    </div>
  )
}

export default function List() {
  const [searchInput, setSearchInput] = useState("")
  const [filteredList, setFilteredList] = useState<{
    [key: string]: SubmittedForm["userInfo"][]
  }>()
  const [selectedList, setSelectedList] = useState<
    SubmittedForm["userInfo"][]
  >([])

  useEffect(() => {
    setFilteredList(MOCK_LIST)
  }, [])

  const handleSearch = () => {
    if (searchInput) {
      const result = Object.fromEntries(
        Object.entries(MOCK_LIST).map(([status, userList]) => [
          status,
          userList.filter(user => user.id.includes(searchInput)),
        ]),
      )

      setFilteredList(result)
    } else {
      setFilteredList(MOCK_LIST)
    }
  }

  return (
    <>
      <form
        className="flex items-center gap-4"
        onSubmit={e => {
          e.preventDefault()
          handleSearch()
        }}
      >
        <TextInput
          type="text"
          placeholder="학번을 입력하여 지원서 검색"
          className="w-full flex-1 px-4 py-3 font-bold"
          maxLength={5}
          pattern="\d{5}"
          value={searchInput}
          onChange={e => {
            // Non-number characters are not allowed
            if (!/^\d*$/.test(e.target.value)) return

            setSearchInput(e.target.value)
          }}
        />

        <Button type="submit" className="px-4 py-3">
          <MagnifyingGlassIcon className="size-4" />
          검색
        </Button>
      </form>

      {Object.entries(filteredList || {}).map(([status, list]) => (
        <div key={status} className="flex flex-col gap-6">
          <h3 className="text-2xl font-bold text-gray-100">
            {statusInText[status as CurrentStatus]}
          </h3>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-4">
            {list.map(student => (
              <div
                key={student.id}
                className="flex items-center gap-5 rounded-xl bg-gray-800 p-5"
              >
                <div className="flex size-6 items-center justify-center p-1">
                  <Checkbox
                    id={student.id}
                    onChange={e => {
                      if (e.target.checked) {
                        setSelectedList(selected => [
                          ...selected,
                          student,
                        ])
                      } else {
                        setSelectedList(selected =>
                          selected.filter(x => x.id === student.id),
                        )
                      }
                    }}
                  />
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
        </div>
      ))}

      <ActionRows checkedItems={new Set(selectedList)} />
    </>
  )
}

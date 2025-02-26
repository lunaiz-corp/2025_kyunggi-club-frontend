"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

import {
  CheckIcon,
  ClockIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline"

import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid"

import { Button } from "@packages/ui/components/krds/Action"
import { TextInput } from "@packages/ui/components/krds/Input"
import Checkbox from "@packages/ui/components/Checkbox"

import { cn } from "@packages/ui/utils/tailwindMerge"

import {
  CurrentStatus,
  statusInText,
  SubmittedFormForList,
} from "./types"

import actionRowStyle from "./_styles/actionrow.module.css"

const MOCK_LIST: {
  [key: string]: SubmittedFormForList["userInfo"][]
} = {
  [CurrentStatus.PASSED]: [
    {
      id: 12345,
      name: "홍길동",
    },
    {
      id: 23456,
      name: "홍길동",
    },
  ],
  [CurrentStatus.WAITING]: [
    {
      id: 34567,
      name: "홍길동",
    },
    {
      id: 45678,
      name: "홍길동",
    },
  ],
  [CurrentStatus.REJECTED]: [
    {
      id: 56789,
      name: "홍길동",
    },
    {
      id: 67890,
      name: "홍길동",
    },
  ],
  [CurrentStatus.FINAL_SUBMISSION]: [
    {
      id: 78901,
      name: "홍길동",
    },
    {
      id: 89012,
      name: "홍길동",
    },
  ],
}

function ActionRows({
  checkedItems,
}: Readonly<{
  checkedItems: Set<SubmittedFormForList["userInfo"]>
}>) {
  type TAnimation = "fadeInUp" | "fadeOutDown" | "none"

  const prevSelectedItemsRef = useRef(checkedItems.size)
  const [itemsSize, setItemsSize] = useState<number>(-1)
  const [animation, setAnimation] = useState<TAnimation>("none")

  useEffect(() => {
    if (!checkedItems.size) {
      if (itemsSize === -1) {
        setAnimation("none")
      } else {
        setItemsSize(prevSelectedItemsRef.current)
        setAnimation("fadeOutDown")
      }
    } else {
      setItemsSize(checkedItems.size)
      setAnimation("fadeInUp")
    }

    prevSelectedItemsRef.current = checkedItems.size
  }, [checkedItems, itemsSize])

  return (
    <div
      className={cn(
        actionRowStyle.actionRow,
        actionRowStyle[animation] ?? "",
      )}
    >
      <span className="font-bold">
        {itemsSize.toLocaleString("ko-KR")}개 선택
      </span>

      <div className="h-3.5 w-0.5 rounded-full bg-gray-600" />

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

export default function List() {
  const [searchInput, setSearchInput] = useState("")
  const [filteredList, setFilteredList] = useState<{
    [key: string]: SubmittedFormForList["userInfo"][]
  }>()
  const [selectedList, setSelectedList] = useState<
    SubmittedFormForList["userInfo"][]
  >([])

  useEffect(() => {
    setFilteredList(MOCK_LIST)
  }, [])

  const handleSearch = () => {
    if (searchInput) {
      const result = Object.fromEntries(
        Object.entries(MOCK_LIST).map(([status, userList]) => [
          status,
          userList.filter(user => user.id === Number(searchInput)),
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
                    id={student.id.toString()}
                    onChange={e => {
                      if (e.target.checked) {
                        setSelectedList(selected => [
                          ...selected,
                          student,
                        ])
                      } else {
                        setSelectedList(selected =>
                          selected.filter(x => x.id !== student.id),
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

                  <Link
                    href={`/dashboard/club/application/list/${student.id}`}
                  >
                    <span className="text-2xl font-bold">
                      {student.name}
                    </span>
                  </Link>
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

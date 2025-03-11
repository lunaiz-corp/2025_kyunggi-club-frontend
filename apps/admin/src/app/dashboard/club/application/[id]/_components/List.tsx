"use client"

import {
  useEffect,
  // useRef,
  useState,
} from "react"
import toast from "react-hot-toast"

import { useRouter } from "next-nprogress-bar"
import Link from "next/link"

import { useQuery } from "@tanstack/react-query"
import { getApplicationList } from "@/api/club"

import {
  CheckIcon,
  ClockIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  // NewspaperIcon,
} from "@heroicons/react/24/outline"

// import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid"

import { Button } from "@packages/ui/components/krds/Action"
import { TextInput } from "@packages/ui/components/krds/Input"
import Checkbox from "@packages/ui/components/Checkbox"

// import { cn } from "@packages/ui/utils/tailwindMerge"

import * as clubsJson from "@/data/clubs.json"

import {
  CurrentStatus,
  type SubmittedFormForList,
} from "@/api/types/application"
import { statusInText } from "./types"

// import actionRowStyle from "./_styles/actionrow.module.css"

const { clubs } = clubsJson

// function ActionRows({
//   checkedItems,
// }: Readonly<{
//   checkedItems: Set<
//     Pick<SubmittedFormForList, "userInfo" | "applingClubs">
//   >
// }>) {
//   type TAnimation = "fadeInUp" | "fadeOutDown" | "none"

//   const prevSelectedItemsRef = useRef(checkedItems.size)
//   const [itemsSize, setItemsSize] = useState<number>(-1)
//   const [animation, setAnimation] = useState<TAnimation>("none")

//   useEffect(() => {
//     if (!checkedItems.size) {
//       if (itemsSize === -1) {
//         setAnimation("none")
//       } else {
//         setItemsSize(prevSelectedItemsRef.current)
//         setAnimation("fadeOutDown")
//       }
//     } else {
//       setItemsSize(checkedItems.size)
//       setAnimation("fadeInUp")
//     }

//     prevSelectedItemsRef.current = checkedItems.size
//   }, [checkedItems, itemsSize])

//   return (
//     <div
//       className={cn(
//         actionRowStyle.actionRow,
//         actionRowStyle[animation] ?? "",
//       )}
//     >
//       <span className="font-bold">
//         {itemsSize.toLocaleString("ko-KR")}개 선택
//       </span>

//       <div className="h-3.5 w-0.5 rounded-full bg-gray-600" />

//       <Button
//         type="button"
//         className="border-gray-100 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:outline-gray-100 active:bg-gray-200 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-300"
//       >
//         <NewspaperIcon className="size-5 fill-gray-900" />
//         <span className="text-gray-900">지원서 다운로드</span>
//       </Button>

//       <Button
//         type="button"
//         className="border-ceruleanBlue-600 bg-ceruleanBlue-600 hover:bg-ceruleanBlue-700 focus:bg-ceruleanBlue-700 focus:outline-ceruleanBlue-700 active:bg-ceruleanBlue-700 disabled:cursor-not-allowed disabled:border-ceruleanBlue-700 disabled:bg-ceruleanBlue-800"
//       >
//         <ChatBubbleOvalLeftEllipsisIcon className="size-5 fill-gray-100" />
//         <span className="text-gray-100">알림톡 발송</span>
//       </Button>

//       <Button
//         type="button"
//         className="border-success-400 bg-success-400 hover:bg-success-500 focus:bg-success-500 focus:outline-success-500 active:bg-success-500 disabled:cursor-not-allowed disabled:border-success-500 disabled:bg-success-600"
//       >
//         <CheckIcon className="size-5 stroke-gray-100" />
//         <span className="text-gray-100">합격 처리</span>
//       </Button>

//       <Button
//         type="button"
//         className="border-point-500 bg-point-500 hover:bg-point-600 focus:bg-point-600 focus:outline-point-600 active:bg-point-600 disabled:cursor-not-allowed disabled:border-point-600 disabled:bg-point-700"
//       >
//         <XMarkIcon className="size-5 stroke-gray-100" />
//         <span className="text-gray-100">불합격 처리</span>
//       </Button>
//     </div>
//   )
// }

export default function List({ club }: Readonly<{ club: string }>) {
  const [searchInput, setSearchInput] = useState("")
  const [filteredList, setFilteredList] = useState<{
    [key: string]: Pick<
      SubmittedFormForList,
      "userInfo" | "applingClubs"
    >[]
  }>()
  const [selectedList, setSelectedList] = useState<
    Pick<SubmittedFormForList, "userInfo" | "applingClubs">[]
  >([])

  const router = useRouter()

  const { error, data: applications } = useQuery({
    queryKey: ["applications"],
    queryFn: () => getApplicationList({ club }),
    retry: false,
  })

  useEffect(() => {
    if (error) {
      toast.error(
        error.message || "서버와의 통신 중 오류가 발생했습니다.",
      )
      router.push("/dashboard/home")
    }

    if (applications) {
      setFilteredList(applications)
    }
  }, [error, applications, router])

  const handleSearch = () => {
    if (searchInput && applications) {
      const result = Object.fromEntries(
        Object.entries(applications).map(([status, list]) => [
          status,
          list.filter(
            application =>
              application.userInfo.id === Number(searchInput),
          ),
        ]),
      )

      setFilteredList(result)
    } else {
      setFilteredList(applications)
    }
  }

  return (
    <>
      <form
        className="flex items-center gap-4"
        onSubmit={e => {
          e.preventDefault()

          setSelectedList([])
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
          <div className="flex items-center gap-4">
            <Checkbox
              id={`checkbox-${status}`}
              checked={
                // when all items in this status are selected
                list.every(x =>
                  selectedList.some(
                    y => y.userInfo.id === x.userInfo.id,
                  ),
                )
              }
              onChange={
                // toggle all items in this status
                e => {
                  const { checked } = e.target

                  if (checked) {
                    setSelectedList(selected => [
                      ...selected,
                      ...list.filter(
                        x =>
                          !selected.some(
                            y => y.userInfo.id === x.userInfo.id,
                          ),
                      ),
                    ])
                  } else {
                    setSelectedList(selected =>
                      selected.filter(
                        x =>
                          !list.some(
                            y => y.userInfo.id === x.userInfo.id,
                          ),
                      ),
                    )
                  }
                }
              }
            />
            <h3 className="text-2xl font-bold">
              {statusInText[status as CurrentStatus]}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {list.map(student => (
              <div
                key={student.userInfo.id}
                className="flex items-center gap-5 rounded-xl bg-gray-800 p-5"
              >
                <div className="flex size-6 items-center justify-center p-1">
                  <Checkbox
                    id={student.userInfo.id.toString()}
                    checked={selectedList.some(
                      x => x.userInfo.id === student.userInfo.id,
                    )}
                    onChange={e => {
                      if (e.target.checked) {
                        setSelectedList(selected => [
                          ...selected,
                          student,
                        ])
                      } else {
                        setSelectedList(selected =>
                          selected.filter(
                            x =>
                              x.userInfo.id !== student.userInfo.id,
                          ),
                        )
                      }
                    }}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <div className="inline-flex gap-2">
                    {[
                      CurrentStatus.DOCUMENT_PASSED,
                      CurrentStatus.EXAM_PASSED,
                      CurrentStatus.INTERVIEW_PASSED,
                    ].includes(status as CurrentStatus) && (
                      <div className="flex size-5 items-center justify-center rounded-sm bg-ceruleanBlue-600">
                        <CheckIcon className="size-3" />
                      </div>
                    )}

                    {[
                      CurrentStatus.WAITING,
                      CurrentStatus.FINAL_SUBMISSION,
                    ].includes(status as CurrentStatus) && (
                      <div className="flex size-5 items-center justify-center rounded-sm bg-warning-300">
                        <ClockIcon className="size-3" />
                      </div>
                    )}

                    {[
                      CurrentStatus.DOCUMENT_REJECTED,
                      CurrentStatus.EXAM_REJECTED,
                      CurrentStatus.INTERVIEW_REJECTED,
                      CurrentStatus.FINAL_REJECTED,
                    ].includes(status as CurrentStatus) && (
                      <div className="flex size-5 items-center justify-center rounded-sm bg-point-500">
                        <XMarkIcon className="size-3" />
                      </div>
                    )}

                    {status === CurrentStatus.FINAL_REJECTED && (
                      <div className="flex size-5 items-center justify-center rounded-sm bg-success-400">
                        <CheckIcon className="size-3" />
                      </div>
                    )}

                    <span className="text-sm">
                      {statusInText[status as CurrentStatus]}
                    </span>
                  </div>

                  <Link
                    href={`/dashboard/club/application/${club}/${student.userInfo.id}`}
                  >
                    <span className="text-2xl font-bold">
                      {student.userInfo.name}
                    </span>
                  </Link>

                  <div className="inline-flex gap-2">
                    {student.applingClubs.map(applingClub => (
                      <div
                        key={`${student.userInfo.id}-${applingClub}`}
                        className="rounded-md bg-gray-700 px-2.5 py-0.5"
                      >
                        <span className="text-xs">
                          {
                            clubs
                              .find(x => x.id === applingClub)!
                              .name.split(" ")[1]
                          }
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* <ActionRows checkedItems={new Set(selectedList)} /> */}
    </>
  )
}

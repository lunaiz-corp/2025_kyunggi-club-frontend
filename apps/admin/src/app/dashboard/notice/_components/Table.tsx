"use client"

import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import { TrashIcon } from "@heroicons/react/24/outline"

import { useQuery } from "@tanstack/react-query"
import { getNoticeList } from "@/api/notice"

import { Button, NextLink } from "@packages/ui/components/krds/Action"
import Checkbox from "@packages/ui/components/Checkbox"

export default function NoticeListTable({
  board,
}: Readonly<{
  board: "www" | "admin"
}>) {
  const {
    isLoading: isListLoading,
    error: listError,
    data: list,
  } = useQuery({
    queryKey: ["notice", board],
    queryFn: () => getNoticeList({ board }),
    retry: false,
  })

  useEffect(() => {
    if (listError) {
      toast.error(
        listError.message || "서버와의 통신 중 오류가 발생했습니다.",
      )
    }
  }, [listError])

  const [checkedNotices, setCheckedNotices] = useState<number[]>([])

  return (
    <div className="flex flex-col gap-12">
      <div className="w-full overflow-x-auto">
        {!isListLoading && !listError && list && (
          <table className="w-max border-collapse border-spacing-x-12 border-b border-gray-700 lg:w-full">
            <thead className="h-10 border-b border-gray-500 align-top">
              <tr>
                <th
                  scope="col"
                  className="sticky left-0 w-[18px] bg-gray-900 pr-7 pl-1"
                >
                  <Checkbox
                    id="toggle-all"
                    checked={
                      checkedNotices.length > 0 &&
                      checkedNotices.length === list.length
                    }
                    onChange={e => {
                      const { checked } = e.target

                      if (checked) {
                        setCheckedNotices([
                          ...checkedNotices,
                          ...[...list.map(x => x.id)].filter(
                            id => !checkedNotices.includes(id),
                          ),
                        ])
                      } else {
                        setCheckedNotices([])
                      }
                    }}
                  />
                </th>

                <th scope="col" className="w-auto pr-7 text-start">
                  제목
                </th>

                <th scope="col" className="w-64 text-right">
                  작성일
                </th>
              </tr>
            </thead>

            <tbody>
              {(list || []).map(x => (
                <tr key={x.id}>
                  <td className="sticky left-0 w-[18px] bg-gray-900 py-6 pr-7 pl-1">
                    <Checkbox
                      id={`toggle-${x.id}`}
                      checked={checkedNotices.includes(x.id)}
                      onChange={e => {
                        const { checked } = e.target

                        if (checked) {
                          setCheckedNotices([...checkedNotices, x.id])
                        } else {
                          setCheckedNotices(
                            checkedNotices.filter(id => id !== x.id),
                          )
                        }
                      }}
                    />
                  </td>

                  <td className="w-auto py-6 pr-7 text-start text-2xl font-bold">
                    <NextLink
                      href={
                        board === "www"
                          ? `/dashboard/notice/${x.id}`
                          : `/dashboard/common-notice/${x.id}`
                      }
                    >
                      {x.title}
                    </NextLink>
                  </td>

                  <td className="w-64 py-6 text-right text-sm text-gray-300">
                    {new Date(x.createdAt).toLocaleString("ko-KR", {
                      timeZone: "Asia/Seoul",

                      year: "numeric",
                      month: "long",
                      day: "numeric",

                      hourCycle: "h24",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Button
        type="button"
        className="w-fit border-point-500 bg-point-500 hover:bg-point-400 focus:bg-point-400 focus:outline-point-500 active:bg-point-400 disabled:cursor-not-allowed disabled:border-point-700 disabled:bg-point-700"
        disabled={checkedNotices.length <= 0}
        onClick={async () => {
          let failed = 0

          checkedNotices.forEach(async id => {
            const deleteRequest = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/notice/${board}/${id}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
              },
            )

            const deleteResponse = await deleteRequest.json()
            if (!deleteRequest.ok) {
              failed += 1

              // eslint-disable-next-line no-console
              console.error(deleteResponse)
            }
          })

          if (failed === 0) {
            toast.success("선택한 항목을 모두 삭제했습니다.")
          } else {
            toast.error(
              `선택한 항목 중 ${failed}개를 삭제하지 못했습니다.`,
            )
          }
        }}
      >
        <TrashIcon className="size-5 stroke-gray-100 stroke-2" />
        <span className="text-gray-100">선택한 항목 삭제</span>
      </Button>
    </div>
  )
}

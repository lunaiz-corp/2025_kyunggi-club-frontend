"use client"

import { useState } from "react"

import { TrashIcon } from "@heroicons/react/24/outline"

import { Button, NextLink } from "@packages/ui/components/krds/Action"
import Checkbox from "@packages/ui/components/Checkbox"

export default function NoticeListTable() {
  const [checkedNotices, setCheckedNotices] = useState<number[]>([])

  return (
    <div className="flex flex-col gap-12">
      <div className="w-full overflow-x-auto">
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
                    // TODO: checkedNotices.length === notices.length
                    checkedNotices.length === 2
                  }
                  onChange={e => {
                    const { checked } = e.target

                    if (checked) {
                      setCheckedNotices([
                        ...checkedNotices,
                        ...[1, 2],
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
            <tr>
              <td className="sticky left-0 w-[18px] bg-gray-900 py-6 pr-7 pl-1">
                <Checkbox
                  id="toggle-1"
                  checked={checkedNotices.includes(1)}
                  onChange={e => {
                    const { checked } = e.target

                    if (checked) {
                      setCheckedNotices([...checkedNotices, 1])
                    } else {
                      setCheckedNotices(
                        checkedNotices.filter(id => id !== 1),
                      )
                    }
                  }}
                />
              </td>

              <td className="w-auto py-6 pr-7 text-start text-2xl font-bold">
                <NextLink href="/dashboard/notice/1">Title</NextLink>
              </td>

              <td className="w-64 py-6 text-right text-sm text-gray-300">
                2025년 1월 21일 00:05:08
              </td>
            </tr>

            <tr>
              <td className="sticky left-0 w-[18px] bg-gray-900 py-6 pr-7 pl-1">
                <Checkbox
                  id="toggle-2"
                  checked={checkedNotices.includes(2)}
                  onChange={e => {
                    const { checked } = e.target

                    if (checked) {
                      setCheckedNotices([...checkedNotices, 2])
                    } else {
                      setCheckedNotices(
                        checkedNotices.filter(id => id !== 2),
                      )
                    }
                  }}
                />
              </td>

              <td className="w-auto py-6 pr-7 text-start text-2xl font-bold">
                <NextLink href="/dashboard/notice/2">Title</NextLink>
              </td>

              <td className="w-64 py-6 text-right text-sm text-gray-300">
                2025년 1월 21일 00:05:08
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Button
        type="button"
        className="w-fit border-point-500 bg-point-500 hover:bg-point-400 focus:bg-point-400 focus:outline-point-500 active:bg-point-400 disabled:cursor-not-allowed disabled:border-point-700 disabled:bg-point-700"
        disabled={checkedNotices.length <= 0}
      >
        <TrashIcon className="size-5 stroke-gray-100 stroke-2" />
        <span className="text-gray-100">선택한 항목 삭제</span>
      </Button>
    </div>
  )
}

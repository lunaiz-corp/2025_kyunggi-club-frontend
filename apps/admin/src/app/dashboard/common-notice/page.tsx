import type { Metadata } from "next"
import Link from "next/link"

import { PencilIcon } from "@heroicons/react/24/solid"

import { Button } from "@packages/ui/components/krds/Action"
import NoticeListTable from "../notice/_components/Table"

export const metadata: Metadata = {
  title: "관리자 공지사항 관리",
  openGraph: {
    title: "관리자 공지사항 관리",
  },
  twitter: {
    title: "관리자 공지사항 관리",
  },
}

export default function Notice() {
  return (
    <div>
      <div className="mt-10 mb-15 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight md:text-[36px]">
          관리자 공지사항 관리
        </h1>

        <Link href="/dashboard/common-notice/write">
          <Button
            type="button"
            className="border-gray-100 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:outline-gray-100 active:bg-gray-200 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-300"
          >
            <PencilIcon className="size-4 fill-gray-900" />
            <span className="text-gray-900">새로 만들기</span>
          </Button>
        </Link>
      </div>

      <NoticeListTable board="admin" />
    </div>
  )
}

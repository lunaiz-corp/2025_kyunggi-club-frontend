import type { Metadata } from "next"

import NoticeForm from "../../notice/_components/editor/Form"

export const metadata: Metadata = {
  title: "관리자 공지사항 관리",
  openGraph: {
    title: "관리자 공지사항 관리",
  },
  twitter: {
    title: "관리자 공지사항 관리",
  },
}

export default function NoticeWrite() {
  return (
    <div className="my-10">
      <NoticeForm board="admin" />
    </div>
  )
}

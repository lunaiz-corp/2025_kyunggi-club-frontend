import type { Metadata } from "next"

import NoticeForm from "../_components/editor/Form"

export const metadata: Metadata = {
  title: "공지사항 관리",
  openGraph: {
    title: "공지사항 관리",
  },
  twitter: {
    title: "공지사항 관리",
  },
}

export default function NoticeWrite() {
  return (
    <div className="my-10">
      <NoticeForm board="www" />
    </div>
  )
}

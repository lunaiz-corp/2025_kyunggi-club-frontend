"use client"

import { useEffect } from "react"
import toast from "react-hot-toast"

import { useParams, useRouter } from "next/navigation"

import { useQuery } from "@tanstack/react-query"
import { getNotice } from "@/api/notice"

import NoticeForm from "../../_components/editor/Form"

export default function NoticeEdit() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const {
    isLoading,
    error,
    data: notice,
  } = useQuery({
    queryKey: ["notice", "www", id],
    queryFn: () => getNotice({ id, board: "www" }),
  })

  useEffect(() => {
    if (error) {
      toast.error(
        error.message || "서버와의 통신 중 오류가 발생했습니다.",
      )
      router.push("/dashboard/notice")
    }
  }, [error, router])

  return (
    <>
      <title>공지사항 관리 - 경기고등학교 이공계동아리연합</title>
      <meta
        property="og:title"
        content="공지사항 관리 - 경기고등학교 이공계동아리연합"
      />
      <meta
        name="twitter:title"
        content="공지사항 관리 - 경기고등학교 이공계동아리연합"
      />

      <div className="my-10">
        {!isLoading && !error && notice && (
          <NoticeForm
            id={notice.id}
            title={notice.title}
            content={notice.content}
            board="www"
          />
        )}
      </div>
    </>
  )
}

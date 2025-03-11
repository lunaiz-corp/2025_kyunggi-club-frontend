"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

import { useQuery } from "@tanstack/react-query"
import { getNotice } from "@/api/notice"

import { ChevronLeftIcon } from "@heroicons/react/24/solid"
import { NextLink } from "@packages/ui/components/krds/Action"

import Advertisements from "@/components/Advertisements"
import Tiptap from "../_components/Tiptap"

export default function NoticeDetail() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const { error, data: notice } = useQuery({
    queryKey: ["notice", id],
    queryFn: () => getNotice({ id }),
    retry: false,
  })

  useEffect(() => {
    if (error) {
      // eslint-disable-next-line no-alert
      alert(error)
      router.push("/notice")
    }
  }, [error, router])

  return (
    <>
      <title>공지사항 보기 - 경기고등학교 이공계동아리연합</title>
      <meta
        property="og:title"
        content="공지사항 보기 - 경기고등학교 이공계동아리연합"
      />
      <meta
        name="twitter:title"
        content="공지사항 보기 - 경기고등학교 이공계동아리연합"
      />

      <main className="mx-auto mb-12 flex max-w-[1200px] flex-col gap-12 px-6 pt-8 lg:px-0">
        <h1 className="text-4xl font-bold tracking-tight md:text-[42px]">
          공지사항
        </h1>

        <Advertisements page="notice" />

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <NextLink href="/notice" className="p-1.5">
              <ChevronLeftIcon className="size-5" />
            </NextLink>

            <div className="text-gray-10 text-3xl font-bold">
              제목: {notice?.title}
            </div>
          </div>

          <div className="text-gray-300">
            {new Date(
              notice?.created_at ?? "1970-01-01T00:00:00Z",
            ).toLocaleString("ko-KR", {
              timeZone: "Asia/Seoul",

              year: "numeric",
              month: "long",
              day: "numeric",

              hourCycle: "h24",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </div>
        </div>

        {notice?.content && <Tiptap content={notice.content} />}
      </main>
    </>
  )
}

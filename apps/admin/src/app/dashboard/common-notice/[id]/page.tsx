"use client"

import { useEffect } from "react"
import toast from "react-hot-toast"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"

import { useQuery } from "@tanstack/react-query"
import { getProfile } from "@/api/profile"
import { getNotice } from "@/api/notice"

import {
  ChevronLeftIcon,
  PencilIcon,
} from "@heroicons/react/24/solid"
import { TrashIcon } from "@heroicons/react/24/outline"

import { NextLink, Button } from "@packages/ui/components/krds/Action"

import Tiptap from "../../notice/_components/editor/Tiptap"

export default function Notice() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const {
    isLoading: isProfileLoading,
    error: profileError,
    data: profile,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  })

  useEffect(() => {
    ;(async () => {
      // Check the token is exist
      if (!localStorage.getItem("accessToken")) {
        router.replace("/auth/signin")
        return
      }

      // Check the token is valid
      if ((!isProfileLoading && !profile) || profileError) {
        localStorage.removeItem("accessToken")
        router.replace("/auth/signin")
      }
    })()
  }, [isProfileLoading, profile, profileError, router])

  const { error, data: notice } = useQuery({
    queryKey: ["notice", "admin", id],
    queryFn: () => getNotice({ id, board: "admin" }),
  })

  useEffect(() => {
    if (error) {
      toast.error(
        error.message || "서버와의 통신 중 오류가 발생했습니다.",
      )
      router.push("/dashboard/common-notice")
    }
  }, [error, router])

  return (
    <>
      <title>
        {`${profile?.role === "OWNER" ? "관리자 공지사항 관리" : "관리자 공지사항"} - 경기고등학교 이공계동아리연합`}
      </title>
      <meta
        property="og:title"
        content={`${profile?.role === "OWNER" ? "관리자 공지사항 관리" : "관리자 공지사항"} - 경기고등학교 이공계동아리연합`}
      />
      <meta
        name="twitter:title"
        content={`${profile?.role === "OWNER" ? "관리자 공지사항 관리" : "관리자 공지사항"} - 경기고등학교 이공계동아리연합`}
      />

      <div className="my-10 flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <NextLink
              href="/dashboard/common-notice"
              className="p-1.5"
            >
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

        {notice?.content && (
          <Tiptap
            editable={false}
            contentState={[notice.content ?? "", () => {}]}
          />
        )}

        {profile?.role === "OWNER" && (
          <div className="flex gap-6">
            <Button
              type="button"
              className="disabled:bg-point-970 border-point-500 bg-point-500 hover:bg-point-400 focus:bg-point-400 focus:outline-point-500 active:bg-point-400 disabled:cursor-not-allowed disabled:border-point-700"
            >
              <TrashIcon className="size-5 stroke-gray-100 stroke-2" />
              <span className="text-gray-100">삭제</span>
            </Button>

            <Link href={`/dashboard/notice/${id}/edit`}>
              <Button
                type="button"
                className="border-gray-100 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:outline-gray-100 active:bg-gray-200 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-300"
              >
                <PencilIcon className="size-4 fill-gray-900" />
                <span className="text-gray-900">수정</span>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

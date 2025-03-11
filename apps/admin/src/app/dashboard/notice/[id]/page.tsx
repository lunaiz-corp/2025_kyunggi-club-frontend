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

import Tiptap from "../_components/editor/Tiptap"

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
    retry: false,
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

      // Check the role is not OWNER
      if (profile && profile.role !== "OWNER") {
        toast.error("권한이 없습니다.")
        router.replace("/dashboard/common-notice")
      }
    })()
  }, [isProfileLoading, profile, profileError, router])

  const { error, data: notice } = useQuery({
    queryKey: ["notice", "www", id],
    queryFn: () => getNotice({ id, board: "www" }),
    enabled: profile?.role === "OWNER",
    retry: false,
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

      <div className="my-10 flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <NextLink href="/dashboard/notice" className="p-1.5">
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

        <div className="flex gap-6">
          <Button
            type="button"
            className="disabled:bg-point-970 border-point-500 bg-point-500 hover:bg-point-400 focus:bg-point-400 focus:outline-point-500 active:bg-point-400 disabled:cursor-not-allowed disabled:border-point-700"
            onClick={async () => {
              const deleteRequest = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/notice/www/${id}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                  },
                },
              )

              const deleteResponse = await deleteRequest.json()
              if (deleteRequest.ok) {
                toast.success("공지사항을 삭제했습니다.")
                router.push("/dashboard/notice")
              } else {
                toast.error(
                  deleteResponse.message ||
                    "서버와의 통신 중 오류가 발생했습니다.",
                )

                // eslint-disable-next-line no-console
                console.error(deleteResponse)
              }
            }}
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
      </div>
    </>
  )
}

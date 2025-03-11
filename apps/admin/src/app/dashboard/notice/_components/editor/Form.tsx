"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next-nprogress-bar"

import toast from "react-hot-toast"

import { useQuery } from "@tanstack/react-query"
import { getProfile } from "@/api/profile"

import {
  ChevronLeftIcon,
  PencilIcon,
} from "@heroicons/react/24/solid"

import { NextLink, Button } from "@packages/ui/components/krds/Action"
import { TextInput } from "@packages/ui/components/krds/Input"

import Tiptap from "./Tiptap"

export default function NoticeForm({
  id,
  title,
  content,
  board,
}: Readonly<{
  id?: number
  title?: string
  content?: string
  board: "www" | "admin"
}>) {
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
        return
      }

      // Check the role is not OWNER
      if (profile && profile.role !== "OWNER") {
        toast.error("권한이 없습니다.")

        if (board === "www") {
          router.replace("/dashboard/notice")
        } else {
          router.replace("/dashboard/common-notice")
        }
      }
    })()
  }, [board, isProfileLoading, profile, profileError, router])

  const [titleInput, setTitleInput] = useState(title ?? "")
  const [contentInput, setContentInput] = useState(content ?? "")

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={async e => {
        e.preventDefault()

        let saveRequest = null

        if (id) {
          saveRequest = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/notice/${board}/${id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
              body: JSON.stringify({
                title: titleInput,
                content: contentInput,
              }),
            },
          )
        } else {
          saveRequest = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/notice/${board}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
              body: JSON.stringify({
                title: titleInput,
                content: contentInput,
              }),
            },
          )
        }

        const saveResponse = await saveRequest.json()
        if (saveRequest.ok) {
          toast.success("공지사항을 등록했습니다.")
          router.push(
            board === "www"
              ? "/dashboard/notice"
              : "/dashboard/common-notice",
          )
        } else {
          toast.error(
            saveResponse.message ||
              "서버와의 통신 중 오류가 발생했습니다.",
          )

          // eslint-disable-next-line no-console
          console.error(saveResponse)
        }
      }}
    >
      <div className="flex items-center gap-4">
        <NextLink
          href={
            board === "www"
              ? "/dashboard/notice"
              : "/dashboard/common-notice"
          }
          onClick={e => {
            e.preventDefault()

            // eslint-disable-next-line no-alert
            if (window.confirm("작성 중인 내용이 사라집니다.")) {
              router.push(e.currentTarget.href)
            }
          }}
          className="p-1.5"
        >
          <ChevronLeftIcon className="size-5" />
        </NextLink>

        <TextInput
          type="text"
          placeholder="제목"
          className="w-full flex-1 px-4 py-3 font-bold"
          value={titleInput}
          onChange={e => setTitleInput(e.target.value)}
        />

        <Button type="submit" className="px-4 py-3">
          <PencilIcon className="size-4" />
          등록
        </Button>
      </div>

      <Tiptap
        editable
        contentState={[contentInput, setContentInput]}
      />
    </form>
  )
}

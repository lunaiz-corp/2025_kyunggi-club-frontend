"use client"

import { useEffect } from "react"
import { useRouter } from "next-nprogress-bar"

import Link from "next/link"

import { useQuery } from "@tanstack/react-query"
import { getProfile } from "@/api/profile"

import { PencilIcon } from "@heroicons/react/24/solid"

import { Button } from "@packages/ui/components/krds/Action"
import NoticeListTable from "../notice/_components/Table"

export default function Notice() {
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
    })()
  }, [isProfileLoading, profile, profileError, router])

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

      <div>
        <div className="mt-10 mb-15 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight md:text-[36px]">
            {profile?.role === "OWNER"
              ? "관리자 공지사항 관리"
              : "관리자 공지사항"}
          </h1>

          {profile?.role === "OWNER" && (
            <Link href="/dashboard/common-notice/write">
              <Button
                type="button"
                className="border-gray-100 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:outline-gray-100 active:bg-gray-200 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-300"
              >
                <PencilIcon className="size-4 fill-gray-900" />
                <span className="text-gray-900">새로 만들기</span>
              </Button>
            </Link>
          )}
        </div>

        <NoticeListTable board="admin" />
      </div>
    </>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next-nprogress-bar"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { useQuery } from "@tanstack/react-query"
import { getProfile } from "@/api/profile"

import { cn } from "@packages/ui/utils/tailwindMerge"
import UnionLogo from "@packages/assets/images/union-logo.svg"

// ---
import { Bars4Icon } from "@heroicons/react/20/solid"

import HomeIcon from "@/assets/icons/sidebar/home.svg"
import SpeakerphoneIcon from "@/assets/icons/sidebar/speakerphone.svg"

import UserIcon from "@/assets/icons/sidebar/user.svg"
import NewspaperIcon from "@/assets/icons/sidebar/newspaper.svg"
import UserGroupIcon from "@/assets/icons/sidebar/user-group.svg"

import CogIcon from "@/assets/icons/sidebar/cog.svg"
import ScheduleIcon from "@/assets/icons/sidebar/schedule.svg"

import CalendarIcon from "@/assets/icons/sidebar/calendar.svg"
import PencilIcon from "@/assets/icons/sidebar/pencil.svg"
import ChatIcon from "@/assets/icons/sidebar/chat.svg"
// ---

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const [routes, setRoutes] = useState<{
    [key: string]: {
      name: string
      icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
      href: string
    }[]
  }>({
    "": [
      {
        name: "홈",
        icon: HomeIcon,
        href: "/dashboard/home",
      },
      {
        name: "공지사항 관리",
        icon: SpeakerphoneIcon,
        href: "/dashboard/notice",
      },
    ],
    "동아리 관리": [
      {
        name: "계정 관리",
        icon: UserIcon,
        href: "/dashboard/club/account",
      },
      {
        name: "지원서 양식 관리",
        icon: NewspaperIcon,
        href: "/dashboard/club/template",
      },
      {
        name: "접수된 지원서 목록",
        icon: UserGroupIcon,
        href: "/dashboard/club/application",
      },
    ],
    "일정 관리": [
      {
        name: "모집 일정 관리",
        icon: CalendarIcon,
        href: "/dashboard/schedule-club/application",
      },
      {
        name: "지필 일정 관리",
        icon: PencilIcon,
        href: "/dashboard/schedule-club/examination",
      },
      {
        name: "면접 일정 관리",
        icon: ChatIcon,
        href: "/dashboard/schedule-club/interview",
      },
    ],
  })

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

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
        return
      }

      if (profile) {
        setRoutes({
          "": [
            {
              name: "홈",
              icon: HomeIcon,
              href: "/dashboard/home",
            },
            {
              name: "공지사항 관리",
              icon: SpeakerphoneIcon,
              href: "/dashboard/notice",
            },
          ],
          "동아리 관리": [
            {
              name: "계정 관리",
              icon: UserIcon,
              href: "/dashboard/club/account",
            },
            {
              name: "지원서 양식 관리",
              icon: NewspaperIcon,
              href: "/dashboard/club/template",
            },
            {
              name: "접수된 지원서 목록",
              icon: UserGroupIcon,
              href: "/dashboard/club/application",
            },
          ],
          "일정 관리 (관리자)":
            profile.role === "OWNER"
              ? [
                  {
                    name: "사이트 상태 설정",
                    icon: CogIcon,
                    href: "/dashboard/schedule-manager/service-status",
                  },
                  {
                    name: "운영 일정 관리",
                    icon: ScheduleIcon,
                    href: "/dashboard/schedule-manager/operation",
                  },
                ]
              : [],
          "일정 관리": [
            {
              name: "모집 일정 관리",
              icon: CalendarIcon,
              href: "/dashboard/schedule-club/application",
            },
            {
              name: "지필 일정 관리",
              icon: PencilIcon,
              href: "/dashboard/schedule-club/examination",
            },
            {
              name: "면접 일정 관리",
              icon: ChatIcon,
              href: "/dashboard/schedule-club/interview",
            },
          ],
        })
      }
    })()
  }, [isProfileLoading, profile, profileError, router])

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className={cn(
          "fixed z-40 size-full transition-colors duration-[0.4s] lg:hidden",
          isSidebarOpen
            ? "pointer-events-auto bg-black/50"
            : "pointer-events-none bg-transparent",
        )}
        onClick={() => setIsSidebarOpen(false)}
      />

      <button
        type="button"
        className={cn(
          "absolute top-14 z-50 flex h-12 w-8 cursor-pointer items-center justify-center rounded-r-lg bg-gray-700 transition-transform duration-300 ease-in-out lg:hidden",
          isSidebarOpen ? "translate-x-80" : "translate-x-0",
        )}
        onClick={() => setIsSidebarOpen(prev => !prev)}
        title="메뉴 열기 / 닫기"
      >
        <Bars4Icon className="size-5" />
      </button>

      <div
        className={cn(
          "absolute z-50 h-dvh w-80 shrink-0 overflow-y-auto bg-gradient-to-b from-[#1c3c9d] to-ceruleanBlue-700 py-14 pr-6 pl-8 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <Link
          href="/dashboard"
          className="flex gap-3 pl-3"
          onClick={() => setIsSidebarOpen(false)}
        >
          <UnionLogo
            className="h-[42px]"
            title="경기고등학교 이공계동아리연합 로고"
          />

          <div className="inline-flex flex-col gap-0.5 text-left select-none">
            <span className="text-xs leading-[normal] font-bold">
              경기고등학교
            </span>
            <span className="text-xl leading-[normal] font-bold">
              이공계동아리연합
            </span>
          </div>
        </Link>

        <div className="mt-12 flex flex-col gap-7">
          {Object.entries(routes).map(
            ([key, value]) =>
              value.length > 0 && (
                <div
                  key={key}
                  className="flex flex-col gap-3 select-none"
                >
                  <span className="text-sm font-bold">{key}</span>

                  {value.map(route => (
                    <Link
                      key={route.href}
                      href={route.href}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <div
                        className={`inline-flex h-11 w-full items-center gap-3 rounded-md px-4 py-3 ${
                          pathname.startsWith(route.href)
                            ? "bg-gray-100 fill-ceruleanBlue-700 text-ceruleanBlue-700"
                            : "bg-transparent fill-gray-100 hover:bg-gray-100/[.05]"
                        }`}
                      >
                        <route.icon className="size-5" />
                        <span className="font-bold">
                          {route.name}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ),
          )}
        </div>

        {profile && (
          <div className="mt-12 inline-flex w-full flex-col items-start justify-center gap-2 rounded-md border border-[#eff6ff]/75 p-4 select-none">
            <span className="text-sm font-bold">
              로그 실시간 기록 중
            </span>

            <span className="text-xs">
              해당 화면에서 진행하는 모든 활동은 내 계정 (
              {profile.email})과 현재 접속한 IP가 함께 기록되고
              있습니다.
            </span>
          </div>
        )}
      </div>
    </>
  )
}

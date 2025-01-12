import Image from "next/image"
import Link from "next/link"

import { usePathname } from "next/navigation"

import UnionLogo from "@packages/assets/images/union-logo.png"

// ---
import HomeIcon from "@/assets/icons/home.svg"
import SpeakerphoneIcon from "@/assets/icons/speakerphone.svg"

import UserIcon from "@/assets/icons/user.svg"
import NewspaperIcon from "@/assets/icons/newspaper.svg"
import UserGroupIcon from "@/assets/icons/user-group.svg"

import CogIcon from "@/assets/icons/cog.svg"
import ScheduleIcon from "@/assets/icons/schedule.svg"

import CalendarIcon from "@/assets/icons/calendar.svg"
import PencilIcon from "@/assets/icons/pencil.svg"
import ChatIcon from "@/assets/icons/chat.svg"
// ---

export default function Navbar() {
  const pathname = usePathname()

  const ROUTES: {
    [key: string]: {
      name: string
      icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
      href: string
    }[]
  } = {
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
    // TODO: 저걸 권한 단위로 나눠야 함 (삼항연산자?)
    "일정 관리A": [
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
    ],
    "일정 관리B": [
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
  }

  return (
    <div className="h-dvh overflow-y-auto w-80 bg-gradient-to-b from-[#1c3c9d] to-ceruleanBlue-700 py-14 pl-8 pr-6">
      <Link href="/dashboard" className="flex gap-3 pl-3">
        <Image
          src={UnionLogo}
          width={29}
          height={41}
          alt="경기고등학교 이공계동아리연합 로고"
        />

        <div className="inline-flex flex-col gap-0.5 text-left">
          <span className="text-xs font-bold leading-[normal] text-ceruleanBlue-50">
            경기고등학교
          </span>
          <span className="text-xl font-bold leading-[normal] text-ceruleanBlue-50">
            이공계동아리연합
          </span>
        </div>
      </Link>

      <div className="mt-12 flex flex-col gap-7">
        {Object.entries(ROUTES).map(([key, value]) => (
          <div key={key} className="flex flex-col gap-3">
            <span className="text-ceruleanBlue-50 text-sm font-bold">
              {key}
            </span>

            {value.map(route => (
              <Link key={route.href} href={route.href}>
                <div
                  className={
                    "inline-flex h-11 w-full items-center gap-3 rounded-md px-4 py-3 " +
                    (pathname.startsWith(route.href)
                      ? "bg-ceruleanBlue-50 text-ceruleanBlue-700 fill-ceruleanBlue-700"
                      : "bg-transparent text-ceruleanBlue-50 fill-ceruleanBlue-50 hover:bg-[#eff6ff]/[.05]")
                  }
                >
                  <route.icon className="size-5" />
                  <span className="font-bold">{route.name}</span>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-12 p-4 rounded-md border border-[#eff6ff]/75 flex-col justify-center items-start gap-2 inline-flex">
        <span className="text-ceruleanBlue-50 text-sm font-bold">
          로그 실시간 기록 중
        </span>

        <span className="text-ceruleanBlue-50 text-xs">
          해당 화면에서 진행하는 모든 활동은
          <br />
          내 계정 (minsu.kim@lunaiz.com)과
          <br />
          현재 접속한 IP (255.255.255.255)가
          <br />
          함께 기록되고 있습니다.
        </span>
      </div>
    </div>
  )
}

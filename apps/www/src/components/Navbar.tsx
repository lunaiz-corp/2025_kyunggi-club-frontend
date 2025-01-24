import {
  AcademicCapIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/24/outline"

import { NextLink } from "@packages/ui/components/krds/Link"

import UnionLogo from "@packages/assets/images/union-logo.svg"

export default function Navbar() {
  return (
    <header className="sticky top-0 left-0 z-50 bg-gray-950/30 py-4 backdrop-blur-3xl">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        <h2>
          <NextLink href="/" className="flex items-center gap-[14px]">
            <UnionLogo
              className="h-[42px]"
              title="경기고등학교 이공계동아리연합 로고"
            />

            <div className="inline-flex flex-col gap-0.5 text-left">
              <span className="text-xs leading-[normal] font-bold text-gray-100">
                경기고등학교
              </span>
              <span className="text-xl leading-[normal] font-bold text-gray-100">
                이공계동아리연합
              </span>
            </div>
          </NextLink>
        </h2>

        <nav className="inline-flex gap-3">
          <NextLink
            href="/apply/new"
            className="inline-flex items-center justify-between gap-2 px-4 font-bold"
          >
            <InboxIcon className="size-5" />
            지원하기
          </NextLink>

          <NextLink
            href="/club"
            className="inline-flex items-center justify-between gap-2 px-4 font-bold"
          >
            <AcademicCapIcon className="size-5" />
            동아리 소개
          </NextLink>

          <NextLink
            href="/apply/status"
            className="inline-flex items-center justify-between gap-2 px-4 font-bold"
          >
            <UserIcon className="size-5" />
            결과 확인
          </NextLink>
        </nav>
      </div>
    </header>
  )
}

import Link from "next/link"

import UnionLogo from "@packages/assets/images/union-logo.svg"

export default function Navbar() {
  return (
    <header className="mx-auto flex max-w-[1200px] items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-[14px]">
        <UnionLogo
          className="h-[42px]"
          title="경기고등학교 이공계동아리연합 로고"
        />

        <div className="inline-flex flex-col gap-0.5 text-left">
          <span className="text-xs font-bold leading-[normal] text-gray-100">
            경기고등학교
          </span>
          <span className="text-xl font-bold leading-[normal] text-gray-100">
            이공계동아리연합
          </span>
        </div>
      </Link>

      <nav className="inline-flex gap-5 font-bold">
        <Link href="/apply/new" className="px-4">
          지원하기
        </Link>

        <Link href="/club" className="px-4">
          동아리 소개
        </Link>

        <Link href="/apply/status" className="px-4">
          결과 확인
        </Link>
      </nav>
    </header>
  )
}

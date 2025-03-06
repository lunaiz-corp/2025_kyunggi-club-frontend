"use client"

import { ALink } from "@packages/ui/components/krds/Action"

import UnionLogo from "@packages/assets/images/union-logo.svg"

export default function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1248px] flex-col gap-8 bg-gray-900 px-6 py-12 md:gap-12 md:bg-transparent md:px-0">
      <div className="flex items-center gap-[14px]">
        <UnionLogo
          className="h-[42px]"
          title="경기고등학교 이공계동아리연합 로고"
        />

        <div className="inline-flex flex-col gap-0.5 text-left">
          <span className="text-xs leading-[normal] font-bold">
            경기고등학교
          </span>
          <span className="text-xl leading-[normal] font-bold">
            이공계동아리연합
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-10 md:flex-row">
        <ul className="flex flex-col gap-1">
          <li className="flex items-center gap-2">
            <strong>대표전화</strong>
            <ALink href="tel:+827041384014" className="font-bold">
              070-4138-4014
            </ALink>
          </li>

          <li className="flex items-center gap-2">
            <strong>문의 이메일</strong>
            <ALink href="mailto:support@kyunggi.club">
              support@kyunggi.club
            </ALink>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-5 border-t border-gray-200 pt-6 md:gap-3">
        <div className="mb-5 inline-flex items-center gap-1.5">
          <span>
            <ALink
              href="https://schooler-kg.rdbl.io"
              className="-ml-2"
              target="_blank"
              rel="noopener"
            >
              고객센터
            </ALink>
          </span>
          <span>|</span>

          <span>
            <ALink
              href="https://schooler-kg.rdbl.io/legal/tos"
              target="_blank"
              rel="noopener"
            >
              서비스 이용약관
            </ALink>
          </span>
          <span>|</span>

          <span>
            <ALink
              href="https://schooler-kg.rdbl.io/legal/privacy"
              className="font-bold"
              target="_blank"
              rel="noopener"
            >
              개인정보 처리방침
            </ALink>
          </span>
        </div>

        <div className="inline-flex flex-col gap-1.5 text-sm text-gray-300 md:flex-row md:items-center">
          <p className="inline-flex gap-1.5">
            <span>상호명 : 스테다</span>
            <span>|</span>

            <span>사업자등록번호 : 673-03-03470</span>
          </p>

          <span className="hidden md:inline">|</span>

          <p className="inline-flex gap-1.5">
            <span>대표자 : 하승민</span>
            <span>|</span>

            <span>
              주소 : 서울{/* */}
              <span className="hidden md:inline">특별</span>시 강남구
              선릉로111길 38-16, 103호
            </span>
          </p>
        </div>

        <p className="text-sm text-gray-300">
          © 2025 Kyunggi LIST & Steada Corp. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

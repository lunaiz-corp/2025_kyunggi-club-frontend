"use client"

import {
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid"

import { ALink } from "@packages/ui/components/krds/Link"

import UnionLogo from "@packages/assets/images/union-logo.svg"

export default function Footer() {
  return (
    <footer className="mx-auto mt-8 flex max-w-[1248px] flex-col gap-8 bg-gray-900 px-6 py-12 md:gap-16 md:bg-transparent md:px-0">
      <div className="flex items-center gap-[14px]">
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
      </div>

      <div className="flex flex-col justify-between gap-10 md:flex-row">
        <ul className="flex flex-col gap-1">
          <li className="flex items-center gap-2">
            <strong>대표전화</strong>
            <ALink href="tel:+827000000000" className="font-bold">
              070-0000-0000
            </ALink>
          </li>

          <li className="flex items-center gap-2">
            <strong>문의 이메일</strong>
            <ALink href="mailto:support@kyunggi.club">
              support@kyunggi.club
            </ALink>
          </li>
        </ul>

        <div className="flex flex-col gap-16">
          <div className="mr-2 -ml-[7px] flex h-full flex-col gap-0.5 md:gap-2">
            <ALink
              href="https://cs-kg.schooler.kr"
              className="!gap-3"
              target="_blank"
              rel="noopener"
            >
              고객센터{" "}
              <ArrowTopRightOnSquareIcon className="size-6" />
            </ALink>

            <ALink
              href="https://cs-kg.schooler.kr/legal/tos"
              target="_blank"
              rel="noopener"
            >
              서비스 이용약관 <ChevronRightIcon className="size-6" />
            </ALink>

            <ALink
              href="https://cs-kg.schooler.kr/legal/privacy"
              className="font-bold"
              target="_blank"
              rel="noopener"
            >
              개인정보 처리방침{" "}
              <ChevronRightIcon className="size-6" />
            </ALink>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 border-t border-gray-200 pt-6 md:gap-3">
        <div className="inline-flex flex-col gap-1.5 text-sm leading-normal text-gray-300 md:flex-row md:items-center">
          <p className="inline-flex gap-1.5">
            <span>상호명 : 루나이즈</span>
            <span>|</span>

            <span>사업자등록번호 : 123-45-56789</span>
          </p>

          <span className="hidden md:inline">|</span>

          <p className="inline-flex gap-1.5">
            <span>대표자 : 손지민</span>
            <span>|</span>

            <span>주소 : 서울특별시 서초구 나루터로 46</span>
          </p>
        </div>

        <p className="text-sm text-gray-300">
          © 2025{" "}
          <a
            href="https://lunaiz.com"
            className="text-gray-50 hover:underline"
            target="_blank"
            rel="noopener"
          >
            LUNAIZ Corp.
          </a>{" "}
          All rights reserved.
        </p>
      </div>
    </footer>
  )
}

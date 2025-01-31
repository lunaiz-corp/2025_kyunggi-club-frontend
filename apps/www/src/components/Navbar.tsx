"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"

import clsx from "clsx"

import {
  AcademicCapIcon,
  InboxIcon,
  UserIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline"

import { NextLink } from "@packages/ui/components/krds/Link"

import UnionLogo from "@packages/assets/images/union-logo.svg"

export default function Navbar() {
  const pathname = usePathname()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className={clsx(
          "fixed z-40 size-full transition-colors duration-[0.4s] md:hidden",
          isMobileNavOpen
            ? "pointer-events-auto bg-black/40"
            : "pointer-events-none bg-transparent",
        )}
        onClick={() => setIsMobileNavOpen(false)}
      />

      <header className="fixed top-0 left-0 z-50 w-full bg-gray-950 py-4 md:sticky md:bg-gray-950/30 md:backdrop-blur-3xl">
        <div className="mx-auto flex items-center justify-between px-4 md:max-w-[1200px] md:px-0">
          <h2>
            <NextLink
              href="/"
              className="flex items-center gap-[14px]"
              onClick={() => setIsMobileNavOpen(false)}
            >
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

          {/* PC Navbar Menu */}
          <nav className="hidden gap-3 md:inline-flex">
            <NextLink
              href="/apply/new"
              className={clsx(
                "inline-flex items-center justify-between gap-2 px-4 font-bold",
                pathname === "/apply/new" && "bg-ceruleanBlue-700",
              )}
            >
              <InboxIcon className="size-5" />
              지원하기
            </NextLink>

            <NextLink
              href="/club"
              className={clsx(
                "inline-flex items-center justify-between gap-2 px-4 font-bold",
                pathname.startsWith("/club") && "bg-ceruleanBlue-700",
              )}
            >
              <AcademicCapIcon className="size-5" />
              동아리 소개
            </NextLink>

            <NextLink
              href="/apply/status"
              className={clsx(
                "inline-flex items-center justify-between gap-2 px-4 font-bold",
                pathname === "/apply/status" && "bg-ceruleanBlue-700",
              )}
            >
              <UserIcon className="size-5" />
              결과 확인
            </NextLink>
          </nav>

          <div className="md:hidden">
            <button
              type="button"
              title="메뉴 열기"
              className="inline-flex items-center justify-between gap-2 rounded-lg px-2 py-1 font-bold focus:bg-ceruleanBlue-950 focus:outline focus:outline-offset-2 focus:outline-ceruleanBlue-700 active:bg-ceruleanBlue-950"
              onClick={() => {
                setIsMobileNavOpen(!isMobileNavOpen)
              }}
            >
              <Bars3Icon className="size-7" />
            </button>
          </div>
        </div>

        {/* Mobile Navbar Menu */}
        <div
          className={clsx(
            "overflow-hidden bg-gray-950 !transition-[height] !duration-[0.4s] !ease-in-out md:hidden",
            isMobileNavOpen ? "h-[181px]" : "h-0",
          )}
        >
          <nav className="flex flex-col gap-4 px-8 pt-8 pb-4">
            <NextLink
              href="/apply/new"
              className="inline-flex items-center justify-between gap-2 px-4 font-bold"
              onClick={() => setIsMobileNavOpen(false)}
            >
              지원하기
              <InboxIcon className="size-5" />
            </NextLink>

            <NextLink
              href="/club"
              className="inline-flex items-center justify-between gap-2 px-4 font-bold"
              onClick={() => setIsMobileNavOpen(false)}
            >
              동아리 소개
              <AcademicCapIcon className="size-5" />
            </NextLink>

            <NextLink
              href="/apply/status"
              className="inline-flex items-center justify-between gap-2 px-4 font-bold"
              onClick={() => setIsMobileNavOpen(false)}
            >
              결과 확인
              <UserIcon className="size-5" />
            </NextLink>
          </nav>
        </div>
      </header>
    </>
  )
}

"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

import { cn } from "@packages/ui/utils/tailwindMerge"

import {
  AcademicCapIcon,
  InboxIcon,
  UserIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline"

import { NextLink } from "@packages/ui/components/krds/Action"
import {
  ALink,
  baseClass as baseLinkClass,
} from "@packages/ui/components/krds/Action/Link"

import UnionLogo from "@packages/assets/images/union-logo.svg"

export default function Navbar() {
  const pathname = usePathname()

  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () =>
      setIsHeaderScrolled(window.scrollY >= 0.1)

    handleScroll()
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className={cn(
          "fixed z-40 size-full transition-colors duration-[0.4s] md:hidden",
          isMobileNavOpen
            ? "pointer-events-auto bg-black/40"
            : "pointer-events-none bg-transparent",
        )}
        onClick={() => setIsMobileNavOpen(false)}
      />

      <header
        className={cn(
          "fixed top-0 left-0 z-50 w-full py-4 md:sticky",
          isHeaderScrolled || isMobileNavOpen
            ? "bg-gray-950 md:bg-gray-950/60 md:shadow-sm md:backdrop-blur-sm"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex items-center justify-between px-4 md:max-w-[1200px] md:px-0">
          <h2>
            <NextLink
              href="/"
              className="justify-between gap-[14px] px-3 py-2 font-bold"
              onClick={() => setIsMobileNavOpen(false)}
            >
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
            </NextLink>
          </h2>

          {/* PC Navbar Menu */}
          <nav className="hidden gap-3 md:inline-flex">
            {/* <NextLink
              href="/apply/new"
              className={cn(
                "justify-between px-4 py-2 font-bold",
                pathname === "/apply/new" &&
                  "bg-ceruleanBlue-700 hover:bg-ceruleanBlue-600 focus:bg-ceruleanBlue-600 active:bg-ceruleanBlue-600",
              )}
              onClick={e => {
                // @use-funnel때문에 query string이 붙기 때문에
                // 다시 새로고침 되지 않도록 막음
                if (pathname === "/apply/new") {
                  e.preventDefault()
                }
              }}
              data-prevent-nprogress={pathname === "/apply/new"}
            >
              <InboxIcon className="size-5" />
              지원하기
            </NextLink> */}

            <ALink
              href="#"
              className="justify-between px-4 py-2 font-bold"
              onClick={e => {
                e.preventDefault()

                // eslint-disable-next-line no-alert
                window.alert("지원 기간이 아닙니다.")
              }}
              data-prevent-nprogress
            >
              <InboxIcon className="size-5" />
              지원하기
            </ALink>

            <NextLink
              href="/club"
              className={cn(
                "justify-between px-4 py-2 font-bold",
                pathname.startsWith("/club") &&
                  "bg-ceruleanBlue-700 hover:bg-ceruleanBlue-600 focus:bg-ceruleanBlue-600 active:bg-ceruleanBlue-600",
              )}
            >
              <AcademicCapIcon className="size-5" />
              동아리 소개
            </NextLink>

            {/* <NextLink
              href="/apply/status"
              className={cn(
                "justify-between px-4 py-2 font-bold",
                pathname.startsWith("/apply/status") &&
                  "bg-ceruleanBlue-700 hover:bg-ceruleanBlue-600 focus:bg-ceruleanBlue-600 active:bg-ceruleanBlue-600",
              )}
            >
              <UserIcon className="size-5" />
              결과 확인
            </NextLink> */}

            <ALink
              href="#"
              className="justify-between px-4 py-2 font-bold"
              onClick={e => {
                e.preventDefault()

                // eslint-disable-next-line no-alert
                window.alert("준비 중입니다.")
              }}
              data-prevent-nprogress
            >
              <UserIcon className="size-5" />
              결과 확인
            </ALink>
          </nav>

          <div className="md:hidden">
            <button
              type="button"
              title="메뉴 열기"
              className={baseLinkClass.join(" ")}
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
          className={cn(
            "overflow-hidden bg-gray-950 !transition-[height] !duration-[0.4s] ease-in-out md:hidden",
            isMobileNavOpen ? "h-[205px]" : "h-0",
          )}
        >
          <nav className="flex flex-col gap-4 px-8 pt-8 pb-4">
            {/* <NextLink
              href="/apply/new"
              className="inline-flex items-center justify-between gap-2 px-4 py-2 font-bold"
              onClick={e => {
                setIsMobileNavOpen(false)

                // @use-funnel때문에 query string이 붙기 때문에
                // 다시 새로고침 되지 않도록 막음
                if (pathname === "/apply/new") {
                  e.preventDefault()
                }
              }}
              data-prevent-nprogress={pathname === "/apply/new"}
            >
              지원하기
              <InboxIcon className="size-5" />
            </NextLink> */}

            <ALink
              href="#"
              className="inline-flex items-center justify-between gap-2 px-4 py-2 font-bold"
              onClick={e => {
                e.preventDefault()

                // eslint-disable-next-line no-alert
                window.alert("지원 기간이 아닙니다.")
              }}
              data-prevent-nprogress
            >
              <InboxIcon className="size-5" />
              지원하기
            </ALink>

            <NextLink
              href="/club"
              className="inline-flex items-center justify-between gap-2 px-4 py-2 font-bold"
              onClick={() => setIsMobileNavOpen(false)}
            >
              동아리 소개
              <AcademicCapIcon className="size-5" />
            </NextLink>

            {/* <NextLink
              href="/apply/status"
              className="inline-flex items-center justify-between gap-2 px-4 py-2 font-bold"
              onClick={() => setIsMobileNavOpen(false)}
            >
              결과 확인
              <UserIcon className="size-5" />
            </NextLink> */}

            <ALink
              href="#"
              className="inline-flex items-center justify-between gap-2 px-4 py-2 font-bold"
              onClick={e => {
                e.preventDefault()

                // eslint-disable-next-line no-alert
                window.alert("준비 중입니다.")
              }}
              data-prevent-nprogress
            >
              <UserIcon className="size-5" />
              결과 확인
            </ALink>
          </nav>
        </div>
      </header>
    </>
  )
}

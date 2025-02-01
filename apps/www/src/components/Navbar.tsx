"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

import { cn } from "@packages/ui/utils/tailwindMerge"

import {
  AcademicCapIcon,
  InboxIcon,
  UserIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline"

import {
  NextLink,
  baseClass as baseLinkClass,
} from "@packages/ui/components/krds/Link"

import UnionLogo from "@packages/assets/images/union-logo.svg"

export default function Navbar() {
  const pathname = usePathname()

  const headerRef = useRef<HTMLDivElement>(null)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const handleScroll = () => {
      if (window.scrollY >= 0.1) {
        header.classList.remove("bg-transparent")
        header.classList.add("bg-gray-950/30")
        header.classList.add("backdrop-blur-sm")
        header.classList.add("shadow-sm")
      } else {
        header.classList.add("bg-transparent")
        header.classList.remove("bg-gray-950/30")
        header.classList.remove("backdrop-blur-sm")
        header.classList.remove("shadow-sm")
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)

    // eslint-disable-next-line consistent-return
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
        ref={headerRef}
        className="fixed top-0 left-0 z-50 w-full bg-gray-950/30 py-4 backdrop-blur-sm md:sticky"
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
            <NextLink
              href="/apply/new"
              className={cn(
                "justify-between px-4 py-2 font-bold",
                pathname === "/apply/new" &&
                  "active:bg-cerulean-600 bg-ceruleanBlue-700 hover:bg-ceruleanBlue-600 focus:bg-ceruleanBlue-600",
              )}
            >
              <InboxIcon className="size-5" />
              지원하기
            </NextLink>

            <NextLink
              href="/club"
              className={cn(
                "justify-between px-4 py-2 font-bold",
                pathname.startsWith("/club") &&
                  "active:bg-cerulean-600 bg-ceruleanBlue-700 hover:bg-ceruleanBlue-600 focus:bg-ceruleanBlue-600",
              )}
            >
              <AcademicCapIcon className="size-5" />
              동아리 소개
            </NextLink>

            <NextLink
              href="/apply/status"
              className={cn(
                "justify-between px-4 py-2 font-bold",
                pathname === "/apply/status" &&
                  "active:bg-cerulean-600 bg-ceruleanBlue-700 hover:bg-ceruleanBlue-600 focus:bg-ceruleanBlue-600",
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
            "overflow-hidden bg-gray-950 !transition-[height] !duration-[0.4s] !ease-in-out md:hidden",
            isMobileNavOpen ? "h-[205px]" : "h-0",
          )}
        >
          <nav className="flex flex-col gap-4 px-8 pt-8 pb-4">
            <NextLink
              href="/apply/new"
              className="inline-flex items-center justify-between gap-2 px-4 py-2 font-bold"
              onClick={() => setIsMobileNavOpen(false)}
            >
              지원하기
              <InboxIcon className="size-5" />
            </NextLink>

            <NextLink
              href="/club"
              className="inline-flex items-center justify-between gap-2 px-4 py-2 font-bold"
              onClick={() => setIsMobileNavOpen(false)}
            >
              동아리 소개
              <AcademicCapIcon className="size-5" />
            </NextLink>

            <NextLink
              href="/apply/status"
              className="inline-flex items-center justify-between gap-2 px-4 py-2 font-bold"
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

"use client"

import { useRouter } from "next-nprogress-bar"

// ---
import { MegaphoneIcon } from "@heroicons/react/20/solid"
import { UserIcon } from "@heroicons/react/24/solid"

import CogIcon from "@/assets/icons/cog-for-topbar.svg"
import BellIcon from "@/assets/icons/bell.svg"
import SignoutIcon from "@/assets/icons/signout.svg"
// ---

export default function Topbar() {
  const router = useRouter()

  return (
    <div className="mb-5 flex w-full flex-col-reverse gap-9 lg:flex-row">
      <div className="inline-flex w-full items-center gap-3 rounded-lg bg-gray-600 px-4 py-[10px]">
        <MegaphoneIcon className="size-4 fill-gray-100" />
        <span className="text-sm font-semibold text-gray-100">
          전체 공지사항입니다
        </span>
      </div>

      <div className="flex justify-end gap-9">
        <div className="flex items-center gap-6 text-gray-500">
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => {}}
            title="설정"
          >
            <CogIcon className="h-5" />
          </button>

          <button
            type="button"
            className="cursor-pointer"
            onClick={() => {}}
            title="알림"
          >
            <BellIcon className="h-5" />
          </button>
        </div>

        <div className="flex items-center gap-6 text-gray-500">
          <div className="inline-flex items-center gap-[10px] text-gray-100">
            <div className="flex items-center justify-center rounded bg-gray-600 p-1.5">
              <UserIcon className="size-5" />
            </div>

            <span className="leading-tight font-semibold">User</span>
          </div>

          <button
            type="button"
            className="cursor-pointer"
            onClick={() => {
              // TODO: Implement signout logic

              // eslint-disable-next-line no-alert
              if (window.confirm("정말 로그아웃 하시겠습니까?")) {
                router.push("/auth/signin")
              }
            }}
            title="로그아웃"
          >
            <SignoutIcon className="size-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

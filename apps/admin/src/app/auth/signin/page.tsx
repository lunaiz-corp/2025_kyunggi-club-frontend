"use client"

import { useRouter } from "next-nprogress-bar"

import UnionLogo from "@packages/assets/images/union-logo.svg"

export default function Signin() {
  const router = useRouter()

  return (
    <form
      className="flex h-full flex-col items-center justify-center gap-12 px-10 lg:px-48"
      onSubmit={e => {
        e.preventDefault()

        // TODO: Implement login logic
        router.push("/")
      }}
    >
      <div className="flex w-full flex-col gap-5">
        <div className="flex gap-[14px]">
          <UnionLogo
            className="h-12"
            title="경기고등학교 이공계동아리연합 로고"
          />

          <div className="inline-flex flex-col gap-0.5 text-left">
            <span className="text-sm font-bold leading-[normal] text-ceruleanBlue-50">
              경기고등학교
            </span>
            <span className="text-2xl font-bold leading-[normal] text-ceruleanBlue-50">
              이공계동아리연합
            </span>
          </div>
        </div>

        <h1 className="text-[28px] font-bold leading-9 text-ceruleanBlue-50">
          관리자 로그인
        </h1>
      </div>

      <div className="flex w-full flex-col gap-4">
        <input
          type="email"
          className="inline-flex items-center justify-start overflow-hidden rounded-[10px] border-0 bg-[#eff6ff]/[.05] px-5 py-4 text-ceruleanBlue-50 placeholder:text-sm placeholder:font-light placeholder:text-ceruleanBlue-200"
          placeholder="이메일을 입력해 주세요."
          required
        />

        <input
          type="password"
          className="inline-flex items-center justify-start overflow-hidden rounded-[10px] border-0 bg-[#eff6ff]/[.05] px-5 py-4 text-ceruleanBlue-50 placeholder:text-sm placeholder:font-light placeholder:text-ceruleanBlue-200"
          placeholder="비밀번호를 입력해 주세요."
          required
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-ceruleanBlue-700 py-3"
      >
        <span className="font-semibold text-ceruleanBlue-50">
          로그인
        </span>
      </button>
    </form>
  )
}

"use client"

import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next-nprogress-bar"

import UnionLogo from "@packages/assets/images/union-logo.svg"
import { Button } from "@packages/ui/components/krds/Action"

export default function Signin() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      router.push("/")
    }
  }, [router])

  return (
    <form
      className="flex h-full flex-col items-center justify-center gap-12 px-10 lg:px-48"
      onSubmit={async e => {
        e.preventDefault()

        try {
          const loginRequest = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            },
          )

          const loginResponse = await loginRequest.json()
          if (loginRequest.ok) {
            localStorage.setItem(
              "accessToken",
              loginResponse.data.accessToken,
            )

            toast.success("로그인에 성공했습니다.")

            router.push("/")
          } else {
            toast.error(
              loginResponse.message ||
                "서버와의 통신 중 오류가 발생했습니다.",
            )

            // eslint-disable-next-line no-console
            console.error(loginResponse)
          }
        } catch (error) {
          toast.error("서버와의 통신 중 오류가 발생했습니다.")

          // eslint-disable-next-line no-console
          console.error(error)
        }
      }}
    >
      <div className="flex w-full flex-col gap-5">
        <div className="flex items-center gap-[14px]">
          <UnionLogo
            className="h-12"
            title="경기고등학교 이공계동아리연합 로고"
          />

          <div className="inline-flex flex-col gap-0.5 text-left">
            <span className="text-sm leading-[normal] font-bold">
              경기고등학교
            </span>
            <span className="text-2xl leading-[normal] font-bold">
              이공계동아리연합
            </span>
          </div>
        </div>

        <h1 className="text-[28px] leading-9 font-bold">
          관리자 로그인
        </h1>
      </div>

      <div className="flex w-full flex-col gap-4">
        <input
          type="email"
          className="inline-flex items-center justify-start overflow-hidden rounded-[10px] border-0 bg-gray-100/[.05] px-5 py-4 placeholder:text-sm placeholder:font-light placeholder:text-ceruleanBlue-200"
          placeholder="이메일을 입력해 주세요."
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="inline-flex items-center justify-start overflow-hidden rounded-[10px] border-0 bg-gray-100/[.05] px-5 py-4 placeholder:text-sm placeholder:font-light placeholder:text-ceruleanBlue-200"
          placeholder="비밀번호를 입력해 주세요."
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full py-3">
        <span className="font-semibold">로그인</span>
      </Button>
    </form>
  )
}

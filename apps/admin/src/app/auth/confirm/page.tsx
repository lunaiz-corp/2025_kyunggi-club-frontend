"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next-nprogress-bar"
import toast from "react-hot-toast"

import UnionLogo from "@packages/assets/images/union-logo.svg"

import { ALink, Button } from "@packages/ui/components/krds/Action"
import Checkbox from "@packages/ui/components/Checkbox"

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid"

const PASSWORD_RULE_REGEX =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/

const TITLE = {
  AGREE_TERMS: "이용약관에 동의해 주세요.",
  SET_PASSWORD: "비밀번호를 설정해 주세요.",
  DONE: "계정 등록이 완료되었습니다.",
}

const TERMS = [
  {
    id: 1,
    title: "[필수] 서비스 이용약관 동의",
    link: "https://kg-support.schooler.kr/legal/tos",
    isRequired: true,
  },
  {
    id: 2,
    title: "[필수] 개인정보 처리 동의",
    link: "https://kg-support.schooler.kr/legal/privacy",
    isRequired: true,
  },
  {
    id: 3,
    title: "[필수] 동아리 관리자 서약서 동의",
    link: "https://docs.google.com/document/d/1wW6WGbbsN_R3XYvQDBOnfI9aEBfV0EYwfUkBSufqb_U/edit?usp=sharing",
    isRequired: true,
  },
]

export default function Signin() {
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState<
    "AGREE_TERMS" | "SET_PASSWORD" | "DONE"
  >("AGREE_TERMS")

  const [pincode, setPincode] = useState("")
  const [agreedTerms, setAgreedTerms] = useState<number[]>([])

  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")

  const [accountEmail, setAccountEmail] = useState("")

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)

    if (
      searchParams.has("pincode") &&
      searchParams.get("pincode")?.length === 6
    ) {
      setPincode(searchParams.get("pincode")!)
    } else {
      // eslint-disable-next-line no-alert
      window.alert("잘못된 접근입니다.")

      router.replace("/")
    }
  }, [router])

  return (
    <div className="flex h-full flex-col items-center justify-center gap-12 px-10 lg:px-48">
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
          {TITLE[currentStep]}
        </h1>
      </div>

      {currentStep === "AGREE_TERMS" && (
        <>
          <div className="flex w-full flex-col gap-4">
            {TERMS.map(term => (
              <div
                className="inline-flex items-center gap-3"
                key={`agree-terms-${term.id}`}
              >
                <Checkbox
                  id={`agree-terms-${term.id}`}
                  className="border-gray-100/[.05] bg-gray-100/[.05] focus:ring-offset-gray-100"
                  checked={agreedTerms.includes(Number(`${term.id}`))}
                  onChange={e => {
                    const { checked } = e.target
                    const currenttermId = Number(`${term.id}`)

                    if (checked) {
                      setAgreedTerms([...agreedTerms, currenttermId])
                    } else {
                      setAgreedTerms(
                        agreedTerms.filter(
                          id => id !== currenttermId,
                        ),
                      )
                    }
                  }}
                  required={term.isRequired}
                />

                <label
                  htmlFor={`agree-terms-${term.id}`}
                  className="inline-flex cursor-pointer items-center gap-2 text-lg"
                >
                  {term.title}
                  {term.link && (
                    <ALink
                      href={term.link}
                      className="p-0.5"
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${term.title} 약관 보기`}
                    >
                      <ChevronRightIcon className="size-5" />
                    </ALink>
                  )}
                </label>
              </div>
            ))}
          </div>

          <Button
            type="button"
            className="w-full font-bold"
            onClick={() => {
              if (agreedTerms.length !== TERMS.length) {
                toast.error("모든 약관에 동의해 주세요.")
                return
              }

              setCurrentStep("SET_PASSWORD")
            }}
          >
            다음 <ArrowRightIcon className="size-5" />
          </Button>
        </>
      )}

      {currentStep === "SET_PASSWORD" && (
        <form
          className="flex w-full flex-col items-center justify-center gap-12"
          onSubmit={async e => {
            e.preventDefault()

            if (password !== passwordConfirm) {
              toast.error("비밀번호가 일치하지 않습니다.")
              return
            }

            if (!PASSWORD_RULE_REGEX.test(password)) {
              toast.error(
                "비밀번호는 8자 이상, 영문자, 숫자, 특수문자를 포함해야 합니다.",
                {
                  style: {
                    minWidth: "470px",
                  },
                },
              )
              return
            }

            try {
              const passwordSetupRequest = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/set-password`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ pincode, password }),
                },
              )

              const passwordSetupResponse =
                await passwordSetupRequest.json()

              if (passwordSetupRequest.ok) {
                setAccountEmail(passwordSetupResponse.data.email)
                setCurrentStep("DONE")
              } else {
                toast.error(
                  passwordSetupResponse.message ||
                    "서버와의 통신 중 오류가 발생했습니다.",
                )

                // eslint-disable-next-line no-console
                console.error(passwordSetupResponse)
              }
            } catch (error) {
              toast.error("서버와의 통신 중 오류가 발생했습니다.")

              // eslint-disable-next-line no-console
              console.error(error)
            }
          }}
        >
          <div className="flex w-full flex-col gap-4">
            <input
              type="password"
              className="inline-flex items-center justify-start overflow-hidden rounded-[10px] border-0 bg-gray-100/[.05] px-5 py-4 placeholder:text-sm placeholder:font-light placeholder:text-ceruleanBlue-200"
              placeholder="비밀번호를 입력해 주세요. (8자 이상, 영문자, 숫자, 특수문자 포함)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              className="inline-flex items-center justify-start overflow-hidden rounded-[10px] border-0 bg-gray-100/[.05] px-5 py-4 placeholder:text-sm placeholder:font-light placeholder:text-ceruleanBlue-200"
              placeholder="비밀번호를 다시 입력해 주세요. (8자 이상, 영문자, 숫자, 특수문자 포함)"
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
              required
            />
          </div>

          <div className="flex w-full gap-2.5">
            <Button
              type="button"
              className="w-full border-gray-900/[.05] bg-gray-100/[.05] font-bold hover:bg-gray-100/10 focus:bg-gray-100/10 focus:outline-gray-100/20 active:bg-gray-100/10"
              onClick={() => {
                setCurrentStep("AGREE_TERMS")
              }}
            >
              <ArrowLeftIcon className="size-5" /> 이전
            </Button>

            <Button type="submit" className="w-full font-bold">
              제출 <CheckIcon className="size-5" />
            </Button>
          </div>
        </form>
      )}

      {currentStep === "DONE" && (
        <div className="flex w-full flex-col items-center justify-center gap-6">
          <CheckIcon className="h-20" />

          <h2 className="text-2xl font-bold">
            계정 등록이 완료되었습니다.
          </h2>

          <h2 className="mb-6">
            로그인 시 이용하는 이메일은 {accountEmail} 입니다.
          </h2>

          <Button
            type="button"
            className="w-full font-bold"
            onClick={() => {
              router.replace("/auth/signin")
            }}
          >
            로그인하러 가기 <ArrowRightIcon className="size-5" />
          </Button>
        </div>
      )}
    </div>
  )
}

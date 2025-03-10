"use client"

import { useEffect, useRef } from "react"
import toast from "react-hot-toast"

import { useReactToPrint } from "react-to-print"

import { useQuery } from "@tanstack/react-query"

import UnionLogo from "@packages/assets/images/union-logo.svg"
import PaperBg from "@packages/assets/papers/paper-bg.svg"

import { getForm, getApplication } from "@/api/club"

import "../_styles/printer.css"

export default function Printer({
  club,
  studentId,
}: Readonly<{
  club: {
    id: string
    name: string
  }
  studentId: number
}>) {
  const contentRef = useRef<HTMLDivElement>(null)
  const reactToPrintFn = useReactToPrint({
    contentRef,
    onAfterPrint: () => {
      if (window.opener) {
        window.close()
      }
    },
  })

  const { error: questionsError, data: questions } = useQuery({
    queryKey: ["questions", club.id],
    queryFn: () => getForm({ club: club.id }),
  })

  const { error: formError, data: form } = useQuery({
    queryKey: ["application", club.id, studentId],
    queryFn: () => getApplication({ club: club.id, id: studentId }),
  })

  useEffect(() => {
    if (formError) {
      toast.error(
        formError.message ||
          "리포트 생성을 위한 통신 중 오류가 발생했습니다. (지원서 로드 실패)",
      )
    }

    if (questionsError) {
      toast.error(
        questionsError.message ||
          "리포트 생성을 위한 통신 중 오류가 발생했습니다. (양식 로드 실패)",
      )
    }
  }, [formError, questionsError])

  useEffect(() => {
    if (contentRef.current && form && questions) {
      reactToPrintFn()
    }
  }, [form, questions, reactToPrintFn])

  return (
    <div
      ref={contentRef}
      className="relative min-h-[297mm] w-[210mm] bg-white px-14 py-12 text-black"
    >
      <div>
        <div className="mb-8 flex gap-3">
          <UnionLogo
            className="h-[42px]"
            title="경기고등학교 이공계동아리연합 로고"
          />

          <div className="inline-flex flex-col gap-0.5 text-left select-none">
            <span className="text-xs leading-[normal] font-bold">
              경기고등학교
            </span>
            <span className="text-xl leading-[normal] font-bold">
              이공계동아리연합
            </span>
          </div>
        </div>

        <h1 className="mb-10 text-3xl font-bold">지원서</h1>
      </div>

      {form && (
        <div className="mb-12">
          <div className="mb-8 flex flex-col gap-6">
            <h2 className="text-2xl font-bold">인적 사항</h2>

            <div className="flex">
              <div className="inline-flex w-full flex-col gap-1">
                <h3 className="text-sm font-semibold">학번</h3>
                <span className="text-xl font-bold">
                  {form.userInfo.id}
                </span>
              </div>

              <div className="inline-flex w-full flex-col gap-1">
                <h3 className="text-sm font-semibold">학생 이름</h3>
                <span className="text-xl font-bold">
                  {form.userInfo.name}
                </span>
              </div>
            </div>

            <div className="inline-flex w-full flex-col gap-1">
              <h3 className="text-sm font-semibold">학생 전화번호</h3>
              <span className="text-xl font-bold">
                {form.userInfo.phone.replace(
                  /(\d{3})(\d{4})(\d{4})/,
                  "$1-$2-$3",
                )}
              </span>
            </div>
          </div>

          <div className="mb-8 h-0.5 w-full bg-gray-100" />

          <div className="mb-8 flex flex-col gap-6">
            <div className="flex">
              <div className="inline-flex w-full flex-col gap-1">
                <h3 className="text-sm font-semibold">학부모 이름</h3>
                <span className="text-xl font-bold">
                  {form.parentInfo.name}
                </span>
              </div>

              <div className="inline-flex w-full flex-col gap-1">
                <h3 className="text-sm font-semibold">
                  학생 간 관계
                </h3>
                <span className="text-xl font-bold">
                  {form.parentInfo.relationship}
                </span>
              </div>
            </div>

            <div className="inline-flex w-full flex-col gap-1">
              <h3 className="text-sm font-semibold">
                학부모 전화번호
              </h3>
              <span className="text-xl font-bold">
                {form.parentInfo.phone.replace(
                  /(\d{3})(\d{4})(\d{4})/,
                  "$1-$2-$3",
                )}
              </span>
            </div>
          </div>
        </div>
      )}

      {form && questions && (
        <div>
          <div className="mb-10 flex flex-col gap-7">
            <h2 className="text-2xl font-bold">{club.name}</h2>

            {form.formAnswers.map(answer => {
              const question = questions.find(
                q => q.id === answer.id,
              )!

              return (
                <div
                  key={question.id}
                  className="flex flex-col gap-2"
                >
                  <h3 className="font-semibold">
                    Q. {question.question}
                  </h3>
                  <span>
                    {answer.answer instanceof Array
                      ? "파일 제출"
                      : answer.answer}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <PaperBg className="absolute right-0 bottom-0" />
    </div>
  )
}

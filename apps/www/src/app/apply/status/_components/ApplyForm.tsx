"use client"

import type { DetailedHTMLProps, FormHTMLAttributes } from "react"
import { useState } from "react"
import Link from "next/link"

import { overlay } from "overlay-kit"

import {
  ClipboardDocumentCheckIcon,
  NewspaperIcon,
} from "@heroicons/react/20/solid"

import {
  CheckIcon,
  ClockIcon,
  XMarkIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline"

import { TextInput } from "@packages/ui/components/krds/Input"
import { Button } from "@packages/ui/components/krds/Action"
import { Modal } from "@packages/ui/components/krds/Layout"

import Advertisements from "@/components/Advertisements"

import { clubs } from "@/data/clubs.json"

import { retrieveSubmittedForm } from "../actions"
import { CurrentStatus, type SubmittedForm } from "../types"

import {
  RetrieveKnownError,
  RetrieveNotKnownError,
} from "../_exceptions/RetrieveExceptions"
import FormPreview from "../../_components/FormPreview"

function RetrieveRequestForm({
  onSubmit,
  ...props
}: Readonly<
  Omit<
    DetailedHTMLProps<
      FormHTMLAttributes<HTMLFormElement>,
      HTMLFormElement
    >,
    "onSubmit"
  > & {
    onSubmit: (
      e: React.FormEvent<HTMLFormElement>,
      data: {
        studentId: string
        studentName: string
        password: string
      },
    ) => void
  }
>) {
  const [studentId, setStudentId] = useState("")
  const [studentName, setStudentName] = useState("")
  const [password, setPassword] = useState("")

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={e => {
        e.preventDefault()
        onSubmit(e, { studentId, studentName, password })
      }}
      {...props}
    >
      <div className="h-0.5 bg-gray-900" />

      <div className="flex flex-col gap-5">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label
          htmlFor="student-id"
          className="cursor-pointer text-2xl font-bold"
        >
          학번
        </label>
        <TextInput
          id="student-id"
          type="text"
          placeholder="예) 12345"
          maxLength={5}
          pattern="\d{5}"
          value={studentId}
          onChange={e => {
            // Non-number characters are not allowed
            if (!/^\d*$/.test(e.target.value)) return
            setStudentId(e.target.value)
          }}
          required
        />
      </div>

      <div className="flex flex-col gap-5">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label
          htmlFor="student-name"
          className="cursor-pointer text-2xl font-bold"
        >
          학생 이름
        </label>
        <TextInput
          id="student-name"
          type="text"
          placeholder="예) 홍길동"
          value={studentName}
          onChange={e => setStudentName(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-5">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label
          htmlFor="password"
          className="inline-flex cursor-pointer flex-col gap-3"
        >
          <span className="text-2xl font-bold">접수 번호</span>
          <span className="text-sm text-gray-500">
            최초 지원 당시 알림톡으로 전송된 접수 번호를 입력해주세요.
          </span>
        </label>
        <TextInput
          id="password"
          type="password"
          placeholder="예) 123456"
          maxLength={6}
          pattern="\d{6}"
          value={password}
          onChange={e => {
            // Non-number characters are not allowed
            if (!/^\d*$/.test(e.target.value)) return
            setPassword(e.target.value)
          }}
          required
        />
      </div>

      <div className="h-0.5 bg-gray-900" />

      <Button type="submit" className="w-full font-bold">
        확인 <CheckIcon className="size-5" />
      </Button>
    </form>
  )
}

function Status({ form }: Readonly<{ form: SubmittedForm }>) {
  const getCurrentStatusText = (status: string) => {
    switch (status) {
      case CurrentStatus.PASSED:
        return "최종 합격"
      case CurrentStatus.WAITING:
        return "결과 대기"
      case CurrentStatus.REJECTED:
        return "최종 불합격"
      case CurrentStatus.FINAL_SUBMISSION:
        return "최종 지원 대기"
      default:
        return "알 수 없음"
    }
  }

  return (
    <div className="flex flex-col gap-7">
      {form.currentStatus.map((status, index) => (
        <div key={status.club} className="flex flex-col gap-7">
          <div className="flex items-center justify-between">
            <Link href={`/apply/status/${status.club}`}>
              <div className="inline-flex flex-col gap-2.5">
                <span className="text-2xl">
                  {
                    clubs
                      .find(x => x.id === status.club)!
                      .name.split(" ")[1]
                  }{" "}
                  ({index + 1}지망)
                </span>
                <span className="text-[45px] font-bold">
                  {getCurrentStatusText(status.status)}
                </span>
              </div>
            </Link>

            {status.status === CurrentStatus.PASSED && (
              <div className="flex size-16 items-center justify-center rounded-xl bg-ceruleanBlue-600">
                <CheckIcon className="size-8" />
              </div>
            )}

            {status.status === CurrentStatus.WAITING && (
              <div className="flex size-16 items-center justify-center rounded-xl bg-warning-300">
                <ClockIcon className="size-8" />
              </div>
            )}

            {status.status === CurrentStatus.REJECTED && (
              <div className="flex size-16 items-center justify-center rounded-xl bg-point-500">
                <XMarkIcon className="size-8" />
              </div>
            )}

            {status.status === CurrentStatus.FINAL_SUBMISSION && (
              <div className="flex size-16 items-center justify-center rounded-xl bg-success-400">
                <CheckIcon className="size-8" />
              </div>
            )}
          </div>

          <div className="h-0.5 bg-gray-900" />
        </div>
      ))}

      <div className="mt-7 flex flex-col gap-6 rounded-lg bg-gray-900 px-4 py-5 text-gray-200">
        <span className="inline-flex items-center gap-3 font-bold">
          <ExclamationCircleIcon className="size-5" />
          &quot;최종 지원 대기&quot; 상태란?
        </span>

        <div className="inline-flex flex-col gap-4">
          <span className="text-gray-300">
            순차적으로, 각 동아리에서 최종 선발 안내 알림톡을 발송해
            드립니다.
            <br />
            해당 알림톡 내의 최종 지원 버튼을, 링크 만료 전까지
            클릭하여서 최종 지원을 진행하면 됩니다.
          </span>

          <span className="text-gray-300">
            링크 만료 시간은 발송 시로부터 &quot;5분&quot;이며,
            알림톡을 통한 접속만 가능하므로 본 페이지에서는 진행이
            어려울 수 있습니다.
            <br />
            자세한 사항은 화면 하단 채널톡 혹은 고객센터
            (070-0000-0000)으로 문의 부탁드립니다.
          </span>
        </div>
      </div>
    </div>
  )
}

function Preview({ form }: Readonly<{ form: SubmittedForm }>) {
  const [currentStep, setCurrentStep] = useState<string>(
    form.applingClubs[0],
  )

  return (
    <FormPreview
      form={form}
      stepState={[currentStep, setCurrentStep]}
    />
  )
}

export default function ApplyForm() {
  const [formData, setFormData] = useState<SubmittedForm | null>(null)

  const [mode, setMode] = useState<"preview" | "status">("status")

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="inline-flex flex-col gap-3">
          <span className="text-2xl text-gray-400">
            결과 & 지원서 확인
          </span>
          <h1 className="text-4xl font-bold tracking-tight md:text-[42px]">
            {!formData
              ? "동아리 지원 결과를 확인합니다."
              : mode === "preview"
                ? "지원서를 확인 및 수정합니다."
                : `${formData.userInfo.name}님의 동아리 지원 현황입니다.`}
          </h1>
        </div>

        {formData &&
          (mode === "preview" ? (
            <Button
              type="button"
              className="w-fit"
              onClick={() => setMode("status")}
            >
              <ClipboardDocumentCheckIcon className="size-5" />
              지원 결과 보기
            </Button>
          ) : (
            <Button
              type="button"
              className="w-fit"
              onClick={() => setMode("preview")}
            >
              <NewspaperIcon className="size-5" />
              지원서 확인하기
            </Button>
          ))}
      </div>

      <Advertisements page="apply" />

      {!formData ? (
        <RetrieveRequestForm
          onSubmit={async (e, props) => {
            try {
              const { result, data, error } =
                await retrieveSubmittedForm(props)

              if (result === "ERROR" && error) {
                throw new RetrieveKnownError(
                  error.code,
                  error.message,
                )
              } else if (result === "ERROR") {
                throw new RetrieveNotKnownError(
                  "FORMDATA_RETRIEVE_SERVER_ERROR",
                  "An unknown error occurred while retrieving data.",
                )
              } else if (result === "SUCCESS" && !data) {
                throw new RetrieveNotKnownError(
                  "FORMDATA_RETRIEVE_CLIENT_ERROR",
                  "Data given from the server is null.",
                )
              }

              setFormData(data)
            } catch (error) {
              if (!(error instanceof RetrieveKnownError)) {
                throw error
              }

              overlay.open(({ isOpen, close, unmount }) => {
                return (
                  <Modal
                    isOpen={isOpen}
                    close={() => {
                      close()
                      setTimeout(unmount, 200)
                    }}
                    title="오류"
                  >
                    {error.message}
                  </Modal>
                )
              })
            }
          }}
        />
      ) : mode === "preview" ? (
        <Preview form={formData} />
      ) : (
        <Status form={formData} />
      )}
    </>
  )
}

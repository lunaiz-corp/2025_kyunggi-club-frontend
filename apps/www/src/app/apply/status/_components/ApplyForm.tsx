"use client"

import type { DetailedHTMLProps, FormHTMLAttributes } from "react"
import { useState } from "react"

import { CheckIcon } from "@heroicons/react/20/solid"

import { TextInput } from "@packages/ui/components/krds/Input"
import { Button } from "@packages/ui/components/krds/Action"

import { retrieveSubmittedForm, type SubmittedForm } from "../actions"
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
          <span className="text-2xl font-bold">개인 확인 코드</span>
          <span className="text-sm text-gray-500">
            최초 지원 당시 알림톡으로 전송된 확인 코드를 입력해주세요.
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

  return !formData ? (
    <RetrieveRequestForm
      onSubmit={async (e, props) => {
        try {
          const { result, data, error } =
            await retrieveSubmittedForm(props)

          if (result === "ERROR" && error) {
            throw new RetrieveKnownError(error.code, error.message)
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

          // TODO: 모달로 바꾸기
          // eslint-disable-next-line no-alert
          alert(error.message)
        }
      }}
    />
  ) : (
    <Preview form={formData} />
  )
}

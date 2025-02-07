/* eslint-disable jsx-a11y/label-has-associated-control */

"use client"

import { useState } from "react"
import { CheckIcon } from "@heroicons/react/20/solid"

import TextInput from "@packages/ui/components/krds/Input/TextInput"
import Button from "@packages/ui/components/krds/Action/Button"

export default function SearchForm() {
  const [studentId, setStudentId] = useState<string>("")
  const [studentName, setStudentName] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={e => {
        e.preventDefault()

        // TODO: Retrieve 로직 구현
        // API call -> Validation -> 응답의 ID값을 참고해서 /apply/status/[ID]로 이동
      }}
    >
      <div className="h-0.5 bg-gray-900" />

      <div className="flex flex-col gap-5">
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

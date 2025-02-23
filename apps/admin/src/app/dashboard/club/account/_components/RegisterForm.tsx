"use client"

import { useState } from "react"

import { cn } from "@packages/ui/utils/tailwindMerge"
import { Button } from "@packages/ui/components/krds/Action"

import { CheckIcon } from "@heroicons/react/24/solid"

const ROLES = ["부장", "차장", "총무"]

export default function RegisterForm() {
  const [role, setRole] = useState<number>(0)

  const [name, setName] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [email, setEmail] = useState<string>("")

  return (
    <form
      className="flex flex-col gap-5 rounded-xl bg-gray-800 p-4 md:py-2.5 lg:gap-3 xl:flex-row"
      onSubmit={e => {
        e.preventDefault()

        // eslint-disable-next-line no-console
        console.log({ role, email })
      }}
    >
      <div className="flex shrink-0 gap-3 rounded-xl bg-gray-700 px-3 py-2">
        {ROLES.map((x, i) => (
          <button
            key={`roles-${x}`}
            onClick={() => setRole(i)}
            type="button"
            className={cn(
              "inline-flex w-full cursor-pointer items-center justify-center rounded-xl bg-gray-700 px-4 py-1.5 hover:bg-gray-600",
              role === i && "bg-gray-600",
            )}
          >
            <span className="font-bold">{x}</span>
          </button>
        ))}
      </div>

      <div className="flex w-full flex-col gap-5 lg:flex-row lg:gap-3">
        <input
          type="text"
          className="w-full rounded-xl border-0 bg-gray-700 px-4 placeholder:text-gray-400 focus:ring-gray-500 lg:w-1/6"
          placeholder="이름"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          type="tel"
          className="w-full rounded-xl border-0 bg-gray-700 px-4 placeholder:text-gray-400 focus:ring-gray-500 lg:w-1/4"
          placeholder="전화번호"
          maxLength={11}
          pattern="01[0-9][0-9]{7,8}"
          value={phone}
          onChange={e => {
            // Non-number characters are not allowed
            if (!/^\d*$/.test(e.target.value)) return

            setPhone(e.target.value)
          }}
          required
        />

        <input
          type="email"
          className="w-full min-w-1/4 flex-1 rounded-xl border-0 bg-gray-700 px-4 placeholder:text-gray-400 focus:ring-gray-500"
          placeholder="이메일"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <Button type="submit" className="shrink-0 px-4 py-3">
          <CheckIcon className="size-4" />
          등록
        </Button>
      </div>
    </form>
  )
}

"use client"

import { useState } from "react"

import { TrashIcon } from "@heroicons/react/24/outline"

import { Button } from "@packages/ui/components/krds/Action"
import Checkbox from "@packages/ui/components/Checkbox"

const ROLES = ["부장", "차장", "총무"]
const MOCK_ACCOUNTS = [
  {
    id: 1,
    role: 0,
    name: "홍길동",
    phone: "01012345678",
    email: "notemail@email.com",
  },
  {
    id: 2,
    role: 1,
    name: "홍길동",
    phone: "01012345678",
    email: "notemail@email.com",
  },
  {
    id: 3,
    role: 2,
    name: "홍길동",
    phone: "01012345678",
    email: "notemail@email.com",
  },
]

export default function AccountListTable() {
  const [checkedAccounts, setCheckedAccounts] = useState<number[]>([])

  return (
    <div className="flex flex-col gap-12">
      <div className="w-full overflow-x-auto">
        <table className="w-max border-collapse border-spacing-x-12 border-b border-gray-700 lg:w-full">
          <thead className="h-10 border-b border-gray-500 align-top">
            <tr>
              <th
                scope="col"
                className="sticky left-0 w-[18px] bg-gray-900 pr-7 pl-1"
              >
                <Checkbox
                  id="toggle-all"
                  checked={
                    checkedAccounts.length > 0 &&
                    checkedAccounts.length === MOCK_ACCOUNTS.length
                  }
                  onChange={e => {
                    const { checked } = e.target

                    if (checked) {
                      setCheckedAccounts([
                        ...checkedAccounts,
                        ...[...MOCK_ACCOUNTS.map(x => x.id)].filter(
                          id => !checkedAccounts.includes(id),
                        ),
                      ])
                    } else {
                      setCheckedAccounts([])
                    }
                  }}
                />
              </th>

              <th scope="col" className="w-auto pr-7 text-start">
                직급
              </th>

              <th scope="col" className="w-auto pr-7 text-start">
                이름
              </th>

              <th scope="col" className="w-auto pr-7 text-start">
                전화번호
              </th>

              <th scope="col" className="w-64 text-start">
                이메일
              </th>
            </tr>
          </thead>

          <tbody>
            {MOCK_ACCOUNTS.map(x => (
              <tr key={x.id}>
                <td className="sticky left-0 w-[18px] bg-gray-900 py-6 pr-7 pl-1">
                  <Checkbox
                    id={`toggle-${x.id}`}
                    checked={checkedAccounts.includes(x.id)}
                    onChange={e => {
                      const { checked } = e.target

                      if (checked) {
                        setCheckedAccounts([...checkedAccounts, x.id])
                      } else {
                        setCheckedAccounts(
                          checkedAccounts.filter(id => id !== x.id),
                        )
                      }
                    }}
                  />
                </td>

                <td className="w-auto py-6 pr-7">
                  <div className="inline-flex items-center justify-center gap-2.5 rounded-md bg-ceruleanBlue-700 px-3.5 py-2.5 font-bold">
                    <span>{ROLES[x.role]}</span>
                  </div>
                </td>

                <td className="w-auto py-6 pr-7 text-lg font-bold">
                  {x.name}
                </td>

                <td className="w-auto py-6 pr-7 text-lg">
                  {x.phone.replace(
                    /(\d{3})(\d{3,4})(\d{4})/,
                    "$1-$2-$3",
                  )}
                </td>

                <td className="w-64 py-6 text-lg">{x.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button
        type="button"
        className="w-fit border-point-500 bg-point-500 hover:bg-point-400 focus:bg-point-400 focus:outline-point-500 active:bg-point-400 disabled:cursor-not-allowed disabled:border-point-700 disabled:bg-point-700"
        disabled={checkedAccounts.length <= 0}
      >
        <TrashIcon className="size-5 stroke-gray-100 stroke-2" />
        <span className="text-gray-100">선택한 계정 비활성화</span>
      </Button>
    </div>
  )
}

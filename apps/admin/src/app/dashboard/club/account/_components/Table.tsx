"use client"

import { useState } from "react"
import toast from "react-hot-toast"

import { TrashIcon } from "@heroicons/react/24/outline"

import { useQuery } from "@tanstack/react-query"
import { getList } from "@/api/list"

import { Button } from "@packages/ui/components/krds/Action"
import Checkbox from "@packages/ui/components/Checkbox"

const ROLES = {
  CLUB_LEADER: "부장",
  CLUB_DEPUTY: "차장",
  CLUB_MEMBER: "총무",
}

export default function AccountListTable({
  id,
}: Readonly<{ id: string }>) {
  const {
    isLoading: isListLoading,
    error: listError,
    data: list,
  } = useQuery({
    queryKey: ["members", id],
    queryFn: () => getList({ club: id }),
  })

  const [checkedAccounts, setCheckedAccounts] = useState<string[]>([])

  return (
    !isListLoading &&
    !listError &&
    list && (
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
                      checkedAccounts.length === list.length
                    }
                    onChange={e => {
                      const { checked } = e.target

                      if (checked) {
                        setCheckedAccounts([
                          ...checkedAccounts,
                          ...[...list.map(x => x.email)].filter(
                            email => !checkedAccounts.includes(email),
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
              {(list || []).map(x => (
                <tr key={x.email}>
                  <td className="sticky left-0 w-[18px] bg-gray-900 py-6 pr-7 pl-1">
                    <Checkbox
                      id={`toggle-${x.email}`}
                      checked={checkedAccounts.includes(x.email)}
                      onChange={e => {
                        const { checked } = e.target

                        if (checked) {
                          setCheckedAccounts([
                            ...checkedAccounts,
                            x.email,
                          ])
                        } else {
                          setCheckedAccounts(
                            checkedAccounts.filter(
                              email => email !== x.email,
                            ),
                          )
                        }
                      }}
                    />
                  </td>

                  <td className="w-auto py-6 pr-7">
                    <div className="inline-flex items-center justify-center gap-2.5 rounded-md bg-ceruleanBlue-700 px-3.5 py-2.5 font-bold">
                      <span>
                        {ROLES[x.role as keyof typeof ROLES]}
                      </span>
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
          onClick={async e => {
            e.preventDefault()

            const registerRequest: Response[] = []

            checkedAccounts.forEach(async email => {
              registerRequest.push(
                await fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/club/${id}/members`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                    body: JSON.stringify({
                      email,
                    }),
                  },
                ),
              )
            })

            const errored = registerRequest.filter(r => !r.ok).length

            if (errored === registerRequest.length) {
              toast.error("서버와의 통신 중 오류가 발생했습니다.")

              return
            }

            if (errored > 0) {
              toast.error(
                `${errored} 명의 정보를 제외하고 계정 비활성화를 완료했습니다.`,
              )

              return
            }

            toast.success("선택한 계정을 비활성화했습니다.")
          }}
          disabled={checkedAccounts.length <= 0}
        >
          <TrashIcon className="size-5 stroke-gray-100 stroke-2" />
          <span className="text-gray-100">선택한 계정 비활성화</span>
        </Button>
      </div>
    )
  )
}

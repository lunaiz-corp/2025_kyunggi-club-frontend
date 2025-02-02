import { useState } from "react"

import {
  ArrowRightIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid"

import { ALink } from "@packages/ui/components/krds/Link"
import Button from "@packages/ui/components/krds/Button"

import type { ApplyBaseContext } from "."

// 1. 아무것도 입력 안됨 - 약관 동의 받아야 함
export type ApplyStep1 = ApplyBaseContext

type DataNeedsToBeFilled = {
  agreedTerms: number[]
}

const MOCK_TERMS = [
  {
    id: 1,
    title: "[필수] 서비스 이용약관 동의",
    subterms: [],
    link: "https://schooler-kg.rdbl.io/legal/tos",
    isRequired: true,
  },
  {
    id: 2,
    title: "[필수] 개인정보 처리 동의",
    subterms: [
      {
        id: 1,
        title: "개인정보 수집 및 이용 동의",
        link: "https://schooler-kg.rdbl.io/legal/privacy#%EC%A0%9C5%EC%A1%B0-(%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4%EC%9D%98-%EC%B2%98%EB%A6%AC-%EB%AA%A9%EC%A0%81)",
      },
      {
        id: 2,
        title: "개인정보 제3자 제공 및 위탁 동의",
        link: "https://schooler-kg.rdbl.io/legal/privacy#%EC%A0%9C9%EC%A1%B0-(%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4%EC%9D%98-%EC%A0%9C3%EC%9E%90-%EC%A0%9C%EA%B3%B5)",
      },
    ],
    isRequired: true,
  },
]

export default function ApplyNewFunnelStep1({
  onNext,
}: Readonly<{
  onNext: (data: DataNeedsToBeFilled) => void
}>) {
  const [agreedTerms, setAgreedTerms] = useState<number[]>([])

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={e => {
        e.preventDefault()
        onNext({ agreedTerms })
      }}
    >
      <div className="h-0.5 bg-gray-900" />

      {MOCK_TERMS.map(term => (
        <div
          key={`agree-terms-${term.id}`}
          className="inline-flex flex-col gap-2.5"
        >
          <div className="inline-flex items-center gap-3">
            <input
              id={`agree-terms-${term.id}`}
              type="checkbox"
              className="size-5 cursor-pointer rounded border border-solid border-gray-800 bg-gray-900 checked:bg-ceruleanBlue-700 focus:ring-[0.5px] focus:ring-ceruleanBlue-700 focus:ring-offset-transparent"
              checked={
                // 모든 하위 약관이 체크되어 있는지 확인
                term.subterms.length <= 0
                  ? agreedTerms.includes(term.id)
                  : term.subterms.every(subterm =>
                      agreedTerms.includes(
                        Number(`${term.id}.${subterm.id}`),
                      ),
                    )
              }
              onChange={e => {
                const { checked } = e.target

                if (term.subterms.length <= 0) {
                  if (checked) {
                    setAgreedTerms([...agreedTerms, term.id])
                  } else {
                    setAgreedTerms(
                      agreedTerms.filter(id => id !== term.id),
                    )
                  }
                } else {
                  const subtermIds = term.subterms.map(subterm =>
                    Number(`${term.id}.${subterm.id}`),
                  )

                  if (checked) {
                    setAgreedTerms([...agreedTerms, ...subtermIds])
                  } else {
                    setAgreedTerms(
                      agreedTerms.filter(
                        id => !subtermIds.includes(id),
                      ),
                    )
                  }
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

          {term.subterms.map(subterm => (
            <div
              className="inline-flex items-center gap-3 pl-9"
              key={`agree-terms-${term.id}-${subterm.id}`}
            >
              <input
                id={`agree-terms-${term.id}-${subterm.id}`}
                type="checkbox"
                className="size-5 cursor-pointer rounded border border-solid border-gray-800 bg-gray-900 checked:bg-ceruleanBlue-700 focus:ring-[0.5px] focus:ring-ceruleanBlue-700 focus:ring-offset-transparent"
                checked={agreedTerms.includes(
                  Number(`${term.id}.${subterm.id}`),
                )}
                onChange={e => {
                  const { checked } = e.target
                  const currentSubtermId = Number(
                    `${term.id}.${subterm.id}`,
                  )

                  if (checked) {
                    setAgreedTerms([...agreedTerms, currentSubtermId])
                  } else {
                    setAgreedTerms(
                      agreedTerms.filter(
                        id => id !== currentSubtermId,
                      ),
                    )
                  }
                }}
                required={term.isRequired}
              />

              <label
                htmlFor={`agree-terms-${term.id}-${subterm.id}`}
                className="inline-flex cursor-pointer items-center gap-2 text-lg"
              >
                {subterm.title}
                {subterm.link && (
                  <ALink
                    href={subterm.link}
                    className="p-0.5"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${subterm.title} 약관 보기`}
                  >
                    <ChevronRightIcon className="size-5" />
                  </ALink>
                )}
              </label>
            </div>
          ))}
        </div>
      ))}

      <div className="h-0.5 bg-gray-900" />

      <Button type="submit" className="font-bold">
        다음 <ArrowRightIcon className="size-5" />
      </Button>
    </form>
  )
}

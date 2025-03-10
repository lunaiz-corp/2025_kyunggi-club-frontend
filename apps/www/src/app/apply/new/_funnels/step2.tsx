/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useRef, useState } from "react"

// import { overlay } from "overlay-kit"
// import { customAlphabet } from "nanoid"

import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/20/solid"

import { TextInput } from "@packages/ui/components/krds/Input"
import Select from "@packages/ui/components/krds/Select"
import { Button } from "@packages/ui/components/krds/Action"
// import { Modal } from "@packages/ui/components/krds/Layout"

import * as clubsJson from "@/data/clubs.json"

import type { ApplyBaseContext } from "."
import type { DataNeedsToBeFilled as DataNeedsToBeFilledStep1 } from "./step1"

const { clubs } = clubsJson

// 2. 약관 동의 완료 - 인적 사항 입력 중
export type ApplyStep2 = DataNeedsToBeFilledStep1

export type DataNeedsToBeFilled = {
  userInfo: {
    id: number // 학번
    name: string // 이름
    phone: string // 전화번호
    verifiedRefId: string // 전화번호, CI 등을 서버에서 참조할 수 있는 refId
    isVerifiedPhoneIsParent: boolean // 전화번호가 본인 또는 부모님 전화번호인지 여부 (default: false)
  }
  parentInfo: {
    name: string // 부모님 이름
    relationship: string // 학생 간 관계
    phone: string // 부모님 전화번호
  }
  applingClubs: string[] // 학생 지망 동아리 리스트
}

export default function ApplyNewFunnelStep2({
  onPrev,
  onNext,
  ...context
}: Readonly<
  {
    onPrev: () => void
    onNext: (data: DataNeedsToBeFilled) => void
  } & ApplyBaseContext
>) {
  const havePrefilled = useRef<boolean>(false)
  // const kcpAuthPop = useRef<WindowProxy | null>(null)

  const [studentId, setStudentId] = useState<string>("")
  const [studentName, setStudentName] = useState<string>("")
  const [studentPhone, setStudentPhone] = useState<string>("")
  // const [verifiedRefId, setVerifiedRefId] = useState<string>("")
  // const [isVerifiedPhoneIsParent, setIsVerifiedPhoneIsParent] =
  //   useState<boolean>(false)

  const [parentName, setParentName] = useState<string>("")
  const [parentRelationship, setParentRelationship] =
    useState<string>("")
  const [parentPhone, setParentPhone] = useState<string>("")

  const [applingClubs, setApplingClubs] = useState<string[]>([
    "",
    "",
    "",
  ])

  useEffect(() => {
    if (!havePrefilled.current) {
      // 만약 이미 데이터가 저장되어 있으면 데이터를 채워준다.
      if (context.userInfo) {
        setStudentId(context.userInfo.id.toString())
        setStudentName(context.userInfo.name)
        setStudentPhone(context.userInfo.phone)
        // setVerifiedRefId(context.userInfo.verifiedRefId)
        // setIsVerifiedPhoneIsParent(
        //   context.userInfo.isVerifiedPhoneIsParent,
        // )
      }

      if (context.parentInfo) {
        setParentName(context.parentInfo.name)
        setParentRelationship(context.parentInfo.relationship)
        setParentPhone(context.parentInfo.phone)
      }

      if (context.applingClubs) {
        setApplingClubs(context.applingClubs)
      }

      havePrefilled.current = true
    }
  }, [context])

  // const requestVerifyPhone = async () => {
  //   const nanoid = customAlphabet(
  //     "0123456789abcdefghijklmnopqrstuvwxyz",
  //     10,
  //   )

  //   const orderId = `KGH${new Date().toISOString().substring(0, 19).replace(/[\D]/g, "")}@${nanoid()}`

  //   if (window.matchMedia("(max-width: 768px)").matches) {
  //     kcpAuthPop.current = window.open(
  //       `/apply/pass/request?orderId=${orderId}`,
  //       "auth_popup",
  //     )
  //   } else {
  //     const width = 410
  //     // const height = 500
  //     const height = 724

  //     const leftpos = window.screen.width / 2 - width / 2
  //     const toppos = window.screen.height / 2 - height / 2

  //     kcpAuthPop.current = window.open(
  //       `/apply/pass/request?orderId=${orderId}`,
  //       "auth_popup",
  //       `width=${width}, height=${height}, left=${leftpos}, top=${toppos}, toolbar=no, status=no, statusbar=no, menubar=no, scrollbars=no, resizable=no, fullscreen=no, titlebar=no, location=no`,
  //     )
  //   }

  //   if (kcpAuthPop.current) {
  //     kcpAuthPop.current.focus()
  //   } else {
  //     overlay.open(({ isOpen, close, unmount }) => {
  //       return (
  //         <Modal
  //           isOpen={isOpen}
  //           close={() => {
  //             close()
  //             setTimeout(unmount, 200)
  //           }}
  //           title="오류"
  //         >
  //           팝업 차단을 해제해주세요.
  //         </Modal>
  //       )
  //     })
  //   }
  // }

  // useEffect(() => {
  //   // checkplus message 이벤트를 팝업으로 부터 받아서 처리
  //   const receiveMessage = (event: MessageEvent<string>) => {
  //     try {
  //       const data = JSON.parse(event.data) as {
  //         type: "kcpcert:done"

  //         orderId?: string

  //         user_name?: string
  //         phone_no?: string

  //         is_parent?: boolean
  //       }

  //       if (data.type === "kcpcert:done") {
  //         // eslint-disable-next-line no-console
  //         console.log("KCP Cert result =>", data)

  //         setVerifiedRefId(data.orderId!)
  //         if (data.is_parent === true) {
  //           setParentName(data.user_name!)
  //           setParentPhone(data.phone_no!)
  //           setIsVerifiedPhoneIsParent(true)
  //         } else {
  //           setStudentName(data.user_name!)
  //           setStudentPhone(data.phone_no!)
  //           setIsVerifiedPhoneIsParent(false)
  //         }

  //         kcpAuthPop.current!.close()
  //       }
  //     } catch {} // eslint-disable-line no-empty
  //   }

  //   window.addEventListener("message", receiveMessage)

  //   return () => {
  //     window.removeEventListener("message", receiveMessage)
  //   }
  // }, [])

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={e => {
        e.preventDefault()

        window.scrollTo({
          top: 0,
          behavior: "instant",
        })

        onNext({
          userInfo: {
            id: parseInt(studentId, 10),
            name: studentName,
            phone: studentPhone,
            verifiedRefId: "",
            isVerifiedPhoneIsParent: false,
          },
          parentInfo: {
            name: parentName,
            relationship: parentRelationship,
            phone: parentPhone,
          },
          applingClubs,
        })
      }}
    >
      <div className="h-0.5 bg-gray-900" />

      <div className="flex flex-col gap-8">
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <div className="flex w-full flex-col gap-5">
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

          <div className="flex w-full flex-col gap-5">
            <label
              htmlFor="student-name"
              className="cursor-pointer text-2xl font-bold"
            >
              학생 이름
            </label>
            <TextInput
              id="student-name"
              type="text"
              // placeholder={
              //   !isVerifiedPhoneIsParent
              //     ? "실명 인증 후 자동 입력됩니다."
              //     : "예) 홍길동"
              // }
              placeholder="예) 홍길동"
              value={studentName}
              onChange={e => setStudentName(e.target.value)}
              // readOnly={!isVerifiedPhoneIsParent}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <label
            htmlFor="student-phone"
            className="cursor-pointer text-2xl font-bold"
          >
            학생 전화번호
          </label>
          <div className="flex w-full flex-col items-center gap-4 md:flex-row">
            <TextInput
              id="student-phone"
              type="tel"
              className="w-full flex-1 md:w-auto"
              // placeholder={
              //   !isVerifiedPhoneIsParent
              //     ? "실명 인증 후 자동 입력됩니다."
              //     : "예) 01000000000"
              // }
              placeholder="예) 01000000000"
              maxLength={11}
              pattern="01[0-9][0-9]{7,8}"
              value={studentPhone}
              onChange={e => {
                // Non-number characters are not allowed
                if (!/^\d*$/.test(e.target.value)) return

                setStudentPhone(e.target.value)
              }}
              // readOnly={!isVerifiedPhoneIsParent}
              required
            />

            {/* <Button
              type="button"
              className="w-full px-6 py-4 md:w-fit"
              onClick={() => requestVerifyPhone()}
              disabled={!!verifiedRefId}
            >
              {verifiedRefId ? "인증 완료" : "실명 인증"}
            </Button> */}
          </div>
        </div>

        <div className="flex flex-col gap-6 rounded-lg bg-gray-900 px-4 py-5 text-gray-200">
          <span className="inline-flex items-center gap-3 font-bold">
            <ExclamationCircleIcon className="size-5" />
            잠깐! 본인 명의 휴대폰이 없거나 실명 인증에 어려움이
            있으신가요?
          </span>

          <div className="inline-flex flex-col gap-2">
            <span className="text-sm font-bold">
              본인 명의의 휴대폰이 없으신 경우,
            </span>

            <span className="text-gray-300">
              부모님의 휴대전화 번호로 인증을 진행해 주세요. 이 경우,
              학생 이름을 직접 입력하실 수 있습니다.
            </span>
          </div>

          <div className="h-0.5 bg-gray-700" />

          <div className="inline-flex flex-col gap-2">
            <span className="text-sm font-bold">
              실명인증에 어려움이 있으신 경우,
            </span>

            <span className="text-gray-300">
              화면 하단 채팅 상담 혹은 고객센터 (070-4138-4014)를
              통하여, 오류 메시지를 알려주시면 친절히
              도와드리겠습니다.
            </span>
            <span className="text-gray-300">
              실명인증은 최초 접수 시 1회 진행되며, 이후에는 진행하지
              않습니다.
            </span>
          </div>
        </div>
      </div>

      <div className="h-0.5 bg-gray-900" />

      <div className="flex flex-col gap-8">
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <div className="flex w-full flex-col gap-5">
            <label
              htmlFor="parent-name"
              className="cursor-pointer text-2xl font-bold"
            >
              학부모 이름
            </label>
            <TextInput
              id="parent-name"
              type="text"
              placeholder="예) 홍길동"
              value={parentName}
              onChange={e => setParentName(e.target.value)}
              // readOnly={isVerifiedPhoneIsParent}
              required
            />
          </div>

          <div className="flex w-full flex-col gap-5">
            <label
              htmlFor="parent-relationship"
              className="cursor-pointer text-2xl font-bold"
            >
              학생 간 관계
            </label>
            <TextInput
              id="parent-relationship"
              type="text"
              placeholder="예) 모"
              value={parentRelationship}
              onChange={e => setParentRelationship(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <label
            htmlFor="parent-phone"
            className="cursor-pointer text-2xl font-bold"
          >
            학부모 전화번호
          </label>
          <TextInput
            id="parent-phone"
            type="tel"
            className="flex-1"
            placeholder="예) 01000000000"
            maxLength={11}
            pattern="01[0-9][0-9]{7,8}"
            value={parentPhone}
            onChange={e => {
              // Non-number characters are not allowed
              if (!/^\d*$/.test(e.target.value)) return

              setParentPhone(e.target.value)
            }}
            // readOnly={isVerifiedPhoneIsParent}
            required
          />
        </div>
      </div>

      <div className="h-0.5 bg-gray-900" />

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <div className="inline-flex flex-col gap-3">
            <span className="text-2xl font-bold">
              학생 지원 동아리
            </span>
            <span className="text-sm text-gray-500">
              지원하고자 하는 동아리를 1개 이상 선택하여 주세요.
            </span>
          </div>

          <div className="flex w-full flex-col gap-5 md:flex-row">
            <Select
              className="w-full"
              value={applingClubs[0]}
              onChange={e => {
                setApplingClubs(prev => {
                  const newArr = [...prev]
                  newArr[0] = e.target.value
                  return newArr
                })
              }}
              required
            >
              <option value="" disabled hidden>
                지원 동아리 1
              </option>

              {clubs
                .filter(
                  club =>
                    applingClubs[1] !== club.id &&
                    applingClubs[2] !== club.id,
                )
                .map(club => (
                  <option value={club.id} key={club.id}>
                    {club.name.split(" ")[1]}
                  </option>
                ))}
            </Select>

            <Select
              className="w-full"
              value={applingClubs[1]}
              onChange={e => {
                setApplingClubs(prev => {
                  const newArr = [...prev]
                  newArr[1] = e.target.value
                  return newArr
                })
              }}
            >
              {applingClubs[1] === "" ? (
                <option value="" disabled hidden>
                  지원 동아리 2
                </option>
              ) : (
                <option value="">지원 안함</option>
              )}

              {clubs
                .filter(
                  club =>
                    applingClubs[0] !== club.id &&
                    applingClubs[2] !== club.id,
                )
                .map(club => (
                  <option value={club.id} key={club.id}>
                    {club.name.split(" ")[1]}
                  </option>
                ))}
            </Select>

            <Select
              className="w-full"
              value={applingClubs[2]}
              onChange={e => {
                setApplingClubs(prev => {
                  const newArr = [...prev]
                  newArr[2] = e.target.value
                  return newArr
                })
              }}
            >
              {applingClubs[2] === "" ? (
                <option value="" disabled hidden>
                  지원 동아리 3
                </option>
              ) : (
                <option value="">지원 안함</option>
              )}

              {clubs
                .filter(
                  club =>
                    applingClubs[0] !== club.id &&
                    applingClubs[1] !== club.id,
                )
                .map(club => (
                  <option value={club.id} key={club.id}>
                    {club.name.split(" ")[1]}
                  </option>
                ))}
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-6 rounded-lg bg-gray-900 px-4 py-5 text-gray-200">
          <span className="inline-flex items-center gap-3 font-bold">
            <ExclamationCircleIcon className="size-5" />
            잠깐! 지원 동아리 2/3을 선택하고 싶지 않으신가요?
          </span>

          <div className="inline-flex flex-col gap-2">
            <span className="text-sm font-bold">
              아직 지원 동아리 1/2을 선택하지 않으셨다면,
            </span>

            <span className="text-gray-300">
              지원 동아리 1/2을 선택하지 않고 바로 다음 단계로 넘어갈
              수 있습니다.
            </span>
          </div>

          <div className="h-0.5 bg-gray-700" />

          <div className="inline-flex flex-col gap-2">
            <span className="text-sm font-bold">
              이미 지원 동아리 1/2을 선택하셨다면,
            </span>

            <span className="text-gray-300">
              다시 지원 동아리 1/2 옵션에서 &apos;지원 안함&apos;를
              선택해 주세요.
            </span>
          </div>
        </div>
      </div>

      <div className="h-0.5 bg-gray-900" />

      <div className="flex w-full gap-5">
        <Button
          type="button"
          className="w-full border-gray-900 bg-gray-900 font-bold hover:bg-gray-800 focus:bg-gray-800 focus:outline-gray-700 active:bg-gray-800"
          onClick={() => onPrev()}
        >
          <ArrowLeftIcon className="size-5" /> 이전
        </Button>

        <Button type="submit" className="w-full font-bold">
          다음 <ArrowRightIcon className="size-5" />
        </Button>
      </div>
    </form>
  )
}

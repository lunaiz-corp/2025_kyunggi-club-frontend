import type { Metadata } from "next"
import { notFound } from "next/navigation"

import * as clubsJson from "@/data/clubs.json"

import TitleBar from "@/components/common/TitleBar"

import RegisterForm from "../_components/RegisterForm"
import AccountListTable from "../_components/Table"

const { clubs } = clubsJson

export const metadata: Metadata = {
  title: "동아리 계정 관리",
  openGraph: {
    title: "동아리 계정 관리",
  },
  twitter: {
    title: "동아리 계정 관리",
  },
}

export default async function ClubAccountDetail({
  params,
}: Readonly<{
  params: Promise<{ id: string }>
}>) {
  const { id } = await params
  const currentClub = clubs.find(club => club.id === id)

  if (!currentClub) {
    return notFound()
  }

  return (
    <div className="flex flex-col gap-10">
      <TitleBar
        category="동아리 관리 / 동아리 계정 관리"
        title={currentClub.name.split(" ")[1]}
      />

      <span className="-mb-5 text-gray-400">
        &#8251; 일괄 등록이 필요한 경우, 운영팀에 연락해 주세요.
      </span>

      <RegisterForm id={id} />
      <AccountListTable id={id} />
    </div>
  )
}

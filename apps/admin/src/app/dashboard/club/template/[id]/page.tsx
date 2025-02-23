import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { clubs } from "@/data/clubs.json"

import TitleBar from "@/components/common/TitleBar"
import Template from "../_components/Template"

export const metadata: Metadata = {
  title: "동아리 지원서 양식 관리",
  openGraph: {
    title: "동아리 지원서 양식 관리",
  },
  twitter: {
    title: "동아리 지원서 양식 관리",
  },
}

export default async function ClubTemplateDetail({
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
        category="동아리 관리 / 지원서 양식 관리"
        title={currentClub.name.split(" ")[1]}
      />

      <Template />
    </div>
  )
}

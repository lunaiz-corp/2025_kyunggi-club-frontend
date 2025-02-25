import type { Metadata } from "next"
import { notFound } from "next/navigation"

import * as clubsJson from "@/data/clubs.json"

import Template from "../_components/Template"

const { clubs } = clubsJson

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
      <Template club={currentClub} />
    </div>
  )
}

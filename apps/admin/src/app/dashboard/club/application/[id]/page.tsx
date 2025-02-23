import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { clubs } from "@/data/clubs.json"

import TitleBar from "@/components/common/TitleBar"

export const metadata: Metadata = {
  title: "동아리 접수된 지원서 목록",
  openGraph: {
    title: "동아리 접수된 지원서 목록",
  },
  twitter: {
    title: "동아리 접수된 지원서 목록",
  },
}

export default async function ClubApplicationDetail({
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
        category="동아리 관리 / 접수된 지원서 목록"
        title={currentClub.name.split(" ")[1]}
      />
    </div>
  )
}

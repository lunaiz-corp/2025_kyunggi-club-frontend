import type { Metadata } from "next"
import { notFound } from "next/navigation"

import * as clubsJson from "@/data/clubs.json"

import Preview from "./_components/Preview"

const { clubs } = clubsJson

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
  params: Promise<{ id: string; studentId: number }>
}>) {
  const { id, studentId } = await params
  const currentClub = clubs.find(club => club.id === id)

  if (!currentClub || Number.isNaN(Number(studentId))) {
    return notFound()
  }

  return (
    <div className="flex flex-col gap-10">
      {/* <Preview club={currentClub} form={MOCK_FORM} /> */}
      <Preview club={currentClub} studentId={studentId} />
    </div>
  )
}

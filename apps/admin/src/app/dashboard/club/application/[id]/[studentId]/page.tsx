import type { Metadata } from "next"
import { notFound } from "next/navigation"

import * as clubsJson from "@/data/clubs.json"

import Preview from "./_components/Preview"
import { CurrentStatus, SubmittedForm } from "../_components/types"

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
  params: Promise<{ id: string; studentId: string }>
}>) {
  const { id, studentId } = await params
  const currentClub = clubs.find(club => club.id === id)

  if (!currentClub || Number.isNaN(Number(studentId))) {
    return notFound()
  }

  const MOCK_FORM: SubmittedForm = {
    userInfo: {
      id: Number(studentId),
      name: "홍길동",
      phone: "01000000000",
    },

    parentInfo: {
      name: "홍길동",
      relationship: "어머니",
      phone: "01000000000",
    },

    applingClubs: ["list", "kec", "kphc"],
    currentStatus: [
      {
        club: "list",
        status: CurrentStatus.PASSED,
      },
      {
        club: "kec",
        status: CurrentStatus.WAITING,
      },
      {
        club: "kphc",
        status: CurrentStatus.REJECTED,
      },
    ],

    formAnswers: [
      {
        club: "list",
        answers: [
          {
            id: 1,
            answer: "응답 1",
          },
          {
            id: 2,
            answer: "응답 2",
          },
          {
            id: 3,
            answer: "옵션 1",
          },
          {
            id: 4,
            answer: "옵션 2",
          },
          {
            id: 5,
            answer: [
              {
                name: "file1.jpg",
                url: "https://user-content.kyunggi.club/file1.jpg",
              },
            ],
          },
        ],
      },
      {
        club: "kec",
        answers: [
          {
            id: 1,
            answer: "응답 1",
          },
          {
            id: 2,
            answer: "응답 2",
          },
          {
            id: 3,
            answer: "옵션 1",
          },
          {
            id: 4,
            answer: "옵션 2",
          },
          {
            id: 5,
            answer: [
              {
                name: "file1.jpg",
                url: "https://user-content.kyunggi.club/file1.jpg",
              },
            ],
          },
        ],
      },
      {
        club: "kphc",
        answers: [
          {
            id: 1,
            answer: "응답 1",
          },
          {
            id: 2,
            answer: "응답 2",
          },
          {
            id: 3,
            answer: "옵션 1",
          },
          {
            id: 4,
            answer: "옵션 2",
          },
          {
            id: 5,
            answer: [
              {
                name: "file1.jpg",
                url: "https://user-content.kyunggi.club/file1.jpg",
              },
            ],
          },
        ],
      },
    ],
  }

  return (
    <div className="flex flex-col gap-10">
      <Preview club={currentClub} form={MOCK_FORM} />
    </div>
  )
}

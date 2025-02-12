"use server"

import { CurrentStatus, SubmittedForm } from "./types"

export async function retrieveSubmittedForm({
  studentId,
  studentName,
  password,
}: {
  studentId: string
  studentName: string
  password: string
}): Promise<{
  result: "SUCCESS" | "ERROR"
  data: SubmittedForm | null
  error: {
    code: string
    message: string
  } | null
}> {
  if (
    studentId !== "12345" ||
    studentName !== "홍길동" ||
    password !== "123456"
  ) {
    return {
      result: "ERROR",
      data: null,
      error: {
        code: "NOT_FOUND",
        message: "일치하는 지원서를 찾을 수 없습니다.",
      },
    }
  }

  return {
    result: "SUCCESS",
    data: {
      userInfo: {
        id: studentId,
        name: studentName,
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
    },
    error: null,
  }
}

export async function generatePdfReport() {
  // TODO: Implement this function
  return null
}

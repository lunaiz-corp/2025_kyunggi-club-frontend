import type { UploadedFile } from "@packages/ui/components/krds/Input/FileUpload"

export enum CurrentStatus {
  PASSED = "PASSED",
  WAITING = "WAITING",
  REJECTED = "REJECTED",
  FINAL_SUBMISSION = "FINAL_SUBMISSION",
}

export const statusInText = {
  [CurrentStatus.PASSED]: "최종 합격",
  [CurrentStatus.WAITING]: "결과 대기중",
  [CurrentStatus.REJECTED]: "최종 탈락",
  [CurrentStatus.FINAL_SUBMISSION]: "최종 지원 대기",
}

export type SubmittedFormForList = {
  userInfo: {
    id: number // 학번
    name: string // 이름
  }

  applingClubs: string[]
  currentStatus: {
    club: string // 학생 지망 동아리
    status: CurrentStatus
  }[]

  formAnswers: {
    club: string // 학생 지망 동아리
    answers: {
      id: number
      answer: string | UploadedFile[]
    }[]
  }[]
}

export type SubmittedForm = SubmittedFormForList & {
  userInfo: {
    phone: string // 전화번호
  }

  parentInfo: {
    name: string // 부모님 이름
    relationship: string // 학생 간 관계
    phone: string // 부모님 전화번호
  }
}

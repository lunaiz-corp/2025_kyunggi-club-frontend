import { UploadedFile } from "@packages/ui/components/krds/Input/FileUpload"

export enum CurrentStatus {
  WAITING = "WAITING",

  DOCUMENT_PASSED = "DOCUMENT_PASSED",
  EXAM_PASSED = "EXAM_PASSED",
  INTERVIEW_PASSED = "INTERVIEW_PASSED",

  DOCUMENT_REJECTED = "DOCUMENT_REJECTED",
  EXAM_REJECTED = "EXAM_REJECTED",
  INTERVIEW_REJECTED = "INTERVIEW_REJECTED",

  FINAL_PASSED = "FINAL_PASSED",
  FINAL_REJECTED = "FINAL_REJECTED",
  FINAL_SUBMISSION = "FINAL_SUBMISSION",
}

export type BaseSubmittedForm = {
  userInfo: {
    id: number // 학번
    name: string // 이름
    phone: string // 전화번호
  }

  applingClubs: string[]
}

export type SubmittedFormForList = BaseSubmittedForm & {
  applingClubs: string[]
}

export type SubmittedForm = BaseSubmittedForm & {
  currentStatus: CurrentStatus

  parentInfo: {
    name: string // 부모님 이름
    relationship: string // 학생 간 관계
    phone: string // 부모님 전화번호
  }

  formAnswers: {
    id: number
    answer: string | UploadedFile[]
  }[]
}

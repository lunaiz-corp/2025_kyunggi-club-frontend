import type { UploadedFile } from "@packages/ui/components/krds/Input/FileUpload"
import type { DataNeedsToBeFilled as Step2Data } from "../new/_funnels/step2"

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

export const statusInText = {
  [CurrentStatus.WAITING]: "서류 심사",

  [CurrentStatus.DOCUMENT_PASSED]: "서류 통과",
  [CurrentStatus.EXAM_PASSED]: "지필 통과",
  [CurrentStatus.INTERVIEW_PASSED]: "면접 통과",

  [CurrentStatus.DOCUMENT_REJECTED]: "서류 탈락",
  [CurrentStatus.EXAM_REJECTED]: "지필 탈락",
  [CurrentStatus.INTERVIEW_REJECTED]: "면접 탈락",

  [CurrentStatus.FINAL_PASSED]: "최종 합격",
  [CurrentStatus.FINAL_REJECTED]: "최종 불합격",
  [CurrentStatus.FINAL_SUBMISSION]: "최종 지원 대기",
}

export type SubmittedForm = {
  userInfo: {
    id: string // 학번
    name: string // 이름
  }

  applingClubs: Step2Data["applingClubs"]
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

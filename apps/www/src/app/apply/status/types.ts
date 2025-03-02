import type { UploadedFile } from "@packages/ui/components/krds/Input/FileUpload"
import type { DataNeedsToBeFilled as Step2Data } from "../new/_funnels/step2"

export enum CurrentStatus {
  PASSED = "PASSED",
  WAITING = "WAITING",
  REJECTED = "REJECTED",
  FINAL_SUBMISSION = "FINAL_SUBMISSION",
}

export const statusInText = {
  [CurrentStatus.PASSED]: "최종 합격",
  [CurrentStatus.WAITING]: "결과 대기",
  [CurrentStatus.REJECTED]: "최종 불합격",
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

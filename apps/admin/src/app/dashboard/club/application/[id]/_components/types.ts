/* eslint-disable import/prefer-default-export */

import { CurrentStatus } from "@/api/types/application"

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

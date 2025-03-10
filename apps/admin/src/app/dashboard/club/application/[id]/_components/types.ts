/* eslint-disable import/prefer-default-export */

import { CurrentStatus } from "@/api/types/application"

export const statusInText = {
  [CurrentStatus.PASSED]: "최종 합격",
  [CurrentStatus.WAITING]: "결과 대기중",
  [CurrentStatus.REJECTED]: "최종 탈락",
  [CurrentStatus.FINAL_SUBMISSION]: "최종 지원 대기",
}

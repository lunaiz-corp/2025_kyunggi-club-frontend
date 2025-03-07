/* eslint-disable import/prefer-default-export */

import { ServiceStatus } from "@/api/types/schedule"

export const statusInText = {
  [ServiceStatus.OPEN]: "오픈",
  [ServiceStatus.QA]: "가오픈",
  [ServiceStatus.MAINTENANCE]: "점검",
}

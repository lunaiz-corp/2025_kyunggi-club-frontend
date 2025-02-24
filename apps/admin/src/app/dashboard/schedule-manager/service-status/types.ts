export enum ServiceStatus {
  OPEN = "OPEN",
  QA = "QA",
  MAINTENANCE = "MAINTENANCE",
}

export const statusInText = {
  [ServiceStatus.OPEN]: "오픈",
  [ServiceStatus.QA]: "가오픈",
  [ServiceStatus.MAINTENANCE]: "점검",
}

export enum ServiceStatus {
  OPEN = "OPEN",
  QA = "QA",
  MAINTENANCE = "MAINTENANCE",
}

export type Status = {
  status: ServiceStatus
}

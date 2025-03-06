export enum Preset {
  // 운영 일정
  OPERATION_START = "OPERATION_START",
  OPERATION_PRESTART = "OPERATION_PRESTART",
  OPERATION_MAINTENANCE_START = "OPERATION_MAINTENANCE_START",
  OPERATION_MAINTENANCE_END = "OPERATION_MAINTENANCE_END",

  // 모집 일정
  APPLICATION_START = "APPLICATION_START",
  APPLICATION_END = "APPLICATION_END",

  ETC = "ETC",
}

export type Schedule = {
  id: number
  title: string

  category: Preset
  club: string

  start_at: string
  created_at: string
}

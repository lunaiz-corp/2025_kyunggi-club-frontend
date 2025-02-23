export enum QuestionType {
  SHORT_INPUT = "SHORT_INPUT",
  LONG_INPUT = "LONG_INPUT",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  DROPDOWN = "DROPDOWN",
  FILE_UPLOAD = "FILE_UPLOAD",
}

export type QuestionObject = {
  id: number
  question: string

  type: QuestionType
  options?: string[]
  maxFiles?: number

  required: boolean
}

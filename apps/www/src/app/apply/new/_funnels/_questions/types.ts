import type { Dispatch, SetStateAction } from "react"

export type FormAnswers = {
  id: number // 질문 번호
  answer: string | File[] // 답변
}

export enum QuestionType {
  SHORT_INPUT = "SHORT_INPUT",
  LONG_INPUT = "LONG_INPUT",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  DROPDOWN = "DROPDOWN",
  FILE_UPLOAD = "FILE_UPLOAD",
}

export type QuestionCommonProps = {
  id: number
  question: string
  options?: string[]

  required: boolean

  formAnswersState: [
    FormAnswers[],
    Dispatch<SetStateAction<FormAnswers[]>>,
  ]
}

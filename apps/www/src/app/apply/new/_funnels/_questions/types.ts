import type { Dispatch, SetStateAction } from "react"

export type FormAnswers = {
  id: number // 질문 번호
  answer: string | File[] // 답변
}

export type QuestionCommonProps = {
  id: number
  question: string

  required: boolean

  formAnswersState: [
    FormAnswers[],
    Dispatch<SetStateAction<FormAnswers[]>>,
  ]
}

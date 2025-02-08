import { useEffect, useRef, useState } from "react"
import { Textarea } from "@packages/ui/components/krds/Input"

import type { QuestionCommonProps } from "../types"

/* 장문형 */
export default function LongInput({
  id,
  question,
  required,
  formAnswersState,
}: Readonly<QuestionCommonProps>) {
  const [formAnswers, setFormAnswers] = formAnswersState
  const [currentAnswer, setCurrentAnswer] = useState<string>("")

  const havePrefilled = useRef<boolean>(false)

  useEffect(() => {
    if (!havePrefilled.current && formAnswers.length > 0) {
      if (formAnswers.find(formAnswer => formAnswer.id === id)) {
        setCurrentAnswer(
          formAnswers.find(formAnswer => formAnswer.id === id)!
            .answer as string,
        )
      }

      havePrefilled.current = true
    }
  }, [formAnswers, id])

  const setAndSyncAnswer = (input: string) => {
    setCurrentAnswer(input)

    if (formAnswers.find(formAnswer => formAnswer.id === id)) {
      setFormAnswers(prev =>
        prev.map(formAnswer =>
          formAnswer.id === id
            ? { ...formAnswer, answer: input }
            : formAnswer,
        ),
      )
    } else {
      setFormAnswers(prev => [...prev, { id, answer: input }])
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <label
        htmlFor={`q-${id}`}
        className="cursor-pointer text-2xl font-bold"
      >
        Q. {question}
      </label>

      <Textarea
        id={`q-${id}`}
        placeholder="응답을 입력하세요."
        className="h-40"
        required={required}
        value={currentAnswer}
        onChange={e => setAndSyncAnswer(e.target.value)}
      />
    </div>
  )
}

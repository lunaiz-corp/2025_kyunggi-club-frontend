import { useEffect, useRef, useState } from "react"
import Input from "@packages/ui/components/krds/Input"

import type { QuestionCommonProps } from "./types"

/* 단답형 */
export default function ShortInput({
  id,
  question,
  required,
  formAnswersState,
}: Readonly<QuestionCommonProps>) {
  const [formAnswers, setFormAnswers] = formAnswersState
  const [currentAnswer, setCurrentAnswer] = useState<string>("")

  const havePrefilled = useRef<boolean>(false)

  useEffect(() => {
    if (
      !havePrefilled.current &&
      formAnswers.find(formAnswer => formAnswer.id === id)
    ) {
      setCurrentAnswer(
        formAnswers.find(formAnswer => formAnswer.id === id)!.answer,
      )

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

      <Input
        id={`q-${id}`}
        type="text"
        placeholder="응답을 입력하세요."
        required={required}
        value={currentAnswer}
        onChange={e => setAndSyncAnswer(e.target.value)}
      />
    </div>
  )
}

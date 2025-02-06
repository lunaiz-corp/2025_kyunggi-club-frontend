import { useEffect, useRef, useState } from "react"
import Select from "@packages/ui/components/krds/Select"

import type { QuestionCommonProps } from "./types"

/* 드롭다운형 */
export default function Dropdown({
  id,
  question,
  options,
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
        formAnswers.find(formAnswer => formAnswer.id === id)!
          .answer as string,
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

      <Select
        id={`q-${id}`}
        required={required}
        value={currentAnswer}
        onChange={e => setAndSyncAnswer(e.target.value)}
      >
        <option value="" disabled hidden>
          응답을 선택하세요.
        </option>
        {options!.map((option, index) => (
          <option key={`q-${id}-${index.toString()}`} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  )
}

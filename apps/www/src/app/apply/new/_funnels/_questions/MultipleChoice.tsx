/* eslint-disable jsx-a11y/label-has-associated-control */

import { useEffect, useState } from "react"
import Checkbox from "@packages/ui/components/Checkbox"
import type { QuestionCommonProps } from "./types"

/* 객관식 */
export default function MultipleChoice({
  id,
  question,
  options,
  formAnswersState,
}: Readonly<QuestionCommonProps & { options: string[] }>) {
  const [formAnswers, setFormAnswers] = formAnswersState
  const [currentAnswer, setCurrentAnswer] = useState<string[]>([])

  useEffect(() => {
    if (formAnswers.find(formAnswer => formAnswer.id === id)) {
      setCurrentAnswer(
        (
          formAnswers.find(formAnswer => formAnswer.id === id)!
            .answer as string
        ).split(","),
      )
    }
  }, [formAnswers, id])

  const setAndSyncAnswer = (input: string[]) => {
    setCurrentAnswer(input)

    if (formAnswers.find(formAnswer => formAnswer.id === id)) {
      setFormAnswers(prev =>
        prev.map(formAnswer =>
          formAnswer.id === id
            ? { ...formAnswer, answer: input.join(",") }
            : formAnswer,
        ),
      )
    } else {
      setFormAnswers(prev => [
        ...prev,
        { id, answer: input.join(",") },
      ])
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <label className="cursor-pointer text-2xl font-bold">
        Q. {question}
      </label>

      {options.map((option, index) => (
        <div
          key={`q-${id}-${index.toString()}`}
          className="inline-flex items-center gap-3"
        >
          <Checkbox
            id={`q-${id}-${index.toString()}`}
            checked={currentAnswer.includes(option)}
            onChange={e => {
              const { checked } = e.target

              if (checked) {
                setAndSyncAnswer([...currentAnswer, option])
              } else {
                setAndSyncAnswer(
                  currentAnswer.filter(ans => ans !== option),
                )
              }
            }}
          />

          <label
            htmlFor={`q-${id}-${index.toString()}`}
            className="inline-flex cursor-pointer items-center gap-2 text-lg"
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  )
}

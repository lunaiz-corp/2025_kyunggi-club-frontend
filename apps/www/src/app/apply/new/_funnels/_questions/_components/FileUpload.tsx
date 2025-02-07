import { useEffect, useRef, useState } from "react"
import FileUploadInput from "@packages/ui/components/krds/Input/FileUpload"

import type { QuestionCommonProps } from "../types"

/* 파일 업로드형 */
export default function FileUpload({
  id,
  question,
  maxFiles,
  required,
  formAnswersState,
}: Readonly<QuestionCommonProps & { maxFiles: number }>) {
  const [formAnswers, setFormAnswers] = formAnswersState
  const [currentAnswer, setCurrentAnswer] = useState<File[]>([])

  const havePrefilled = useRef<boolean>(false)

  useEffect(() => {
    if (!havePrefilled.current) {
      if (formAnswers.find(formAnswer => formAnswer.id === id)) {
        setCurrentAnswer(
          formAnswers.find(formAnswer => formAnswer.id === id)!
            .answer as File[],
        )
      }

      havePrefilled.current = true
    }
  }, [formAnswers, id])

  const setAndSyncAnswer = () => {
    if (formAnswers.find(formAnswer => formAnswer.id === id)) {
      setFormAnswers(prev =>
        prev.map(formAnswer =>
          formAnswer.id === id
            ? { ...formAnswer, answer: currentAnswer }
            : formAnswer,
        ),
      )
    } else {
      setFormAnswers(prev => [...prev, { id, answer: currentAnswer }])
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

      <FileUploadInput
        id={`q-${id}`}
        name={`q-${id}`}
        maxFiles={maxFiles === -1 ? Infinity : maxFiles}
        required={required}
        onFileSelect={() => setAndSyncAnswer()}
        fileListState={[currentAnswer, setCurrentAnswer]}
      />
    </div>
  )
}

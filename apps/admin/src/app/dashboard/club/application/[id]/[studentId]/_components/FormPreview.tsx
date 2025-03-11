"use client"

import { useEffect } from "react"
import toast from "react-hot-toast"

import { useQuery } from "@tanstack/react-query"
import { getForm } from "@/api/club"

import { TextInput } from "@packages/ui/components/krds/Input"
import { baseClass as textareaBaseClass } from "@packages/ui/components/krds/Input/Textarea"

import Checkbox from "@packages/ui/components/Checkbox"
import Select from "@packages/ui/components/krds/Select"

import {
  ReadOnlyFileList,
  type UploadedFile,
} from "@packages/ui/components/krds/Input/FileUpload"

import { QuestionType } from "@/api/types/form"
import type { SubmittedForm } from "@/api/types/application"
import { cn } from "@packages/ui/utils/tailwindMerge"

export default function FormPreview({
  club,
  form,
}: Readonly<{
  club: string
  form: Pick<SubmittedForm, "applingClubs" | "formAnswers">
}>) {
  const { error, data: questions } = useQuery({
    queryKey: ["questions", club],
    queryFn: () => getForm({ club }),
    retry: false,
  })

  useEffect(() => {
    if (error) {
      toast.error(
        error.message || "서버와의 통신 중 오류가 발생했습니다.",
      )
    }
  }, [error])

  return (
    <div className="mb-24 flex flex-col gap-10">
      <div className="h-0.5 bg-gray-800" />

      {questions?.map(question => {
        const answer = form.formAnswers.find(
          a => a.id === question.id,
        )!

        return (
          <div key={question.id} className="flex flex-col gap-5">
            <label
              htmlFor={`q-${question.id}`}
              className="cursor-pointer text-2xl font-bold"
            >
              Q. {question.question}
            </label>

            {question.type === QuestionType.SHORT_INPUT && (
              <TextInput
                key={question.id}
                id={`q-${question.id}`}
                type="text"
                placeholder=""
                className="bg-gray-800"
                value={(answer?.answer as string) || ""}
                disabled
              />
            )}

            {question.type === QuestionType.LONG_INPUT && (
              <div
                key={question.id}
                id={`q-${question.id}`}
                className={cn(textareaBaseClass, "bg-gray-800")}
              >
                {(answer?.answer as string) || ""}
              </div>
            )}

            {question.type === QuestionType.MULTIPLE_CHOICE && (
              <>
                {question.options!.map((option, index) => (
                  <div
                    key={`q-${question.id}-${index.toString()}`}
                    className="inline-flex items-center gap-3"
                  >
                    <Checkbox
                      id={`q-${question.id}-${index.toString()}`}
                      checked={(
                        (answer?.answer as string) || ""
                      ).includes(option)}
                      className="bg-gray-800"
                      disabled
                    />

                    <label
                      htmlFor={`q-${question.id}-${index.toString()}`}
                      className="inline-flex cursor-pointer items-center gap-2 text-lg"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </>
            )}

            {question.type === QuestionType.DROPDOWN && (
              <Select
                key={question.id}
                id={`q-${question.id}`}
                value={(answer?.answer as string) || ""}
                className="bg-gray-800"
                disabled
              >
                {question.options!.map((option, index) => (
                  <option
                    key={`q-${question.id}-${index.toString()}`}
                    value={option}
                  >
                    {option}
                  </option>
                ))}
              </Select>
            )}

            {question.type === QuestionType.FILE_UPLOAD && (
              <ReadOnlyFileList
                key={question.id}
                fileList={(answer?.answer as UploadedFile[]) || []}
                maxFiles={
                  question.maxFiles === -1
                    ? Infinity
                    : question.maxFiles!
                }
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

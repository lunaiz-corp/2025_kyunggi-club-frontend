import type { Dispatch, SetStateAction } from "react"

import { getForm } from "@/api/apply/form"
import { QuestionType } from "@/api/types/form"
import { useQuery } from "@tanstack/react-query"

import ScreenLoading from "@/components/ScreenLoading"

import {
  TextInput,
  Textarea,
} from "@packages/ui/components/krds/Input"
import Checkbox from "@packages/ui/components/Checkbox"
import Select from "@packages/ui/components/krds/Select"
import {
  ReadOnlyFileList,
  type UploadedFile,
} from "@packages/ui/components/krds/Input/FileUpload"

import { cn } from "@packages/ui/utils/tailwindMerge"

import * as clubsJson from "@/data/clubs.json"

import type { SubmittedForm } from "../status/types"

const { clubs } = clubsJson

export default function FormPreview({
  form,
  stepState,
}: Readonly<{
  form: Pick<SubmittedForm, "applingClubs" | "formAnswers">
  stepState: [string, Dispatch<SetStateAction<string>>]
}>) {
  const [step, setStep] = stepState

  const {
    isLoading,
    error,
    data: questions,
  } = useQuery({
    queryKey: ["questions", step],
    queryFn: () => getForm({ club: step }),
    retry: false,
  })

  const { answers } = form.formAnswers.find(
    answer => answer.club === step,
  )!

  return (
    <div className="flex flex-col gap-6">
      <div className="h-0.5 bg-gray-900" />

      <div className="inline-flex flex-col gap-5">
        <span className="text-xl">학생 지망 동아리</span>

        <div className="inline-flex gap-10 text-4xl font-bold">
          {form.applingClubs
            .filter(club => club !== "")
            .map(club => (
              <button
                key={club}
                type="button"
                className={cn(
                  "cursor-pointer opacity-10",
                  step === club && "opacity-100",
                )}
                onClick={() => {
                  setStep(club)
                }}
              >
                {clubs.find(c => c.id === club)!.name.split(" ")[1]}
              </button>
            ))}
        </div>
      </div>

      <div className="h-0.5 bg-gray-900" />

      {isLoading || error || !questions ? (
        <ScreenLoading />
      ) : (
        questions.map(question => {
          const answer = answers.find(a => a.id === question.id)!

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
                  value={(answer?.answer as string) || ""}
                  disabled
                />
              )}

              {question.type === QuestionType.LONG_INPUT && (
                <Textarea
                  key={question.id}
                  id={`q-${question.id}`}
                  placeholder=""
                  className="h-40"
                  value={(answer?.answer as string) || ""}
                  disabled
                />
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
        })
      )}
    </div>
  )
}

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

import { QuestionType } from "@/api/types/form"
import type { SubmittedForm } from "../../_components/types"

const MOCK_QUESTION = [
  {
    id: 1,
    question: "무임승차를 하실건가요?1",
    type: QuestionType.SHORT_INPUT,
    required: false,
  },
  {
    id: 2,
    question: "무임승차를 하실건가요?2",
    type: QuestionType.LONG_INPUT,
    required: false,
  },
  {
    id: 3,
    question: "무임승차를 하실건가요?3",
    type: QuestionType.MULTIPLE_CHOICE,
    options: ["옵션 1", "옵션 2"],
    required: false,
  },
  {
    id: 4,
    question: "무임승차를 하실건가요?4",
    type: QuestionType.DROPDOWN,
    options: ["옵션 1", "옵션 2"],
    required: false,
  },
  {
    id: 5,
    question: "무임승차를 하실건가요?5",
    type: QuestionType.FILE_UPLOAD,
    maxFiles: 10,
    required: false,
  },
]

export default function FormPreview({
  club,
  form,
}: Readonly<{
  club: string
  form: Pick<SubmittedForm, "applingClubs" | "formAnswers">
}>) {
  const { answers } = form.formAnswers.find(
    answer => answer.club === club,
  )!

  return (
    <div className="flex flex-col gap-6">
      <div className="h-0.5 bg-gray-800" />

      {MOCK_QUESTION.map(question => {
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
                className="bg-gray-800"
                value={(answer?.answer as string) || ""}
                disabled
              />
            )}

            {question.type === QuestionType.LONG_INPUT && (
              <Textarea
                key={question.id}
                id={`q-${question.id}`}
                placeholder=""
                className="h-40 bg-gray-800"
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

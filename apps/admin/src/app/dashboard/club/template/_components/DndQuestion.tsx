import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import {
  TextInput,
  Textarea,
} from "@packages/ui/components/krds/Input"
import Checkbox from "@packages/ui/components/Checkbox"
import { ReadOnlyFileList } from "@packages/ui/components/krds/Input/FileUpload"

import DndIcon from "@/assets/icons/dnd.svg"
import DeleteIcon from "@/assets/icons/delete.svg"

import { Input as FieldSizingInput } from "./lib/react-field-sizing-content"

import { type QuestionObject, QuestionType } from "./types"

export default function DndQuestion({
  question,
  onDelete,
  onQuestionNameChange,
}: Readonly<{
  question: QuestionObject
  onDelete: (id: number) => void
  onQuestionNameChange: (id: number, name: string) => void
}>) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: question.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col gap-5"
      style={style}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          title="질문 이동"
          className="inline-flex size-5 cursor-pointer items-center justify-center"
          {...attributes}
          {...listeners}
        >
          <DndIcon className="h-[15px] w-[9px] fill-gray-500" />
        </button>

        <label
          htmlFor={`q-${question.id}`}
          className="text-2xl font-bold"
        >
          Q.{" "}
          <FieldSizingInput
            type="text"
            defaultValue={question.question}
            className="border-0 bg-inherit p-0 text-2xl"
            fieldSizing="content"
            onChange={e =>
              onQuestionNameChange(question.id, e.target.value)
            }
          />
        </label>

        <button
          type="button"
          title="질문 삭제"
          className="ml-2 cursor-pointer"
          onClick={() => {
            // eslint-disable-next-line no-alert
            if (window.confirm("정말 삭제하시겠습니까?")) {
              onDelete(question.id)
            }
          }}
        >
          <DeleteIcon className="size-6 fill-gray-500" />
        </button>

        {/* TODO: 필수 여부 토글 버튼 */}
      </div>

      {question.type === QuestionType.SHORT_INPUT && (
        <TextInput
          key={question.id}
          id={`q-${question.id}`}
          type="text"
          placeholder=""
          className="bg-gray-800"
          disabled
        />
      )}

      {question.type === QuestionType.LONG_INPUT && (
        <Textarea
          key={question.id}
          id={`q-${question.id}`}
          placeholder=""
          className="h-40 bg-gray-800"
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
                disabled
              />

              <label
                htmlFor={`q-${question.id}-${index.toString()}`}
                className="inline-flex items-center gap-2 text-lg"
              >
                {option}
              </label>
            </div>
          ))}
        </>
      )}

      {question.type === QuestionType.DROPDOWN &&
        question.options!.map((option, index) => (
          <div
            key={`q-${question.id}-${index.toString()}`}
            className="rounded-lg border border-gray-800 bg-gray-900 p-4"
          >
            {option}
          </div>
        ))}

      {question.type === QuestionType.FILE_UPLOAD && (
        <ReadOnlyFileList
          key={question.id}
          fileList={[]}
          maxFiles={
            question.maxFiles === -1 ? Infinity : question.maxFiles!
          }
        />
      )}
    </div>
  )
}

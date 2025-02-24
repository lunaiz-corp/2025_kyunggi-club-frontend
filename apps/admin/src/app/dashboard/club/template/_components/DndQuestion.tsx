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
  onQuestionOptionAdded,
  onQuestionOptionDeleted,
  onQuestionOptionChange,
  onFileLimitChange,
}: Readonly<{
  question: QuestionObject
  onDelete: (id: number) => void
  onQuestionNameChange: (id: number, name: string) => void
  onQuestionOptionAdded: (id: number) => void
  onQuestionOptionDeleted: (id: number, option: number) => void
  onQuestionOptionChange: (
    id: number,
    option: number,
    name: string,
  ) => void
  onFileLimitChange: (id: number, limit: number) => void
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

        {/* 드롭다운, 체크박스 일 경우 옵션 추가 버튼 */}
        {[
          QuestionType.DROPDOWN,
          QuestionType.MULTIPLE_CHOICE,
        ].includes(question.type) && (
          <button
            type="button"
            title="옵션 추가"
            className="ml-2 cursor-pointer text-2xl text-gray-500"
            onClick={() => {
              onQuestionOptionAdded(question.id)
            }}
          >
            +
          </button>
        )}

        {/* 파일 업로드 일 경우 파일 개수 증가/감소 */}
        {question.type === QuestionType.FILE_UPLOAD && (
          <>
            <button
              type="button"
              title="파일 개수 증가"
              className="ml-2 cursor-pointer text-2xl text-gray-500"
              onClick={() => {
                onFileLimitChange(question.id, question.maxFiles! + 1)
              }}
            >
              +
            </button>

            <button
              type="button"
              title="파일 개수 감소"
              className="ml-2 cursor-pointer text-2xl text-gray-500"
              onClick={() => {
                onFileLimitChange(question.id, question.maxFiles! - 1)
              }}
            >
              -
            </button>
          </>
        )}
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
                checked
                disabled
              />

              <label
                htmlFor={`q-${question.id}-${index.toString()}`}
                className="inline-flex items-center gap-2 text-lg"
              >
                <span className="sr-only">{option}</span>

                <FieldSizingInput
                  type="text"
                  defaultValue={option}
                  className="border-0 bg-inherit p-0"
                  fieldSizing="content"
                  onChange={e =>
                    onQuestionOptionChange(
                      question.id,
                      index,
                      e.target.value,
                    )
                  }
                />

                <button
                  type="button"
                  title="옵션 삭제"
                  className="cursor-pointer"
                  onClick={() =>
                    onQuestionOptionDeleted(question.id, index)
                  }
                >
                  <DeleteIcon className="size-6 fill-gray-500" />
                </button>
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
            <FieldSizingInput
              type="text"
              defaultValue={option}
              className="border-0 bg-inherit p-0 pr-2"
              fieldSizing="content"
              onChange={e =>
                onQuestionOptionChange(
                  question.id,
                  index,
                  e.target.value,
                )
              }
            />
          </div>
        ))}

      {question.type === QuestionType.FILE_UPLOAD && (
        <ReadOnlyFileList
          key={question.id}
          fileList={[]}
          maxFiles={
            question.maxFiles === -1 ? Infinity : question.maxFiles!
          }
          shouldAlwaysMaxFilesVisible
        />
      )}
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"

import { getForm } from "@/api/club"
import { useQuery } from "@tanstack/react-query"

import { PencilIcon } from "@heroicons/react/24/solid"

import { Button } from "@packages/ui/components/krds/Action"
import TitleBar from "@/components/common/TitleBar"

import { type Question, QuestionType } from "@/api/types/form"
import DndQuestion from "./DndQuestion"

export default function Template({
  club,
}: Readonly<{
  club: { id: string; name: string }
}>) {
  const {
    isLoading: isSavedLoading,
    error: savedError,
    data: saved,
  } = useQuery({
    queryKey: ["templates", club.id],
    queryFn: () => getForm({ club: club.id }),
    retry: false,
  })

  const [questions, setQuestions] = useState<Question[]>([])
  const sensors = useSensors(useSensor(PointerSensor))

  useEffect(() => {
    if (savedError) {
      toast.error(
        savedError.message || "서버와의 통신 중 오류가 발생했습니다.",
      )
    }

    if (saved) {
      setQuestions(saved)
    }
  }, [savedError, saved])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setQuestions(qs => {
        const oldIndex = qs.findIndex(q => q.id === active.id)
        const newIndex = qs.findIndex(q => q.id === over?.id)

        return arrayMove(questions, oldIndex, newIndex)
      })
    }
  }

  const handleDelete = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id))
  }

  const handleQuestionNameChange = (id: number, name: string) => {
    setQuestions(qs =>
      qs.map(q => (q.id === id ? { ...q, question: name } : q)),
    )
  }

  const handleQuestionOptionAdded = (id: number) => {
    setQuestions(qs =>
      qs.map(q =>
        q.id === id
          ? {
              ...q,
              options: [...q.options!, "옵션을 입력해 주세요."],
            }
          : q,
      ),
    )
  }

  const handleQuestionOptionDeleted = (
    id: number,
    option: number,
  ) => {
    setQuestions(qs =>
      qs.map(q =>
        q.id === id
          ? {
              ...q,
              options: q.options!.filter(
                (_, index) => index !== option,
              ),
            }
          : q,
      ),
    )
  }

  const handleQuestionOptionChange = (
    id: number,
    option: number,
    name: string,
  ) => {
    setQuestions(qs =>
      qs.map(q =>
        q.id === id
          ? {
              ...q,
              options: q.options!.map((o, index) =>
                index === option ? name : o,
              ),
            }
          : q,
      ),
    )
  }

  const handleQuestionRequiredChange = (
    id: number,
    required: boolean,
  ) => {
    setQuestions(qs =>
      qs.map(q =>
        q.id === id
          ? {
              ...q,
              required,
            }
          : q,
      ),
    )
  }

  const handleFileLimitChange = (id: number, limit: number) => {
    setQuestions(qs =>
      qs.map(q =>
        q.id === id
          ? {
              ...q,
              maxFiles: limit,
            }
          : q,
      ),
    )
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <TitleBar
          category="동아리 관리 / 지원서 양식 관리"
          title={club.name.split(" ")[1]}
        />

        <Button
          type="button"
          className="mt-5 border-gray-100 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:outline-gray-100 active:bg-gray-200 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-300"
          onClick={async () => {
            const saveRequest = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/club/${club.id}/forms`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem(
                    "accessToken",
                  )}`,
                },
                body: JSON.stringify(questions),
              },
            )

            const saveResponse = await saveRequest.json()
            if (saveRequest.ok) {
              toast.success("양식을 저장했습니다.")
            } else {
              toast.error(
                saveResponse.message ||
                  "서버와의 통신 중 오류가 발생했습니다.",
              )

              // eslint-disable-next-line no-console
              console.error(saveResponse)
            }
          }}
        >
          <PencilIcon className="size-4 fill-gray-900" />
          <span className="text-gray-900">저장하기</span>
        </Button>
      </div>

      {!isSavedLoading && !savedError && saved && (
        <div className="flex flex-col gap-12">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={questions}
              strategy={verticalListSortingStrategy}
            >
              {questions.map(question => (
                <DndQuestion
                  key={question.id}
                  question={question}
                  onDelete={handleDelete}
                  onQuestionNameChange={handleQuestionNameChange}
                  onQuestionOptionAdded={handleQuestionOptionAdded}
                  onQuestionOptionDeleted={
                    handleQuestionOptionDeleted
                  }
                  onQuestionOptionChange={handleQuestionOptionChange}
                  onQuestionRequiredChange={
                    handleQuestionRequiredChange
                  }
                  onFileLimitChange={handleFileLimitChange}
                />
              ))}
            </SortableContext>
          </DndContext>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
            <Button
              type="button"
              className="w-full border-gray-100 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:outline-gray-100 active:bg-gray-200 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-300"
              onClick={() => {
                setQuestions(qs => [
                  ...qs,
                  {
                    id: qs.length + 1,
                    question: "질문을 입력하세요.",
                    type: QuestionType.SHORT_INPUT,
                    required: false,
                  },
                ])
              }}
            >
              <PencilIcon className="size-4 fill-gray-900" />
              <span className="text-gray-900">단답형</span>
            </Button>

            <Button
              type="button"
              className="w-full border-gray-100 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:outline-gray-100 active:bg-gray-200 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-300"
              onClick={() => {
                setQuestions(qs => [
                  ...qs,
                  {
                    id: qs.length + 1,
                    question: "질문을 입력하세요.",
                    type: QuestionType.LONG_INPUT,
                    required: false,
                  },
                ])
              }}
            >
              <PencilIcon className="size-4 fill-gray-900" />
              <span className="text-gray-900">장문형</span>
            </Button>

            <Button
              type="button"
              className="w-full border-gray-100 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:outline-gray-100 active:bg-gray-200 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-300"
              onClick={() => {
                setQuestions(qs => [
                  ...qs,
                  {
                    id: qs.length + 1,
                    question: "질문을 입력하세요.",
                    type: QuestionType.DROPDOWN,
                    options: ["선택지를 입력하세요."],
                    required: false,
                  },
                ])
              }}
            >
              <PencilIcon className="size-4 fill-gray-900" />
              <span className="text-gray-900">드롭다운</span>
            </Button>

            <Button
              type="button"
              className="w-full border-gray-100 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:outline-gray-100 active:bg-gray-200 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-300"
              onClick={() => {
                setQuestions(qs => [
                  ...qs,
                  {
                    id: qs.length + 1,
                    question: "질문을 입력하세요.",
                    type: QuestionType.MULTIPLE_CHOICE,
                    options: ["선택지를 입력하세요."],
                    required: false,
                  },
                ])
              }}
            >
              <PencilIcon className="size-4 fill-gray-900" />
              <span className="text-gray-900">객관식</span>
            </Button>

            <Button
              type="button"
              className="w-full border-gray-100 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:outline-gray-100 active:bg-gray-200 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-300"
              onClick={() => {
                setQuestions(qs => [
                  ...qs,
                  {
                    id: qs.length + 1,
                    question: "질문을 입력하세요.",
                    type: QuestionType.FILE_UPLOAD,
                    maxFiles: 10,
                    required: false,
                  },
                ])
              }}
            >
              <PencilIcon className="size-4 fill-gray-900" />
              <span className="text-gray-900">파일 업로드 </span>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

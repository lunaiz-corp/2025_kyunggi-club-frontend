"use client"

import { useState } from "react"

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

import { PencilIcon } from "@heroicons/react/24/solid"

import { Button } from "@packages/ui/components/krds/Action"

import TitleBar from "@/components/common/TitleBar"

import { type QuestionObject, QuestionType } from "./types"
import DndQuestion from "./DndQuestion"

export default function Template({
  club,
}: Readonly<{
  club: { id: string; name: string }
}>) {
  const [questions, setQuestions] = useState<QuestionObject[]>([
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
  ])

  const sensors = useSensors(useSensor(PointerSensor))

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

  return (
    <>
      <div className="flex items-center justify-between">
        <TitleBar
          category="동아리 관리 / 지원서 양식 관리"
          title={club.name.split(" ")[1]}
        />

        <Button
          type="button"
          className="border-gray-100 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:outline-gray-100 active:bg-gray-200 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-300"
        >
          <PencilIcon className="size-4 fill-gray-900" />
          <span className="text-gray-900">저장하기</span>
        </Button>
      </div>

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
                  options: [""],
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
                  options: [""],
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
    </>
  )
}

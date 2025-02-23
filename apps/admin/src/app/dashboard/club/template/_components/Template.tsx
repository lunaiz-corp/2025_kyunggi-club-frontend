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

import { type QuestionObject, QuestionType } from "./types"
import DndQuestion from "./DndQuestion"

export default function Template() {
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
    setQuestions(questions.filter(question => question.id !== id))
  }

  return (
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
            />
          ))}
        </SortableContext>
      </DndContext>

      {/* TODO: 질문 만들기 버튼 3개 추가하기 */}
    </div>
  )
}

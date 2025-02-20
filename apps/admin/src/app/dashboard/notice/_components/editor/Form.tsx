"use client"

import { useState } from "react"

import {
  ChevronLeftIcon,
  PencilIcon,
} from "@heroicons/react/24/solid"

import { NextLink, Button } from "@packages/ui/components/krds/Action"
import { TextInput } from "@packages/ui/components/krds/Input"

import Tiptap from "./Tiptap"

export default function NoticeForm({
  title,
  content,
}: Readonly<{
  title?: string
  content?: string
}>) {
  const [titleInput, setTitleInput] = useState(title ?? "")

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={e => {
        e.preventDefault()

        // eslint-disable-next-line no-console
        console.log("submit")
      }}
    >
      <div className="flex items-center gap-4">
        <NextLink href="/dashboard/notice" className="p-1.5">
          <ChevronLeftIcon className="size-5" />
        </NextLink>

        <TextInput
          type="text"
          placeholder="제목"
          className="w-full flex-1 px-4 py-3 font-bold"
          value={titleInput}
          onChange={e => setTitleInput(e.target.value)}
        />

        <Button type="submit" className="px-4 py-3">
          <PencilIcon className="size-4" />
          등록
        </Button>
      </div>

      <Tiptap content={content} />
    </form>
  )
}

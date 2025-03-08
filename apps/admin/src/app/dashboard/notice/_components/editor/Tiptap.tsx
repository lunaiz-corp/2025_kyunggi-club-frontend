"use client"

import { useEffect } from "react"
import type { Dispatch, SetStateAction } from "react"
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react"

import StarterKit from "@tiptap/starter-kit"

import Placeholder from "@tiptap/extension-placeholder"

import Typography from "@tiptap/extension-typography"
import TextAlign from "@tiptap/extension-text-align"
import TextStyle from "@tiptap/extension-text-style"
import Color from "@tiptap/extension-color"
import Underline from "@tiptap/extension-underline"
import Highlight from "@tiptap/extension-highlight"

import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"

import { cn } from "@packages/ui/utils/tailwindMerge"
import {
  BoldIcon,
  H1Icon,
  H2Icon,
  H3Icon,
  ItalicIcon,
  LinkIcon,
  LinkSlashIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "@heroicons/react/20/solid"
import { PhotoIcon } from "@heroicons/react/24/outline"

export default function Tiptap({
  contentState,
  editable,
}: Readonly<{
  contentState: [string | undefined, Dispatch<SetStateAction<string>>]
  editable: boolean
}>) {
  const [content, setContent] = contentState

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),

      Placeholder.configure({
        placeholder: "Write something …",
      }),

      Typography,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
      Underline,
      Highlight,

      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
      }),
      Image.configure({
        allowBase64: true,
        inline: true,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-gray prose-invert prose-base max-w-none focus:outline-none",
      },
    },
    content,
    onUpdate({ editor: _editor }) {
      setContent(_editor.getHTML())
    },

    editable,
    immediatelyRender: false,
  })

  useEffect(() => {
    if (editable) {
      const preventLeave = (e: BeforeUnloadEvent) => {
        e.preventDefault()
      }

      window.addEventListener("beforeunload", preventLeave)

      return () => {
        window.removeEventListener("beforeunload", preventLeave)
      }
    }

    window.removeEventListener("beforeunload", () => {})
    return () => {}
  }, [editable])

  return (
    <div
      className={cn(
        "min-h-[540px] rounded-lg p-6",
        editable && "bg-gray-800",
      )}
    >
      {editor && editable && (
        <BubbleMenu
          className="bubble-menu flex gap-3.5 rounded-md bg-gray-800 p-2"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(
              "inline-flex size-8 cursor-pointer items-center justify-center gap-3.5 rounded-md bg-gray-700 hover:bg-gray-600",
              editor.isActive("bold") && "bg-gray-600",
            )}
            title="굵게"
          >
            <BoldIcon className="size-4" />
          </button>

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleItalic().run()
            }
            className={cn(
              "inline-flex size-8 cursor-pointer items-center justify-center gap-3.5 rounded-md bg-gray-700 hover:bg-gray-600",
              editor.isActive("italic") && "bg-gray-600",
            )}
            title="기울임꼴"
          >
            <ItalicIcon className="size-4" />
          </button>

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleUnderline().run()
            }
            className={cn(
              "inline-flex size-8 cursor-pointer items-center justify-center gap-3.5 rounded-md bg-gray-700 hover:bg-gray-600",
              editor.isActive("underline") && "bg-gray-600",
            )}
            title="밑줄"
          >
            <UnderlineIcon className="size-4" />
          </button>

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleStrike().run()
            }
            className={cn(
              "inline-flex size-8 cursor-pointer items-center justify-center gap-3.5 rounded-md bg-gray-700 hover:bg-gray-600",
              editor.isActive("strike") && "bg-gray-600",
            )}
            title="취소선"
          >
            <StrikethroughIcon className="size-4" />
          </button>
        </BubbleMenu>
      )}

      {editor && editable && (
        <div className="mb-5 flex items-center gap-3.5 rounded-md bg-gray-700 p-2">
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={cn(
              "inline-flex size-8 cursor-pointer items-center justify-center gap-3.5 rounded-md bg-gray-700 hover:bg-gray-600",
              editor.isActive("heading", { level: 1 }) &&
                "bg-gray-600",
            )}
            title="제목 1"
          >
            <H1Icon className="size-4" />
          </button>

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={cn(
              "inline-flex size-8 cursor-pointer items-center justify-center gap-3.5 rounded-md bg-gray-700 hover:bg-gray-600",
              editor.isActive("heading", { level: 2 }) &&
                "bg-gray-600",
            )}
            title="제목 2"
          >
            <H2Icon className="size-4" />
          </button>

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={cn(
              "inline-flex size-8 cursor-pointer items-center justify-center gap-3.5 rounded-md bg-gray-700 hover:bg-gray-600",
              editor.isActive("heading", { level: 3 }) &&
                "bg-gray-600",
            )}
            title="제목 3"
          >
            <H3Icon className="size-4" />
          </button>

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().setNode("paragraph").run()
            }
            className={cn(
              "inline-flex size-8 cursor-pointer items-center justify-center gap-3.5 rounded-md bg-gray-700 hover:bg-gray-600",
              !editor.isActive("heading") && "bg-gray-600",
            )}
            title="문단"
          >
            <span className="text-center leading-[normal]">T</span>
          </button>

          <div className="h-3.5 w-0.5 rounded-full bg-gray-600" />

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(
              "inline-flex size-8 cursor-pointer items-center justify-center gap-3.5 rounded-md bg-gray-700 hover:bg-gray-600",
              editor.isActive("bold") && "bg-gray-600",
            )}
            title="굵게"
          >
            <BoldIcon className="size-4" />
          </button>

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleItalic().run()
            }
            className={cn(
              "inline-flex size-8 cursor-pointer items-center justify-center gap-3.5 rounded-md bg-gray-700 hover:bg-gray-600",
              editor.isActive("italic") && "bg-gray-600",
            )}
            title="기울임꼴"
          >
            <ItalicIcon className="size-4" />
          </button>

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleUnderline().run()
            }
            className={cn(
              "inline-flex size-8 cursor-pointer items-center justify-center gap-3.5 rounded-md bg-gray-700 hover:bg-gray-600",
              editor.isActive("underline") && "bg-gray-600",
            )}
            title="밑줄"
          >
            <UnderlineIcon className="size-4" />
          </button>

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleStrike().run()
            }
            className={cn(
              "inline-flex size-8 cursor-pointer items-center justify-center gap-3.5 rounded-md bg-gray-700 hover:bg-gray-600",
              editor.isActive("strike") && "bg-gray-600",
            )}
            title="취소선"
          >
            <StrikethroughIcon className="size-4" />
          </button>

          <div className="h-3.5 w-0.5 rounded-full bg-gray-600" />

          <button
            type="button"
            onClick={() => {
              if (!editor.isActive("link")) {
                const { from, to } = editor.state.selection

                // 현재 선택한 문자열을 가져오기
                const url = editor.state.doc.textBetween(from, to)

                if (
                  url.startsWith("http://") ||
                  url.startsWith("https://")
                ) {
                  editor.chain().focus().setLink({ href: url }).run()
                } else {
                  // eslint-disable-next-line no-alert
                  const newUrl = window.prompt("URL을 입력하세요.")
                  if (newUrl) {
                    editor
                      .chain()
                      .focus()
                      .setLink({ href: newUrl })
                      .run()
                  } else {
                    editor.chain().focus().unsetLink().run()
                  }
                }
              } else {
                editor.chain().focus().unsetLink().run()
              }
            }}
            className={cn(
              "inline-flex size-8 cursor-pointer items-center justify-center gap-3.5 rounded-md bg-gray-700 hover:bg-gray-600",
              editor.isActive("link") && "bg-gray-600",
            )}
            title="링크 삽입"
          >
            {!editor.isActive("link") ? (
              <LinkIcon className="size-4" />
            ) : (
              <LinkSlashIcon className="size-4" />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              const input = document.createElement("input")
              input.type = "file"
              input.accept = "image/*"

              input.addEventListener("change", () => {
                if (!input.files) return

                const file = input.files[0]
                if (file) {
                  const reader = new FileReader()

                  reader.onload = () => {
                    editor
                      .chain()
                      .focus()
                      .setImage({ src: reader.result as string })
                      .run()
                  }

                  reader.readAsDataURL(file)
                }
              })

              input.click()
            }}
            className="inline-flex size-8 cursor-pointer items-center justify-center gap-3.5 rounded-md bg-gray-700 hover:bg-gray-600"
            title="이미지 삽입"
          >
            <PhotoIcon className="size-4" />
          </button>
        </div>
      )}

      <EditorContent editor={editor} />
    </div>
  )
}

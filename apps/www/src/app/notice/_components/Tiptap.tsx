"use client"

import { useEditor, EditorContent } from "@tiptap/react"

import StarterKit from "@tiptap/starter-kit"

import Typography from "@tiptap/extension-typography"
import TextAlign from "@tiptap/extension-text-align"
import TextStyle from "@tiptap/extension-text-style"
import Color from "@tiptap/extension-color"
import Underline from "@tiptap/extension-underline"
import Highlight from "@tiptap/extension-highlight"

import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"

export default function Tiptap({
  content,
}: Readonly<{
  content: string
}>) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
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
        class: "prose prose-gray prose-invert prose-base max-w-none",
      },
    },
    content,
    editable: false,
    immediatelyRender: false,
  })

  return (
    <div className="rounded-lg p-6">
      {editor && <EditorContent editor={editor} />}
    </div>
  )
}

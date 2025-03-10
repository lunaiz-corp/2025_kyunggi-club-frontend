"use client"

import { useReactToPrint } from "react-to-print"
import { useRef } from "react"

import "../_styles/printer.css"

export default function Printer() {
  const contentRef = useRef<HTMLDivElement>(null)
  const reactToPrintFn = useReactToPrint({ contentRef })

  return (
    <div>
      <button type="button" onClick={() => reactToPrintFn()}>
        Print
      </button>

      <div ref={contentRef}>Content to print</div>
    </div>
  )
}

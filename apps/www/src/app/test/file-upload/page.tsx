/* eslint-disable */

"use client"

import { useEffect, useState } from "react"

import { FileUpload } from "@packages/ui/components/krds/Input"

export default function TestPage() {
  const [fileList, setFileList] = useState<File[]>([])
  const [maxFiles, setMaxFiles] = useState<number>(-1)

  useEffect(() => {
    console.log(fileList)
  }, [fileList])

  return (
    <main className="mx-auto mb-12 flex max-w-[1200px] flex-col gap-8 px-6 pt-8 lg:px-0">
      {/* 테스트용 페이지 */}

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="rounded-md bg-ceruleanBlue-500 px-4 py-2 hover:bg-ceruleanBlue-600 active:bg-ceruleanBlue-700"
          onClick={() => {
            // -1일 때는 0 없이 1로 바로 가도록
            if (maxFiles === -1) setMaxFiles(0)
            setMaxFiles(prev => prev + 1)
            setFileList([])
          }}
        >
          +
        </button>

        <span
          onClick={() => {
            const input = Number(
              prompt("최대 파일 수를 입력해주세요."),
            )
            if (input === null || isNaN(input) || input < -1) return

            if (input !== Infinity) setMaxFiles(input)
            else setMaxFiles(-1)
          }}
        >
          {maxFiles === -1 ? "∞" : maxFiles.toLocaleString("ko-KR")}
        </span>

        <button
          type="button"
          className="rounded-md bg-point-500 px-4 py-2 hover:bg-point-600 active:bg-point-700"
          onClick={() => {
            // 1일 때는 0 없이 -1로 바로 가도록
            if (maxFiles === 1) setMaxFiles(0)
            // -1 이하로는 못가도록
            if (maxFiles === -1) return
            setMaxFiles(prev => prev - 1)
            setFileList([])
          }}
        >
          -
        </button>
      </div>

      <FileUpload
        id="test"
        name="test"
        maxFiles={maxFiles === -1 ? Infinity : maxFiles}
        fileListState={[fileList, setFileList]}
      />
    </main>
  )
}

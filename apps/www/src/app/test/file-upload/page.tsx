"use client"

import { useEffect, useState } from "react"

import FileUpload from "@packages/ui/components/krds/Input/FileUpload"

export default function TestPage() {
  const [fileList, setFileList] = useState<File[]>([])

  useEffect(() => {
    console.log(fileList)
  }, [fileList])

  return (
    <main className="mx-auto mb-12 flex max-w-[1200px] flex-col gap-8 px-6 pt-8 lg:px-0">
      <FileUpload
        id="test"
        name="test"
        fileListState={[fileList, setFileList]}
      />
    </main>
  )
}

/* eslint-disable jsx-a11y/label-has-associated-control */

"use client"

import type {
  DetailedHTMLProps,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
} from "react"
import { useRef, useState } from "react"

import { overlay } from "overlay-kit"

import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  ChevronRightIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid"

import { Button } from "../Action"
import { Modal } from "../Layout"

import { cn } from "../../../utils/tailwindMerge"

type CommonPropsForState = {
  maxFiles: number
  fileListState: [File[], Dispatch<SetStateAction<File[]>>]
}

type SectionProps = Omit<
  DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type" | "hidden" | "multiple" | "onChange"
> &
  CommonPropsForState & {
    id: string
    name: string
    onFileSelect?: (fileList: File[]) => void
  }

export type UploadedFile = {
  name: string
  url: string
}

function UploadSection({
  id,
  name,
  maxFiles = 1,
  fileListState,
  onFileSelect,
  ...props
}: Readonly<SectionProps>) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [fileList, setFileList] = fileListState
  const [currentlyDragging, setCurrentlyDragging] =
    useState<boolean>(false)

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setCurrentlyDragging(true)
  }

  function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setCurrentlyDragging(false)
  }

  function onFileDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    onDragLeave(e)

    if (maxFiles && fileList.length >= maxFiles) {
      overlay.open(({ isOpen, close, unmount }) => {
        return (
          <Modal
            isOpen={isOpen}
            close={() => {
              close()
              setTimeout(unmount, 200)
            }}
            title="오류"
          >
            최대 파일 개수를 초과했습니다.
          </Modal>
        )
      })

      return
    }

    const filteredDataTransfer = new DataTransfer()

    // 신규 spec - 브라우저 호환성을 위해 분기 처리
    if (e.dataTransfer.items) {
      const files = [...e.dataTransfer.items]

      files
        .filter(item => item.kind === "file")
        .forEach(item => {
          const entry = item.webkitGetAsEntry()
          if (entry && entry.isDirectory) {
            overlay.open(({ isOpen, close, unmount }) => {
              return (
                <Modal
                  isOpen={isOpen}
                  close={() => {
                    close()
                    setTimeout(unmount, 200)
                  }}
                  title="오류"
                >
                  지원되지 않는 파일 형식입니다.
                </Modal>
              )
            })
          } else if (entry && entry.isFile) {
            const file = item.getAsFile()
            if (file) {
              filteredDataTransfer.items.add(file)
            }
          }
        })
    } else {
      const files = [...e.dataTransfer.files]
      files.forEach(file => {
        filteredDataTransfer.items.add(file)
      })
    }

    // fileList값이 바로 변하지 않기에 새로운 배열을 만들어서 이를 return한다.
    // @see https://velog.io/@woohm402/why-my-state-doesnt-change

    const newFileList = [
      ...fileList,
      ...Array.from(filteredDataTransfer.files),
    ]

    setFileList(newFileList)
    if (onFileSelect) onFileSelect(newFileList)
  }

  function onFileSelectByInput(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    // fileList값이 바로 변하지 않기에 새로운 배열을 만들어서 이를 return한다.
    // @see https://velog.io/@woohm402/why-my-state-doesnt-change

    const newFileList = [
      ...fileList,
      ...Array.from(e.target.files ?? []),
    ]

    setFileList(newFileList)
    if (onFileSelect) onFileSelect(newFileList)

    e.target.value = ""
  }

  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center gap-10 rounded-xl border border-dashed border-transparent bg-gray-900 px-10 py-16",
        currentlyDragging && "border-gray-700",
      )}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onFileDrop}
    >
      <p className="z-10 text-center text-lg">
        첨부할 파일을 여기에 끌어다 놓거나, 파일 선택 버튼을 눌러
        파일을 직접 선택해주세요.
      </p>

      <div>
        <input
          ref={fileInputRef}
          type="file"
          id={id}
          name={name}
          className="size-[1px] opacity-0"
          multiple={maxFiles > 1}
          onChange={onFileSelectByInput}
          {...props}
        />

        <label htmlFor={id} className="z-10 ml-[-1px] cursor-pointer">
          <Button
            type="button"
            className="z-10"
            onClick={() => {
              fileInputRef.current!.click()
            }}
            disabled={fileList.length >= maxFiles}
          >
            <ArrowUpTrayIcon className="size-5" />
            파일 선택
          </Button>
        </label>
      </div>
    </div>
  )
}

function FileList({
  maxFiles = 1,
  fileListState,
}: CommonPropsForState) {
  const [fileList, setFileList] = fileListState

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="font-bold">
          {maxFiles > 1 && (
            <>
              <span className="text-ceruleanBlue-400">
                {fileList.length.toLocaleString("ko-KR")}개
              </span>{" "}
              /{" "}
              {maxFiles === Infinity
                ? "∞"
                : maxFiles.toLocaleString("ko-KR")}
              개
            </>
          )}
        </div>

        <Button
          type="button"
          className="border-gray-800 bg-transparent text-sm hover:bg-gray-900 focus:bg-gray-900 focus:outline-gray-800 active:bg-gray-900"
          onClick={async () => {
            if (fileList.length === 0) {
              return
            }

            const confirm = await overlay.openAsync<boolean>(
              ({ isOpen, close, unmount }) => {
                return (
                  <Modal
                    isOpen={isOpen}
                    close={(returnValue: boolean = false) => {
                      close(returnValue)
                      setTimeout(unmount, 200)
                    }}
                    title="정말로 모든 파일을 삭제하시겠습니까?"
                    isForConfirm
                  />
                )
              },
            )

            if (confirm) {
              setFileList([])
            }
          }}
        >
          전체 파일 삭제
          <ChevronRightIcon className="size-5" />
        </Button>
      </div>

      <ul className="flex flex-col gap-4">
        {fileList.map(file => (
          <li
            key={`${file.name}-${crypto.randomUUID()}`}
            className="rounded-lg border border-gray-800 p-4"
          >
            <div className="inline-flex w-full items-center justify-between">
              <span className="elipsis">{file.name}</span>

              <Button
                type="button"
                className="border-gray-800 bg-transparent text-sm hover:bg-gray-900 focus:bg-gray-900 focus:outline-gray-800 active:bg-gray-900"
                onClick={async () => {
                  const confirm = await overlay.openAsync<boolean>(
                    ({ isOpen, close, unmount }) => {
                      return (
                        <Modal
                          isOpen={isOpen}
                          close={(returnValue: boolean = false) => {
                            close(returnValue)
                            setTimeout(unmount, 200)
                          }}
                          title="정말로 삭제하시겠습니까?"
                          isForConfirm
                        />
                      )
                    },
                  )

                  if (confirm) {
                    setFileList(fileList.filter(f => f !== file))
                  }
                }}
              >
                삭제
                <XCircleIcon className="size-5" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ReadOnlyFileList({
  maxFiles = 1,
  fileList,
}: {
  maxFiles: number
  fileList: {
    name: string
    url: string
  }[]
}) {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="font-bold">
          {maxFiles > 1 && (
            <>
              <span className="text-ceruleanBlue-400">
                {fileList.length.toLocaleString("ko-KR")}개
              </span>{" "}
              /{" "}
              {maxFiles === Infinity
                ? "∞"
                : maxFiles.toLocaleString("ko-KR")}
              개
            </>
          )}
        </div>
      </div>

      <ul className="flex flex-col gap-4">
        {fileList.map(file => (
          <li
            key={`${file.name}-${crypto.randomUUID()}`}
            className="rounded-lg border border-gray-800 p-4"
          >
            <div className="inline-flex w-full items-center justify-between">
              <span className="elipsis">{file.name}</span>

              <a
                href={file.url}
                download={file.name}
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  type="button"
                  className="border-gray-800 bg-transparent text-sm hover:bg-gray-900 focus:bg-gray-900 focus:outline-gray-800 active:bg-gray-900"
                >
                  다운로드
                  <ArrowDownTrayIcon className="size-5" />
                </Button>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function FileUpload(props: SectionProps) {
  const { maxFiles, fileListState } = props

  return (
    <div className="flex flex-col gap-6">
      <UploadSection {...props} />

      <FileList maxFiles={maxFiles} fileListState={fileListState} />
    </div>
  )
}

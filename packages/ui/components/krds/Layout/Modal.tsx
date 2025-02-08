"use client"

import type { PropsWithChildren } from "react"

import { cn } from "../../../utils/tailwindMerge"
import { Button } from "../Action"

export default function Modal({
  isOpen,
  close,
  title,
  isForConfirm,
  children,
}: {
  isOpen: boolean
  close: (returnValue?: boolean) => void
  title: string
  isForConfirm?: boolean
} & PropsWithChildren) {
  return (
    <div
      className={cn(
        "fixed inset-0 -z-10 size-full opacity-0 transition-opacity duration-200",
        isOpen && "z-[1010] opacity-100",
      )}
    >
      <div className="relative z-50 z-[1020] mx-auto flex h-full min-h-64 w-[760px] items-center">
        <div className="flex max-h-[80%] w-full flex-col items-center gap-6 rounded-xl border border-gray-900 bg-gray-950 p-10 shadow-sm">
          <div className="w-full">
            <h2 className="truncate text-2xl font-bold">{title}</h2>
          </div>

          <div className="flex w-full flex-col overflow-y-auto">
            <div>{children}</div>
          </div>

          <div className="flex w-full items-center justify-end gap-2">
            {!isForConfirm ? (
              <Button
                type="button"
                className="px-4 py-2"
                onClick={() => close()}
              >
                확인
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  className="min-w-20 border-gray-800 bg-transparent px-4 hover:bg-gray-900 focus:bg-gray-900 focus:outline-gray-800 active:bg-gray-900"
                  onClick={() => close(false)}
                >
                  아니요
                </Button>

                <Button
                  type="button"
                  className="min-w-20 px-4"
                  onClick={() => close(true)}
                >
                  예
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 -z-10 bg-black/75 opacity-0 transition-opacity duration-200",
          isOpen && "z-[1000] opacity-100",
        )}
      />
    </div>
  )
}

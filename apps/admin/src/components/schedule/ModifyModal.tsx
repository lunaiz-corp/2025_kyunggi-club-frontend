"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import Skeleton from "react-loading-skeleton"

import { XMarkIcon } from "@heroicons/react/24/solid"

import Select from "@packages/ui/components/krds/Select"
import SchedulesCalendar from "@packages/ui/components/schedules/Calendar"
import { Input as FieldSizingInput } from "@packages/ui/components/lib/react-field-sizing-content"

import { cn } from "@packages/ui/utils/tailwindMerge"

import { Preset, PresetTitle } from "./types"

export default function ModifyModal({
  isOpen,
  close,
  allowedTypes,
}: Readonly<{
  isOpen: boolean
  close: (returnValue?: {
    title: string
    type: Preset
    datetime: Date
  }) => void
  allowedTypes: Set<Preset>
}>) {
  const [title, setTitle] = useState<string>("")
  const [type, setType] = useState<Preset>(Preset.ETC)

  const [datetime, setDatetime] = useState<Date | null>(null)

  const customHourRef = useRef<HTMLInputElement>(null)
  const customMinuteRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (type && type !== Preset.ETC) {
      setTitle(PresetTitle[type])
    }
  }, [type])

  useEffect(() => {
    customHourRef.current!.value = String(
      !datetime || datetime.getHours() % 12 === 0
        ? 12
        : datetime.getHours() % 12,
    ).padStart(2, "0")

    customMinuteRef.current!.value = String(
      datetime ? datetime.getMinutes() : 0,
    ).padStart(2, "0")
  }, [datetime])

  return (
    <div
      className={cn(
        "fixed inset-0 -z-10 size-full opacity-0 transition-opacity duration-200",
        isOpen && "z-[1010] opacity-100",
      )}
    >
      <div className="relative z-[1020] mx-auto flex h-full min-h-64 w-full items-center p-5 lg:w-[1100px] lg:p-0">
        <form
          className="flex w-full flex-col gap-9 rounded-2xl bg-gray-900 p-8 shadow-2xl lg:rounded-4xl lg:px-16 lg:py-12"
          onSubmit={e => {
            e.preventDefault()

            if (!title || !type || !datetime) {
              close()
            } else {
              close({
                title,
                type,
                datetime,
              })
            }
          }}
        >
          <div className="flex items-start justify-between">
            <input
              type="text"
              className="w-full border-0 bg-inherit p-0 text-3xl font-bold placeholder:text-gray-600 focus:ring-0"
              placeholder={
                allowedTypes.size <= 1 ? "제목" : "일정 종류 선택"
              }
              value={title}
              onChange={e => setTitle(e.target.value)}
              readOnly={allowedTypes.size > 1}
            />

            <button
              type="submit"
              title="닫기"
              className="cursor-pointer"
            >
              <XMarkIcon className="size-7 stroke-gray-300" />
            </button>
          </div>

          {allowedTypes.size > 1 && (
            <Select
              value={type}
              onChange={e => setType(e.target.value as Preset)}
            >
              <option value={Preset.ETC} hidden disabled>
                일정 종류 선택
              </option>

              {Object.values(Preset)
                .filter(x => allowedTypes.has(x))
                .filter(x => x !== Preset.ETC)
                .map(preset => (
                  <option key={preset} value={preset}>
                    {PresetTitle[preset]}
                  </option>
                ))}
            </Select>
          )}

          <div className="flex w-full flex-col gap-8 md:flex-row">
            <Suspense
              fallback={
                <Skeleton
                  height={407}
                  baseColor="var(--color-gray-900)"
                  highlightColor="var(--color-gray-800)"
                />
              }
            >
              <div className="rounded-xl border border-[#eff6ff]/10 px-3 py-5 md:w-1/2">
                <SchedulesCalendar
                  selectedDateState={[datetime, setDatetime]}
                />
              </div>
            </Suspense>

            <Suspense
              fallback={
                <Skeleton
                  height={407}
                  baseColor="var(--color-gray-900)"
                  highlightColor="var(--color-gray-800)"
                />
              }
            >
              <div className="flex justify-center gap-16 rounded-xl border border-[#eff6ff]/10 md:w-1/2">
                <div className="inline-flex flex-col justify-center gap-14">
                  <div className="inline-flex h-[60px] items-center" />

                  <button
                    type="button"
                    className={cn(
                      "inline-flex h-[60px] cursor-pointer items-center text-center text-3xl font-bold",
                      (datetime?.getHours() ?? 0) >= 12 &&
                        "text-gray-100/30",
                    )}
                    onClick={() => {
                      if (!datetime) return

                      // 현재 시간은 두고, 오전으로 설정 (12보다 크면 12를 빼고, 작으면 아무것도 안함)
                      setDatetime(
                        time =>
                          new Date(
                            time!.setHours(
                              time!.getHours() >= 12
                                ? time!.getHours() - 12
                                : time!.getHours(),
                              time!.getMinutes(),
                              time!.getSeconds(),
                              time!.getMilliseconds(),
                            ),
                          ),
                      )
                    }}
                  >
                    오전
                  </button>

                  <button
                    type="button"
                    className={cn(
                      "inline-flex h-[60px] cursor-pointer items-center text-center text-3xl font-bold",
                      (datetime?.getHours() ?? 0) < 12 &&
                        "text-gray-100/30",
                    )}
                    onClick={() => {
                      if (!datetime) return

                      // 현재 시간은 두고, 오후으로 설정 (12보다 작으면 12를 더하고, 크면 아무것도 안함)
                      setDatetime(
                        time =>
                          new Date(
                            time!.setHours(
                              time!.getHours() < 12
                                ? time!.getHours() + 12
                                : time!.getHours(),
                              time!.getMinutes(),
                              time!.getSeconds(),
                              time!.getMilliseconds(),
                            ),
                          ),
                      )
                    }}
                  >
                    오후
                  </button>
                </div>

                <div className="inline-flex items-center gap-5">
                  <div className="inline-flex flex-col justify-center gap-14">
                    <button
                      type="button"
                      className="cursor-pointer text-center text-6xl font-bold text-gray-100/30"
                      onClick={() => {
                        if (!datetime) return

                        // 1시간 전으로 설정
                        // 0시면 23시로 설정
                        setDatetime(
                          new Date(
                            datetime.setHours(
                              datetime.getHours() === 0
                                ? 23
                                : datetime.getHours() - 1,
                              datetime.getMinutes(),
                              datetime.getSeconds(),
                              datetime.getMilliseconds(),
                            ),
                          ),
                        )
                      }}
                    >
                      {String(
                        !datetime || datetime?.getHours() === 0
                          ? 11
                          : (datetime.getHours() - 1) % 12 === 0
                            ? 12
                            : (datetime.getHours() - 1) % 12,
                      ).padStart(2, "0")}
                    </button>

                    <FieldSizingInput
                      ref={customHourRef}
                      type="text"
                      className="cursor-pointer border-0 bg-inherit p-0 text-center text-6xl font-bold select-all focus:ring-0"
                      fieldSizing="content"
                      defaultValue={String(
                        !datetime || datetime.getHours() % 12 === 0
                          ? 12
                          : datetime.getHours() % 12,
                      ).padStart(2, "0")}
                      onKeyDown={e => {
                        if (!datetime || e.key !== "Enter") return

                        if (Number(e.currentTarget.value) < 0) {
                          e.currentTarget.value = "0"
                        } else if (
                          Number(e.currentTarget.value) > 24
                        ) {
                          e.currentTarget.value = "23"
                        }

                        setDatetime(
                          new Date(
                            datetime.setHours(
                              Number(e.currentTarget.value),
                              datetime.getMinutes(),
                              datetime.getSeconds(),
                              datetime.getMilliseconds(),
                            ),
                          ),
                        )

                        e.currentTarget.value = String(
                          Number(e.currentTarget.value) % 12,
                        ).padStart(2, "0")
                      }}
                    />

                    <button
                      type="button"
                      className="cursor-pointer text-center text-6xl font-bold text-gray-100/30"
                      onClick={() => {
                        if (!datetime) return

                        // 1시간 뒤으로 설정
                        // 23시면 0시로 설정
                        setDatetime(
                          new Date(
                            datetime.setHours(
                              datetime.getHours() === 23
                                ? 0
                                : datetime.getHours() + 1,
                              datetime.getMinutes(),
                              datetime.getSeconds(),
                              datetime.getMilliseconds(),
                            ),
                          ),
                        )
                      }}
                    >
                      {String(
                        !datetime ||
                          (datetime.getHours() + 1) % 12 === 0
                          ? 12
                          : (datetime.getHours() + 1) % 12,
                      ).padStart(2, "0")}
                    </button>
                  </div>

                  <span className="text-center text-6xl font-bold">
                    :
                  </span>

                  <div className="inline-flex flex-col justify-center gap-14">
                    <button
                      type="button"
                      className="cursor-pointer text-center text-6xl font-bold text-gray-100/30"
                      onClick={() => {
                        if (!datetime) return

                        // 1분 전으로 설정
                        // 0분이면 59분으로 설정
                        setDatetime(
                          new Date(
                            datetime.setMinutes(
                              datetime.getMinutes() === 0
                                ? 59
                                : datetime.getMinutes() - 1,
                              datetime.getSeconds(),
                              datetime.getMilliseconds(),
                            ),
                          ),
                        )
                      }}
                    >
                      {String(
                        !datetime || datetime?.getMinutes() === 0
                          ? 59
                          : (datetime.getMinutes() - 1) % 60,
                      ).padStart(2, "0")}
                    </button>

                    <FieldSizingInput
                      ref={customMinuteRef}
                      type="text"
                      className="cursor-pointer border-0 bg-inherit p-0 text-center text-6xl font-bold select-all focus:ring-0"
                      fieldSizing="content"
                      defaultValue={String(
                        datetime ? datetime.getMinutes() : 0,
                      ).padStart(2, "0")}
                      onKeyDown={e => {
                        if (!datetime || e.key !== "Enter") return

                        if (Number(e.currentTarget.value) < 0) {
                          e.currentTarget.value = "0"
                        } else if (
                          Number(e.currentTarget.value) > 59
                        ) {
                          e.currentTarget.value = String(
                            Number(e.currentTarget.value) % 60,
                          )
                        }

                        setDatetime(
                          new Date(
                            datetime.setMinutes(
                              Number(e.currentTarget.value),
                              datetime.getSeconds(),
                              datetime.getMilliseconds(),
                            ),
                          ),
                        )

                        e.currentTarget.value = String(
                          Number(e.currentTarget.value) % 60,
                        ).padStart(2, "0")
                      }}
                    />

                    <button
                      type="button"
                      className="cursor-pointer text-center text-6xl font-bold text-gray-100/30"
                      onClick={() => {
                        if (!datetime) return

                        // 1분 뒤로 설정
                        // 59분이면 0분으로 설정
                        setDatetime(
                          new Date(
                            datetime.setMinutes(
                              datetime.getMinutes() === 59
                                ? 0
                                : datetime.getMinutes() + 1,
                              datetime.getSeconds(),
                              datetime.getMilliseconds(),
                            ),
                          ),
                        )
                      }}
                    >
                      {String(
                        !datetime || datetime?.getMinutes() === 0
                          ? 1
                          : (datetime.getMinutes() + 1) % 60,
                      ).padStart(2, "0")}
                    </button>
                  </div>
                </div>
              </div>
            </Suspense>
          </div>
        </form>
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

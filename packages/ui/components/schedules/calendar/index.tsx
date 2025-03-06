"use client"

import { Dispatch, SetStateAction, useEffect } from "react"
import Skeleton from "react-loading-skeleton"

import { isHoliday } from "@hyunbinseo/holidays-kr"

import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

import "./_styles/calendar.css"
import { Schedule } from "../types"

function getLocaleForIntl(
  type: "year" | "monthyear" | "day",
  locale: string = "ko-KR",
) {
  if (type === "day") {
    return locale.replace("ko", "en")
  }

  return locale
}

function formatDate(
  type: "year" | "monthyear" | "day",
  date: Date,
  locale: string = "ko-KR",
) {
  const options: Intl.DateTimeFormatOptions = {}
  switch (type) {
    case "year":
      options.year = "numeric"
      break
    case "monthyear":
      options.month = "long"
      options.year = "numeric"
      break
    case "day":
    default:
      options.day = "numeric"
  }

  return new Intl.DateTimeFormat(
    getLocaleForIntl(type, locale),
    options,
  ).format(date)
}

function getDaysInMonth(date: Date) {
  const month = date.getMonth()
  const isLeapYear = date.getFullYear() % 4 === 0

  // February
  if (month === 2) {
    return isLeapYear ? 29 : 28
  }

  if ([4, 6, 9, 11].includes(month)) {
    return 30
  }

  return 31
}

export default function SchedulesCalendar({
  schedules = [],
  selectedDateState,
}: {
  schedules?: Schedule[]
  selectedDateState: [
    Date | null,
    Dispatch<SetStateAction<Date | null>>,
  ]
}) {
  const [selectedDate, setSelectedDate] = selectedDateState

  useEffect(() => {
    // 클라이언트에서 현재 날짜 설정
    setSelectedDate(new Date())
  }, [setSelectedDate])

  return !selectedDate ? (
    <Skeleton
      height={373}
      baseColor="var(--color-gray-900)"
      highlightColor="var(--color-gray-800)"
    />
  ) : (
    <div className="flex h-full w-full flex-col items-center gap-4">
      <span className="font-bold text-gray-100">
        {formatDate("monthyear", selectedDate, "ko-KR")}
      </span>

      <Calendar
        // 달력 설정
        calendarType="gregory"
        defaultView="month"
        locale="ko-KR"
        // 지금 날짜
        defaultValue={selectedDate}
        // 달력 포맷팅 (Intl 이용)
        formatDay={(locale, date) => formatDate("day", date, locale)}
        formatYear={(locale, date) =>
          formatDate("year", date, locale)
        }
        formatMonthYear={(locale, date) =>
          formatDate("monthyear", date, locale)
        }
        minDate={
          new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            1,
          )
        }
        maxDate={
          new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            getDaysInMonth(selectedDate),
          )
        }
        tileClassName={({ date }) => {
          if (isHoliday(date)) {
            return "holiday"
          }

          if (date.getDay() === 6) {
            return "saterday"
          }

          if (date.getDay() === 0) {
            return "sunday"
          }

          return ""
        }}
        // 이벤트 있는 날에 점 찍기
        tileContent={({ date }) => {
          const html = []

          if (
            schedules.some(
              schedule =>
                new Date(schedule.start_at).toDateString() ===
                date.toDateString(),
            )
          ) {
            html.push(
              <div
                key={date.toISOString()}
                className="mx-auto mt-1.5 size-1 rounded-full bg-ceruleanBlue-700"
              />,
            )
          } else {
            html.push(
              <div
                key={date.toISOString()}
                className="mx-auto mt-1.5 size-1 rounded-full bg-transparent"
              />,
            )
          }

          return html
        }}
        // 버튼 숨기기
        showNavigation={false}
        // 이전 달 다음 달 보이지 않기
        showNeighboringMonth={false}
        // 현재 선택한 날짜 설정
        onChange={date => {
          if (date === null) return
          setSelectedDate(date as Date)
        }}
      />
    </div>
  )
}

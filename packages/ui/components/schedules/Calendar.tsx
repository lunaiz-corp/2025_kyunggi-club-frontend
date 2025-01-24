"use client"

import { isHoliday } from "@hyunbinseo/holidays-kr"

import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

import "./custom.styles.css"

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

export default function SchedulesCalendar() {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <span className="font-bold text-gray-100">
        {formatDate("monthyear", new Date(), "ko-KR")}
      </span>

      <Calendar
        // 달력 설정
        calendarType="gregory"
        defaultView="month"
        locale="ko-KR"
        // 달력 포맷팅 (Intl 이용)
        formatDay={(locale, date) => formatDate("day", date, locale)}
        formatYear={(locale, date) =>
          formatDate("year", date, locale)
        }
        formatMonthYear={(locale, date) =>
          formatDate("monthyear", date, locale)
        }
        minDate={
          new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
        maxDate={
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            31,
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

          html.push(
            <div
              key={date.toISOString()}
              className="mx-auto mt-1.5 size-1 rounded-full bg-ceruleanBlue-700"
            />,
          )

          return html
        }}
        // 버튼 숨기기
        showNavigation={false}
        // 이전 달 다음 달 보이지 않기
        showNeighboringMonth={false}
      />
    </div>
  )
}

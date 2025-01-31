export default function SchedulesList({
  selectedDate,
}: Readonly<{
  selectedDate: Date
}>) {
  return (
    <div className="inline-flex flex-col gap-1.5">
      <span className="text-sm text-gray-200">
        {/* 3월 11일 */}
        {new Intl.DateTimeFormat("ko-KR", {
          month: "long",
          day: "numeric",
        }).format(selectedDate)}
      </span>

      <div className="inline-flex items-center gap-2">
        <div className="size-1.5 rounded-full bg-ceruleanBlue-700" />
        <span className="text-xl font-bold text-gray-200">
          Event Name
        </span>
      </div>
    </div>
  )
}

import SchedulesCalendar from "@packages/ui/components/schedules/Calendar"
import SchedulesList from "./list"

export default function Schedules() {
  return (
    <>
      <div className="md:w-1/2">
        <SchedulesCalendar />
      </div>

      <div className="flex flex-col gap-5 py-4 md:w-1/2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            className="flex flex-col gap-5"
            key={`schedules-${i.toString()}`}
          >
            <SchedulesList />

            {i !== Array.from({ length: 2 }).length - 1 && (
              <div className="h-0.5 bg-gray-800" />
            )}
          </div>
        ))}
      </div>
    </>
  )
}

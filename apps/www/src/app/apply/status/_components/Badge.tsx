import {
  CheckIcon,
  ClockIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"

export default function StatusBadge({
  status,
}: Readonly<{
  status: "WAITING" | "PASSED" | "FINAL_PASSED" | "REJECTED"
}>) {
  switch (status) {
    case "WAITING":
      return (
        <div className="flex size-16 items-center justify-center rounded-xl bg-warning-300">
          <ClockIcon className="size-8" />
        </div>
      )
    case "PASSED":
      return (
        <div className="flex size-16 items-center justify-center rounded-xl bg-ceruleanBlue-600">
          <CheckIcon className="size-8" />
        </div>
      )
    case "FINAL_PASSED":
      return (
        <div className="flex size-16 items-center justify-center rounded-xl bg-success-400">
          <CheckIcon className="size-8" />
        </div>
      )
    case "REJECTED":
      return (
        <div className="flex size-16 items-center justify-center rounded-xl bg-point-500">
          <XMarkIcon className="size-8" />
        </div>
      )
    default:
      return null
  }
}

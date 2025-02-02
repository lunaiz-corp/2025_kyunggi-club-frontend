import { DetailedHTMLProps, SelectHTMLAttributes } from "react"

import { cn } from "../../utils/tailwindMerge"

export const baseClass = [
  "border",
  "border-gray-800",
  "bg-gray-900",

  "p-4",

  "rounded-lg",

  "focus:ring",
  "focus:ring-offset-2",
  "focus:ring-offset-gray-950",
  "focus:ring-ceruleanBlue-700",

  "placeholder:text-gray-500",
]

export default function Select({
  children,
  className,
  ...props
}: Readonly<
  DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >
>) {
  return (
    <select className={cn(baseClass, className)} {...props}>
      {children}
    </select>
  )
}

import { DetailedHTMLProps, InputHTMLAttributes } from "react"

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

export default function Input({
  type = "text",
  className,
  ...props
}: Readonly<
  DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & {
    type?: "text" | "number" | "email" | "password" | "tel" | "url"
  }
>) {
  return (
    <input
      type={type}
      className={cn(baseClass, className)}
      {...props}
    />
  )
}

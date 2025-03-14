import { DetailedHTMLProps, InputHTMLAttributes } from "react"

import { cn } from "../../../utils/tailwindMerge"

export const baseClass = [
  "border",
  "border-gray-800",
  "bg-gray-900",

  "p-4",

  "rounded-lg",

  "outline",
  "outline-transparent",

  "focus:ring-0",

  "focus:outline",
  "focus:outline-offset-2",
  "focus:outline-offset-gray-950",
  "focus:outline-ceruleanBlue-700",

  "placeholder:text-gray-500",
]

export default function TextInput({
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

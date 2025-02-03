import {
  DetailedHTMLProps,
  PropsWithChildren,
  TextareaHTMLAttributes,
} from "react"

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

export default function Textarea({
  className,
  children,
  ...props
}: Readonly<
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > &
    PropsWithChildren
>) {
  return (
    <textarea className={cn(baseClass, className)} {...props}>
      {children}
    </textarea>
  )
}

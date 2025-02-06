import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ChangeEventHandler,
} from "react"

import { cn } from "../utils/tailwindMerge"

export const baseClass = [
  "size-5",
  "cursor-pointer",
  "rounded",

  "border",
  "border-solid",
  "border-gray-800",

  "bg-gray-900",

  "checked:bg-ceruleanBlue-700",

  "focus:ring",
  "focus:ring-ceruleanBlue-700",
  "focus:ring-offset-gray-950",
]

export default function Checkbox({
  id,
  className,
  checked,
  onChange,
  ...props
}: Readonly<
  Omit<
    DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "type"
  > & {
    id: string
    checked?: boolean
    onChange?: ChangeEventHandler<HTMLInputElement>
  }
>) {
  return (
    <input
      type="checkbox"
      id={id}
      className={cn(baseClass, className)}
      checked={checked}
      onChange={onChange}
      {...props}
    />
  )
}

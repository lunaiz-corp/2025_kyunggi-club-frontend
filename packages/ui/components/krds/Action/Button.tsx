import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react"

import { cn } from "../../../utils/tailwindMerge"

export const baseClass = [
  "inline-flex",
  "items-center",
  "justify-center",
  "gap-2",

  "border",
  "border-ceruleanBlue-700",
  "outline-transparent",

  "bg-ceruleanBlue-700",

  "px-3",
  "py-2",

  "rounded-lg",
  "cursor-pointer",

  "active:bg-ceruleanBlue-600",
  "focus:bg-ceruleanBlue-600",
  "hover:bg-ceruleanBlue-600",

  "disabled:border-ceruleanBlue-950",
  "disabled:bg-ceruleanBlue-950",

  "focus:outline",
  "focus:outline-offset-2",
  "focus:outline-ceruleanBlue-700",
]

export default function Button({
  type = "button",
  children,
  className,
  onClick,
  ...props
}: Readonly<
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    type?: "button" | "submit" | "reset"
    className?: string
  } & PropsWithChildren
>) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={cn(...baseClass, className)}
      onClick={e => {
        e.currentTarget.blur()
        onClick?.(e)
      }}
      {...props}
    >
      {children}
    </button>
  )
}

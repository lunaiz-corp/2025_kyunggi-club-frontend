import type {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react"
import type { UrlObject } from "url"

import Link from "next/link"
import { twMerge } from "tailwind-merge"

const baseClass = [
  "inline-flex",
  "items-center",
  "gap-2",

  "py-1",
  "px-2",

  "rounded-lg",

  "active:bg-ceruleanBlue-950",
  "focus:bg-ceruleanBlue-950",

  "focus:outline",
  "focus:outline-offset-2",
  "focus:outline-ceruleanBlue-700",
]

export function ALink({
  children,
  className,
  href,
  ...props
}: Readonly<
  DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > &
    PropsWithChildren
>) {
  return (
    <a
      {...props}
      href={href}
      className={twMerge(...baseClass, className)}
    >
      {children}
    </a>
  )
}

export function NextLink({
  children,
  className,
  href,
  ...props
}: Readonly<
  DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > & { href: string | UrlObject } & PropsWithChildren
>) {
  return (
    <Link
      {...props}
      href={href}
      className={twMerge(...baseClass, className)}
    >
      {children}
    </Link>
  )
}

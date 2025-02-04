"use client"

import type {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react"
import type { UrlObject } from "url"

import Link from "next/link"

import { cn } from "../../utils/tailwindMerge"

export const baseClass = [
  "inline-flex",
  "items-center",
  "gap-2",

  "px-2",
  "py-1",

  "rounded-lg",

  "active:bg-gray-900",
  "focus:bg-gray-900",
  "hover:bg-gray-900",

  "focus:outline",
  "focus:outline-offset-2",
  "focus:outline-gray-700",
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
  > & { href: string } & PropsWithChildren
>) {
  return (
    <a href={href} className={cn(...baseClass, className)} {...props}>
      {children}
    </a>
  )
}

export function NextLink({
  children,
  className,
  href,
  onClick,
  ...props
}: Readonly<
  DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > & { href: string | UrlObject } & PropsWithChildren
>) {
  return (
    <Link
      href={href}
      className={cn(...baseClass, className)}
      onClick={e => {
        e.currentTarget.blur()
        onClick?.(e)
      }}
      data-prevent-nprogress
      {...props}
    >
      {children}
    </Link>
  )
}

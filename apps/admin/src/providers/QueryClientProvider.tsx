"use client"

import type { PropsWithChildren } from "react"

import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query"

export default function QueryClientProvider({
  children,
}: Readonly<PropsWithChildren>) {
  const queryClient = new QueryClient()

  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  )
}

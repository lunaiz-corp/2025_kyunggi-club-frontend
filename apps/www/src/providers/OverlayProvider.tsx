"use client"

import type { PropsWithChildren } from "react"
import { OverlayProvider as OverlayKitProvider } from "overlay-kit"

export default function OverlayProvider({
  children,
}: Readonly<PropsWithChildren>) {
  return <OverlayKitProvider>{children}</OverlayKitProvider>
}

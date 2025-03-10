"use client"

import Skeleton from "react-loading-skeleton"
import { useQuery } from "@tanstack/react-query"

import PercentageBar from "./PercentageBar"

export async function getChances() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/apply/select-chance`,
    {
      method: "GET",
    },
  )

  if (!response.ok) {
    throw new Error((await response.json()).message)
  }

  return (await response.json()).data as { [key: string]: number }
}

export default function SelectChances() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["chances"],
    queryFn: getChances,
  })

  const list = [
    {
      clubId: "list",
      backgroundGradient: { from: "#deb31b", to: "#ffd953" },
    },
    {
      clubId: "cel",
      backgroundGradient: { from: "#005f25", to: "#399a28" },
    },
    {
      clubId: "kec",
      backgroundGradient: { from: "#929292", to: "#737373" },
    },
    {
      clubId: "css",
      backgroundGradient: { from: "#1113ff", to: "#1213a1" },
    },
    {
      clubId: "kmoc",
      backgroundGradient: { from: "#333ae0", to: "#2d3198" },
    },
    {
      clubId: "kcc",
      backgroundGradient: { from: "#ff5a5a", to: "#ef0000" },
    },
    {
      clubId: "kac",
      backgroundGradient: { from: "#ffd862", to: "#ffbf00" },
    },
    {
      clubId: "kphc",
      backgroundGradient: { from: "#00274e", to: "#004991" },
    },
    {
      clubId: "kbrc",
      backgroundGradient: { from: "#00274e", to: "#004991" },
    },
  ]

  return (
    <div className="flex min-h-full w-full flex-col justify-between gap-5 lg:gap-0">
      {isLoading || error || !data
        ? Array.from({ length: 9 }).map((_, i) => (
            <Skeleton
              key={`skeleton-${i.toString()}`}
              height={25.5}
              baseColor="var(--color-gray-900)"
              highlightColor="var(--color-gray-800)"
            />
          ))
        : list.map(club => (
            <PercentageBar
              key={club.clubId}
              tabIndex={0}
              maxChance={Math.max(...Object.values(data), 0)}
              selectChance={data[club.clubId] ?? 0}
              {...club}
            />
          ))}
    </div>
  )
}

import { Suspense } from "react"
import Skeleton from "react-loading-skeleton"

import PercentageBar from "./PercentageBar"

export default function SelectChances() {
  const DUMMY_DATA = [
    {
      clubId: "list",
      backgroundGradient: { from: "#deb31b", to: "#ffd953" },
      selectChance: 90 / 10,
    },
    {
      clubId: "cel",
      backgroundGradient: { from: "#005f25", to: "#399a28" },
      selectChance: 80 / 10,
    },
    {
      clubId: "kec",
      backgroundGradient: { from: "#929292", to: "#737373" },
      selectChance: 70 / 10,
    },
    {
      clubId: "css",
      backgroundGradient: { from: "#1113ff", to: "#1213a1" },
      selectChance: 60 / 10,
    },
    {
      clubId: "kmoc",
      backgroundGradient: { from: "#333ae0", to: "#2d3198" },
      selectChance: 50 / 10,
    },
    {
      clubId: "kcc",
      backgroundGradient: { from: "#ff5a5a", to: "#ef0000" },
      selectChance: 40 / 10,
    },
    {
      clubId: "kac",
      backgroundGradient: { from: "#ffd862", to: "#ffbf00" },
      selectChance: 30 / 10,
    },
    {
      clubId: "kphc",
      backgroundGradient: { from: "#00274e", to: "#004991" },
      selectChance: 20 / 10,
    },
    {
      clubId: "kbrc",
      backgroundGradient: { from: "#00274e", to: "#004991" },
      selectChance: 1,
    },
  ]

  return (
    <div className="flex min-h-full w-full flex-col justify-between">
      <Suspense
        fallback={Array.from({ length: 9 }).map((_, i) => (
          <Skeleton
            key={`skeleton-${i.toString()}`}
            height={25.5}
            baseColor="var(--color-gray-900)"
            highlightColor="var(--color-gray-800)"
          />
        ))}
      >
        {DUMMY_DATA.map((data, i) => (
          <PercentageBar
            key={data.clubId}
            tabIndex={i + 1}
            maxChance={Math.max(
              ...DUMMY_DATA.map(d => d.selectChance),
            )}
            {...data}
          />
        ))}
      </Suspense>
    </div>
  )
}

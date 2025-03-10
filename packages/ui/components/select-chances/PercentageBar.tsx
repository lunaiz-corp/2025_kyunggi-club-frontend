import type { DetailedHTMLProps, HTMLAttributes } from "react"
import Image from "next/image"

export type PercentageBarProps = {
  clubId: string
  backgroundGradient: {
    from: string
    to: string
  }
  selectChance: number
  maxChance: number
}

export default function PercentageBar({
  clubId,
  backgroundGradient,
  selectChance,
  maxChance,
  ...props
}: Readonly<
  PercentageBarProps &
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>) {
  return (
    <div
      className="flex w-full items-center gap-4 rounded-xs focus:outline focus:outline-offset-7 focus:outline-ceruleanBlue-700"
      {...props}
    >
      <Image
        src={`https://kg-cdn-toast.schooler.kr/assets/badge/${clubId}.webp`}
        alt={`${clubId} 동아리 배지`}
        width={32}
        height={18}
      />

      {/* w-full인 투명 div에, 1/selectChance * 100% 만큼 채워진 div */}
      <div className="relative h-4 w-full rounded-[5px]">
        <div
          className="absolute inset-0 h-full rounded-[5px] bg-gradient-to-r"
          style={{
            width: `${(selectChance / maxChance) * 100}%`,
            background: `linear-gradient(to right, ${backgroundGradient.from}, ${backgroundGradient.to})`,
          }}
        />
      </div>

      <div>
        <span className="text-right text-sm text-gray-100">
          {(selectChance / 15).toFixed(2)}:1
        </span>
      </div>
    </div>
  )
}

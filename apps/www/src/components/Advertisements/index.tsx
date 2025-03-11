"use client"

/*
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"

import "swiper/css"
import "swiper/css/autoplay"
import "swiper/css/navigation"
import "swiper/css/pagination"

import { cn } from "@packages/ui/utils/tailwindMerge"

export default function Advertisements({
  page,
}: Readonly<{ page: string }>) {
  return (
    <Swiper
      modules={[Autoplay]}
      className={cn(
        "h-[239px] w-full rounded-xl",
        page === "main" && "h-[236px] md:h-[352px] md:w-[570px]",
      )}
      slidesPerView={1}
      spaceBetween={16}
      loop
      speed={400}
      allowTouchMove={false}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <SwiperSlide key={`advertisement-${index.toString()}`}>
          <div className="inline-flex size-full items-center justify-center rounded-xl bg-gradient-to-r from-[#132b75] to-ceruleanBlue-700">
            <span className="text-[27px] font-bold">광고</span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
*/

import Image from "next/image"
import { NextLink } from "@packages/ui/components/krds/Action"

import * as clubsJson from "@/data/clubs.json"

const { clubs } = clubsJson

function ClubsSummary({
  id,
  name,
}: Readonly<{ id: string; name: string }>) {
  return (
    <NextLink href={`/club/${id}`} className="flex justify-between">
      <div className="inline-flex items-center gap-2.5">
        <Image
          src={`https://kg-cdn-toast.schooler.kr/assets/badge/${id}.webp`}
          alt={`${name} 동아리 배지`}
          width={32}
          height={18}
        />

        <span className="w-56 truncate text-lg md:w-96">{name}</span>
      </div>
    </NextLink>
  )
}

export default function Advertisements({
  page,
}: Readonly<{ page: string }>) {
  return (
    page === "main" && (
      <div className="flex w-full flex-1 flex-col gap-5">
        <div className="inline-flex items-center justify-between">
          <h2 className="text-lg font-bold">동아리 목록</h2>

          <NextLink href="/club">
            <span className="text-sm">더보기</span>
          </NextLink>
        </div>

        <div className="flex flex-col gap-4">
          {clubs.map(x => {
            return <ClubsSummary key={x.id} id={x.id} name={x.name} />
          })}
        </div>
      </div>
    )
  )
}

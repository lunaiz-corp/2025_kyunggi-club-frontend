"use client"

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

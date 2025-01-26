"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"

import "swiper/css"
import "swiper/css/autoplay"
import "swiper/css/navigation"
import "swiper/css/pagination"

export default function Advertisements() {
  return (
    <Swiper
      modules={[Autoplay]}
      className="h-[352px] w-[570px] rounded-xl"
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
      <SwiperSlide>
        <div className="inline-flex size-full items-center justify-center rounded-xl bg-gradient-to-r from-[#132b75] to-ceruleanBlue-700">
          <span className="text-[27px] font-bold text-gray-100">
            광고
          </span>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="inline-flex size-full items-center justify-center rounded-xl bg-gradient-to-r from-[#132b75] to-ceruleanBlue-700">
          <span className="text-[27px] font-bold text-gray-100">
            광고
          </span>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="inline-flex size-full items-center justify-center rounded-xl bg-gradient-to-r from-[#132b75] to-ceruleanBlue-700">
          <span className="text-[27px] font-bold text-gray-100">
            광고
          </span>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="inline-flex size-full items-center justify-center rounded-xl bg-gradient-to-r from-[#132b75] to-ceruleanBlue-700">
          <span className="text-[27px] font-bold text-gray-100">
            광고
          </span>
        </div>
      </SwiperSlide>
    </Swiper>
  )
}

"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/autoplay"
import "swiper/css/navigation"
import "swiper/css/pagination"

import "./_styles/advertisements.css"

export default function Advertisements() {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      className="h-[352px] w-[570px] rounded-xl"
      slidesPerView={1}
      spaceBetween={16}
      speed={400}
      loop
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{
        clickable: true,
        el: ".swiper-pagination",
        type: "fraction",
      }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={swiper => console.log(swiper)}
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

      <div className="swiper-indicator">
        <div className="swiper-pagination"></div>

        <div className="swiper-navigation">
          <button type="button" className="swiper-button-prev">
            <span className="sr-only">이전</span>
          </button>

          <button type="button" className="swiper-button-next">
            <span className="sr-only">다음</span>
          </button>
        </div>
      </div>
    </Swiper>
  )
}

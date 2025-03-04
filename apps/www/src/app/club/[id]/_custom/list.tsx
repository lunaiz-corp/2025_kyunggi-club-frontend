/* eslint-disable jsx-a11y/media-has-caption */

"use client"

import { useState } from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"

// import { ALink } from "@packages/ui/components/krds/Action"

// import { ArrowRightIcon } from "@heroicons/react/20/solid"
import { SpeakerXMarkIcon } from "@heroicons/react/24/solid"
import Image from "next/image"

export default function ListCustom() {
  const [firstVideoMuted, setFirstVideoMuted] =
    useState<boolean>(true)

  return (
    <div className="flex flex-col gap-24">
      <div className="flex justify-between gap-6">
        <div className="relative w-full flex-1">
          <video
            loop
            muted={firstVideoMuted}
            autoPlay
            playsInline
            className="size-full rounded-xl"
          >
            <source
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/videos/과기부소개영상1.mp4"
              type="video/mp4"
            />
          </video>

          {firstVideoMuted && (
            <>
              <button
                type="button"
                className="absolute inset-0 z-10 cursor-pointer"
                onClick={() => {
                  setFirstVideoMuted(false)
                }}
              >
                <span className="sr-only">음소거 해제</span>
              </button>

              <div className="absolute top-0 left-0 flex w-full justify-end bg-gradient-to-b from-gray-950/90 to-gray-950/0 p-5 pb-8">
                <SpeakerXMarkIcon className="size-8" />
              </div>
            </>
          )}
        </div>

        <div className="inline-flex w-80 flex-col gap-6">
          <h2 className="text-3xl font-bold">“과기부 소개“</h2>
          <span className="break-keep">
            레이저 커팅기, 3D프린터 아두이노, 목공 장비, VR 등 다양한
            장비들이 있어 다양한 물건들을 자유롭게 설계하고 제작할 수
            있습니다.
          </span>

          {/* <ALink
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit px-4 py-2 font-bold"
          >
            포스터 보기
            <ArrowRightIcon className="size-5" />
          </ALink> */}
        </div>
      </div>

      <div className="flex justify-between gap-6">
        <div className="inline-flex flex-col gap-6">
          <h2 className="text-3xl font-bold">
            “경기고 최다최빈 연합활동”
          </h2>
          <span className="break-keep">
            숙명여고/세화여고 등과 함께 물로켓 제작, 친환경 도시 계획
            프로젝트 등 진행
          </span>
        </div>

        <Swiper
          modules={[Autoplay]}
          className="!m-0 h-[566px] w-[755px] rounded-xl"
          slidesPerView={1}
          spaceBetween={16}
          loop
          speed={400}
          autoplay={{
            delay: 5000,
          }}
        >
          <SwiperSlide>
            <video
              loop
              muted
              autoPlay
              playsInline
              className="h-[566px] w-[755px] object-cover"
            >
              <source
                src="https://kg-cdn-toast.schooler.kr/assets/diy/list/videos/과기부연합영상1.mp4"
                type="video/mp4"
              />
            </video>
          </SwiperSlide>

          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부연합사진1.jpg"
              alt=""
              width={755}
              height={566}
              className="h-[566px] w-[755px] object-cover"
            />
          </SwiperSlide>

          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부연합사진2.jpg"
              alt=""
              width={755}
              height={566}
              className="h-[566px] w-[755px] object-cover"
            />
          </SwiperSlide>

          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부연합사진3.jpg"
              alt=""
              width={755}
              height={566}
              className="h-[566px] w-[755px] object-cover"
            />
          </SwiperSlide>

          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부연합사진4.jpg"
              alt=""
              width={755}
              height={566}
              className="h-[566px] w-[755px] object-cover"
            />
          </SwiperSlide>

          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부연합사진5.jpg"
              alt=""
              width={755}
              height={566}
              className="h-[566px] w-[755px] object-cover"
            />
          </SwiperSlide>

          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부연합사진6.jpg"
              alt=""
              width={755}
              height={566}
              className="h-[566px] w-[755px] object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="flex justify-between gap-6">
        <Swiper
          modules={[Autoplay]}
          className="!m-0 h-[380px] w-[755px] rounded-xl"
          slidesPerView={1}
          spaceBetween={16}
          loop
          speed={400}
          autoplay={{
            delay: 5000,
          }}
        >
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부자율프1.png"
              alt=""
              width={755}
              height={380}
              className="h-[380px] w-[755px] object-cover"
            />
          </SwiperSlide>

          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부자율프2.png"
              alt=""
              width={755}
              height={380}
              className="h-[380px] w-[755px] object-cover"
            />
          </SwiperSlide>

          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부자율프3.png"
              alt=""
              width={755}
              height={380}
              className="h-[380px] w-[755px] object-cover"
            />
          </SwiperSlide>

          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부자율프4.png"
              alt=""
              width={755}
              height={380}
              className="h-[380px] w-[755px] object-cover"
            />
          </SwiperSlide>

          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부자율프5.png"
              alt=""
              width={755}
              height={380}
              className="h-[380px] w-[755px] object-cover"
            />
          </SwiperSlide>

          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부자율프6.png"
              alt=""
              width={755}
              height={380}
              className="h-[380px] w-[755px] object-cover"
            />
          </SwiperSlide>
        </Swiper>

        <div className="inline-flex flex-col gap-6">
          <h2 className="text-3xl font-bold">“자율 프로젝트”</h2>
          <span className="break-keep">
            분필 보관 통 제작, 스승의 날 명패 제작, 서울시 아이디어
            공모전 수상 등 자율적으로 다양한 활동 등을 진행할 수
            있습니다.
          </span>
        </div>
      </div>

      <div className="flex justify-between gap-6">
        <div className="inline-flex flex-col gap-6">
          <h2 className="text-3xl font-bold">“과기부 장비”</h2>
          <span className="break-keep">
            3D 프린터, 3D 펜 레이저 커팅기, 레이저 각인기 VR(오큘러스
            퀘스트 2) 아두이노 목공 기구 등
          </span>
        </div>

        <Swiper
          modules={[Autoplay]}
          className="!m-0 h-[612px] w-[599px] rounded-xl"
          slidesPerView={1}
          spaceBetween={16}
          loop
          speed={400}
          autoplay={{
            delay: 5000,
          }}
        >
          <SwiperSlide>
            <video
              loop
              muted
              autoPlay
              playsInline
              className="h-[612px] w-[599px] object-cover"
            >
              <source
                src="https://kg-cdn-toast.schooler.kr/assets/diy/list/videos/과기부장비영상1.mp4"
                type="video/mp4"
              />
            </video>
          </SwiperSlide>

          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장비1.png"
              alt=""
              width={599}
              height={612}
              className="h-[612px] w-[599px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장비2.png"
              alt=""
              width={599}
              height={612}
              className="h-[612px] w-[599px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장비3.png"
              alt=""
              width={599}
              height={612}
              className="h-[612px] w-[599px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장비4.png"
              alt=""
              width={599}
              height={612}
              className="h-[612px] w-[599px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장비5.png"
              alt=""
              width={599}
              height={612}
              className="h-[612px] w-[599px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장비6.png"
              alt=""
              width={599}
              height={612}
              className="h-[612px] w-[599px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장비7.png"
              alt=""
              width={599}
              height={612}
              className="h-[612px] w-[599px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장비8.png"
              alt=""
              width={599}
              height={612}
              className="h-[612px] w-[599px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장비9.png"
              alt=""
              width={599}
              height={612}
              className="h-[612px] w-[599px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장비10.png"
              alt=""
              width={599}
              height={612}
              className="h-[612px] w-[599px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장비11.png"
              alt=""
              width={599}
              height={612}
              className="h-[612px] w-[599px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장비12.png"
              alt=""
              width={599}
              height={612}
              className="h-[612px] w-[599px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장비13.png"
              alt=""
              width={599}
              height={612}
              className="h-[612px] w-[599px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장비14.png"
              alt=""
              width={599}
              height={612}
              className="h-[612px] w-[599px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장비15.png"
              alt=""
              width={599}
              height={612}
              className="h-[612px] w-[599px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장비16.png"
              alt=""
              width={599}
              height={612}
              className="h-[612px] w-[599px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장비17.png"
              alt=""
              width={599}
              height={612}
              className="h-[612px] w-[599px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장비18.jpeg"
              alt=""
              width={599}
              height={612}
              className="h-[612px] w-[599px] object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="flex justify-between gap-6">
        <div className="inline-flex flex-col gap-6">
          <h2 className="text-3xl font-bold">“과기부 배지”</h2>
          <span className="break-keep">
            과기부 부원 시 과기부원 전용 금색 영문 배지 증정
          </span>
        </div>

        <Swiper
          modules={[Autoplay]}
          className="!m-0 h-[459px] w-[700px] rounded-xl"
          slidesPerView={1}
          spaceBetween={16}
          loop
          speed={400}
          autoplay={{
            delay: 5000,
          }}
        >
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부배지1.png"
              alt=""
              width={700}
              height={459}
              className="h-[459px] w-[700px] object-cover"
            />
          </SwiperSlide>

          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부배지2.png"
              alt=""
              width={700}
              height={459}
              className="h-[459px] w-[700px] object-cover"
            />
          </SwiperSlide>

          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부배지3.png"
              alt=""
              width={700}
              height={459}
              className="h-[459px] w-[700px] object-cover"
            />
          </SwiperSlide>

          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부배지4.png"
              alt=""
              width={700}
              height={459}
              className="h-[459px] w-[700px] object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="flex justify-between gap-6">
        <div className="inline-flex flex-col gap-6">
          <h2 className="text-3xl font-bold">“프로젝트 활동”</h2>
          <span className="break-keep">
            과기부는 ‘경기EV’, ‘KyunggiLife’ 등 그동안 여러 장기
            프로젝트도 진행해왔습니다.
          </span>
        </div>

        <Swiper
          modules={[Autoplay]}
          className="!m-0 h-[522px] w-[678px] rounded-xl"
          slidesPerView={1}
          spaceBetween={16}
          loop
          speed={400}
          autoplay={{
            delay: 5000,
          }}
        >
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장기프로젝트1.png"
              alt=""
              width={678}
              height={522}
              className="h-[522px] w-[678px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장기프로젝트2.png"
              alt=""
              width={678}
              height={522}
              className="h-[522px] w-[678px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장기프로젝트3.png"
              alt=""
              width={678}
              height={522}
              className="h-[522px] w-[678px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장기프로젝트4.png"
              alt=""
              width={678}
              height={522}
              className="h-[522px] w-[678px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장기프로젝트5.png"
              alt=""
              width={678}
              height={522}
              className="h-[522px] w-[678px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장기프로젝트6.png"
              alt=""
              width={678}
              height={522}
              className="h-[522px] w-[678px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장기프로젝트7.png"
              alt=""
              width={678}
              height={522}
              className="h-[522px] w-[678px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장기프로젝트8.png"
              alt=""
              width={678}
              height={522}
              className="h-[522px] w-[678px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장기프로젝트9.png"
              alt=""
              width={678}
              height={522}
              className="h-[522px] w-[678px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장기프로젝트10.png"
              alt=""
              width={678}
              height={522}
              className="h-[522px] w-[678px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장기프로젝트11.png"
              alt=""
              width={678}
              height={522}
              className="h-[522px] w-[678px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장기프로젝트12.png"
              alt=""
              width={678}
              height={522}
              className="h-[522px] w-[678px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://kg-cdn-toast.schooler.kr/assets/diy/list/images/과기부장기프로젝트13.png"
              alt=""
              width={678}
              height={522}
              className="h-[522px] w-[678px] object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

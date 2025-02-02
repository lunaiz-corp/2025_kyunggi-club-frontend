import type { Metadata } from "next"
import Image, { getImageProps } from "next/image"

import { getBackgroundImage } from "@/utils/image"

import Advertisements from "@/components/Advertisements"

export const metadata: Metadata = {
  title: "과학기술정보통신부 소개",
  description:
    "과학기술정보통신부 - Leader of ICT, Science and Technology",

  openGraph: {
    title: "과학기술정보통신부 소개",
    description:
      "과학기술정보통신부 - Leader of ICT, Science and Technology",
  },

  twitter: {
    title: "과학기술정보통신부 소개",
    description:
      "과학기술정보통신부 - Leader of ICT, Science and Technology",
  },
}

export default function ClubDetail() {
  const {
    props: { srcSet: background },
  } = getImageProps({
    alt: "",
    width: 1200,
    height: 675,
    src: "https://cdn.lunaiz.com/kghs/bg_list.png",
  })

  const {
    props: { srcSet: historyPc },
  } = getImageProps({
    alt: "연혁 이미지",
    width: 1200,
    height: 857,
    sizes: "100vw",
    src: "https://cdn.discordapp.com/attachments/1335292116712034304/1335486997048983552/history_list.svg?ex=67a058b0&is=679f0730&hm=79bc690aaf5c63ff91c5aa9057372e9b2281dc5a82f79c6b1aa7bd49480779a5&",
  })

  const {
    props: { srcSet: historyMob, ...rest },
  } = getImageProps({
    alt: "연혁 이미지",
    width: 339,
    height: 1174,
    sizes: "100vw",
    src: "https://cdn.discordapp.com/attachments/1335292116712034304/1335486997397114900/history_list_m.svg?ex=67a058b0&is=679f0730&hm=c8cf07cc195069f51d660b60eb89c95447e830fffbb3a1205eaa3bed9b7c0179&",
  })

  return (
    <main className="mx-auto flex max-w-[1200px] flex-col gap-24 px-6 py-12 md:py-16 lg:px-0">
      <div className="mb-12 flex flex-col gap-24">
        <div
          className="absolute top-[-85px] left-0 -z-50 h-dvh w-full bg-cover bg-center bg-no-repeat md:top-0"
          style={{
            backgroundImage: `linear-gradient(rgba(19, 19, 19, 0.4) 0%, rgb(19, 19, 19) 100%), ${getBackgroundImage(background)}`,
          }}
        />

        <div className="inline-flex flex-col items-center justify-between gap-8 md:flex-row">
          <h1 className="text-5xl font-bold tracking-tight">
            과학기술정보통신부
          </h1>

          <Image
            src="https://cdn.lunaiz.com/kghs/badge_list.png"
            alt="과학기술정보통신부 로고"
            height={72}
            width={128}
          />
        </div>

        <div className="inline-flex flex-col gap-5">
          <h2 className="text-4xl font-bold">“이게 뭐야”</h2>
          <span className="text-lg">
            오늘도 흥미로운 린도 린도 린도 이공계동아리연합 오늘도
            흥미로운 린도 린도 린도 이공계동아리연합 오늘도 흥미로운
            린도 린도 린도 이공계동아리연합 오늘도 흥미로운 린도 린도
            린도 이공계동아리연합 오늘도 흥미로운 린도 린도 린도
            이공계동아리연합
          </span>
        </div>

        <Advertisements page="club" />

        <div className="flex flex-col gap-8">
          <h2 className="text-2xl font-bold">임원진</h2>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
            <div className="flex flex-col justify-center gap-1 rounded-xl bg-ceruleanBlue-900 px-6 py-4">
              <span>부장</span>
              <span className="text-[27px] font-bold">오늘도</span>
            </div>
            <div className="flex flex-col justify-center gap-1 rounded-xl bg-ceruleanBlue-900 px-6 py-4">
              <span>부장</span>
              <span className="text-[27px] font-bold">오늘도</span>
            </div>
            <div className="hidden h-[102px] w-[196px] bg-transparent md:block" />
            <div className="hidden h-[102px] w-[196px] bg-transparent md:block" />
            <div className="hidden h-[102px] w-[196px] bg-transparent md:block" />

            <div className="flex flex-col justify-center gap-1 rounded-xl bg-ceruleanBlue-900 px-6 py-4">
              <span>차장</span>
              <span className="text-[27px] font-bold">흥미로운</span>
            </div>
            <div className="flex flex-col justify-center gap-1 rounded-xl bg-ceruleanBlue-900 px-6 py-4">
              <span>차장</span>
              <span className="text-[27px] font-bold">린도</span>
            </div>
            <div className="flex flex-col justify-center gap-1 rounded-xl bg-ceruleanBlue-900 px-6 py-4">
              <span>차장</span>
              <span className="text-[27px] font-bold">린도</span>
            </div>
            <div className="flex flex-col justify-center gap-1 rounded-xl bg-ceruleanBlue-900 px-6 py-4">
              <span>차장</span>
              <span className="text-[27px] font-bold">린도</span>
            </div>
          </div>
        </div>
      </div>

      <div className="inline-flex flex-col gap-6">
        <h2 className="text-3xl font-bold">
          경기고등학교 동아리 1위
        </h2>
        <span className="text-lg">
          이공계동아리연합을 설립하며 앞장 서 수많은 경기고의 명문
          동아리들을 이끌어왔고 코로나로 인하여 오늘도 흥미로운 린도
          린도 린도 이공계동아리연합 오늘도 흥미로운 린도 린도 린도
          이공계동아리연합 오늘도 흥미로운 린도 린도 린도
          이공계동아리연합 오늘도 흥미로운 린도 린도 린도
          이공계동아리연합 오늘도 흥미로운 린도 린도 린도
          이공계동아리연합 오늘도 흥미로운 린도 린도 린도
          이공계동아리연합 오늘도 흥미로운 린도 린도 린도
          이공계동아리연합 오늘도 흥미로운 린도 린도 린도
          이공계동아리연합
        </span>
      </div>

      <div className="inline-flex flex-col gap-6">
        <h2 className="text-3xl font-bold">연혁</h2>

        <picture>
          <source media="(min-width: 768px)" srcSet={historyPc} />
          <source media="(max-width: 767px)" srcSet={historyMob} />
          <img
            {...rest}
            alt="연혁 이미지"
            className="h-auto w-full"
          />
        </picture>
      </div>
    </main>
  )
}

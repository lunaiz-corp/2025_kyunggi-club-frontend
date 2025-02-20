import type { Metadata } from "next"
import Image, { getImageProps } from "next/image"
import { notFound } from "next/navigation"

import { ChevronLeftIcon } from "@heroicons/react/24/solid"
import { NextLink } from "@packages/ui/components/krds/Action"

import { getBackgroundImage } from "@/utils/image"
import Advertisements from "@/components/Advertisements"

import { clubs } from "@/data/clubs.json"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const currentClub = clubs.find(club => club.id === id)

  if (!currentClub) return {}

  return {
    title: `${currentClub?.name} 소개`,
    description: currentClub?.description,

    openGraph: {
      title: `${currentClub?.name} 소개`,
      description: currentClub?.description,
    },

    twitter: {
      title: `${currentClub?.name} 소개`,
      description: currentClub?.description,
    },
  }
}

export async function generateStaticParams() {
  return clubs.map(club => ({ id: club.id }))
}

export default async function ClubDetail({
  params,
}: Readonly<{
  params: Promise<{ id: string }>
}>) {
  const { id } = await params
  const currentClub = clubs.find(club => club.id === id)

  if (!currentClub) {
    return notFound()
  }

  const {
    props: { srcSet: background },
  } = getImageProps({
    alt: "",
    width: 1200,
    height: 675,
    src: `https://cdn.lunaiz.com/kghs/bg_${id}.png`,
  })

  const {
    props: { srcSet: historyPc },
  } = getImageProps({
    alt: "연혁 이미지",
    width: 1200,
    height: 857,
    sizes: "100vw",
    src: "https://cdn.discordapp.com/attachments/1335292116712034304/1335486997048983552/history_list.svg?ex=67a64770&is=67a4f5f0&hm=cdd16bc00d003a50a347f55513ed8ecaa6c001e4d8345a9c8b32e2636058b130&",
  })

  const {
    props: { srcSet: historyMob, ...rest },
  } = getImageProps({
    alt: "연혁 이미지",
    width: 339,
    height: 1174,
    sizes: "100vw",
    src: "https://cdn.discordapp.com/attachments/1335292116712034304/1335486997397114900/history_list_m.svg?ex=67a64770&is=67a4f5f0&hm=cdfdef3e60f4bfaa65b95e0d5f1d4993d42e403ad914a3a2d613afdf3e7baf90&",
  })

  return (
    <main className="mx-auto mb-12 flex max-w-[1200px] flex-col gap-24 px-6 pt-8 pb-12 lg:px-0">
      <div className="mb-12 flex flex-col gap-24">
        <div
          className="absolute top-[-90px] left-0 -z-50 h-dvh w-full bg-cover bg-center bg-no-repeat md:top-0"
          style={{
            backgroundImage: `linear-gradient(rgba(19, 19, 19, 0.4) 0%, rgb(19, 19, 19) 100%), ${getBackgroundImage(background)}`,
          }}
        />

        <div className="inline-flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-4">
            <NextLink
              href="/club"
              className="hidden p-1.5 md:inline"
              title="뒤로 가기"
            >
              <span className="sr-only">뒤로 가기</span>
              <ChevronLeftIcon className="size-5" />
            </NextLink>

            <h1 className="inline-flex gap-3 text-4xl font-bold tracking-tight md:text-5xl">
              <span className="hidden md:inline">
                {currentClub.name.split(" ")[0]}
              </span>
              <span>{currentClub.name.split(" ")[1]}</span>
            </h1>
          </div>

          <Image
            src={`https://cdn.lunaiz.com/kghs/badge_${id}.png`}
            alt={`${currentClub.name} 로고`}
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

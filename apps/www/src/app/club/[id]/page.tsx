import type { Metadata } from "next"
import Image, { getImageProps } from "next/image"
import { notFound } from "next/navigation"

import { ChevronLeftIcon } from "@heroicons/react/24/solid"
import { NextLink } from "@packages/ui/components/krds/Action"

import { getBackgroundImage } from "@/utils/image"
import Advertisements from "@/components/Advertisements"

import * as clubsJson from "@/data/clubs.json"
import * as clubsDetailJson from "@/data/clubs.detail.json"

// ----------------------------------
import ListCustom from "./_custom/list"
// ----------------------------------

const { clubs } = clubsJson
const { detail: clubsDetail } = clubsDetailJson

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
  const detail = clubsDetail[id as keyof typeof clubsDetail]

  if (!currentClub) {
    return notFound()
  }

  const {
    props: { srcSet: background },
  } = getImageProps({
    alt: "",
    width: 1200,
    height: 675,
    src: `https://kg-cdn-toast.schooler.kr/assets/background/${id}.webp`,
  })

  const {
    props: { srcSet: historyPc },
  } = getImageProps({
    alt: "연혁 이미지",
    width: 1200,
    height: 857,
    sizes: "100vw",
    src: `https://kg-cdn-toast.schooler.kr/assets/history/${id}.svg`,
  })

  const {
    props: { srcSet: historyMob, ...rest },
  } = getImageProps({
    alt: "연혁 이미지",
    width: 339,
    height: 1174,
    sizes: "100vw",
    src: `https://kg-cdn-toast.schooler.kr/assets/history/${id}_m.svg`,
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
            src={
              detail?.custom_logo
                ? (detail?.custom_logo as string)
                : `https://kg-cdn-toast.schooler.kr/assets/badge/${id}.webp`
            }
            alt={`${currentClub.name} 로고`}
            height={72}
            width={128}
          />
        </div>

        <div className="inline-flex flex-col gap-5">
          <h2 className="text-4xl font-bold whitespace-pre-wrap">
            {detail?.headline}
          </h2>
          <span className="text-lg whitespace-pre-wrap">
            {detail?.short_description}
          </span>
        </div>

        <Advertisements page="club" />

        {detail?.members.length > 0 && (
          <div className="flex flex-col gap-8">
            <h2 className="text-2xl font-bold">임원진</h2>

            <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
              {detail?.members.map((lines, lineIndex) =>
                // lines의 length가 5보다 작으면, 나머지는 빈 div로 채워줌
                (lines.length < 5
                  ? [...lines, ...Array(5 - lines.length).fill({})]
                  : lines
                ).map((member, index) =>
                  member.name ? (
                    <div
                      key={`member-${lineIndex.toString()}-${index.toString()}`}
                      className="flex flex-col justify-center gap-1 rounded-xl bg-ceruleanBlue-900 px-6 py-4"
                    >
                      <span>{member.role}</span>
                      <span className="text-[27px] font-bold">
                        {member.name}
                      </span>
                    </div>
                  ) : (
                    <div
                      key={`member-${lineIndex.toString()}-${index.toString()}`}
                      className="hidden h-[102px] w-[196px] bg-transparent md:block"
                    />
                  ),
                ),
              )}
            </div>
          </div>
        )}
      </div>

      {detail?.long_description.length > 0 &&
        detail?.long_description?.map((long, index) => (
          <div
            key={`long_description-${index.toString()}`}
            className="inline-flex flex-col gap-6"
          >
            {long.headline && (
              <h2 className="text-3xl font-bold whitespace-pre-wrap">
                {long.headline}
              </h2>
            )}
            <span className="text-lg whitespace-pre-wrap">
              {long.description}
            </span>
          </div>
        ))}

      {id === "list" && <ListCustom />}

      {detail?.history && (
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
      )}

      {detail?.historic_members.length > 0 && (
        <div className="flex flex-col gap-8">
          <h2 className="text-3xl font-bold">역대 임원진</h2>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
            {detail?.historic_members.map((lines, lineIndex) =>
              // lines의 length가 5보다 작으면, 나머지는 빈 div로 채워줌
              (lines.length < 5
                ? [...lines, ...Array(5 - lines.length).fill({})]
                : lines
              ).map((member, index) =>
                member.name ? (
                  <div
                    key={`historicmember-${lineIndex.toString()}-${index.toString()}`}
                    className="flex flex-col justify-center gap-1 rounded-xl bg-ceruleanBlue-900 px-6 py-4"
                  >
                    <span>{member.year}</span>
                    <span className="text-[27px] font-bold">
                      {member.name}
                    </span>
                  </div>
                ) : (
                  <div
                    key={`historicmember-${lineIndex.toString()}-${index.toString()}`}
                    className="hidden h-[102px] w-[196px] bg-transparent md:block"
                  />
                ),
              ),
            )}
          </div>
        </div>
      )}
    </main>
  )
}

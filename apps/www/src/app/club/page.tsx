import type { Metadata } from "next"
import Image from "next/image"

import { NextLink } from "@packages/ui/components/krds/Link"
import Advertisements from "@/components/Advertisements"

export const metadata: Metadata = {
  title: "동아리 소개",
  openGraph: {
    title: "동아리 소개",
  },
  twitter: {
    title: "동아리 소개",
  },
}

export default function ClubList() {
  return (
    <main className="mx-auto mt-8 flex max-w-[1200px] flex-col gap-12 px-6 md:mt-16 lg:px-0">
      <h1 className="text-4xl font-bold tracking-tight">
        동아리 소개
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        <NextLink
          href="/club/list"
          className="justify-between rounded-xl bg-gray-800 p-5"
        >
          <div className="text-2xl font-bold">과학기술정보통신부</div>
          <Image
            src="https://cdn.lunaiz.com/kghs/badge_list.png"
            alt="과학기술정보통신부 로고"
            height={45}
            width={80}
          />
        </NextLink>
        <NextLink
          href="/club/kec"
          className="justify-between rounded-xl bg-gray-800 p-5"
        >
          <div className="text-2xl font-bold">기계공학부</div>
          <Image
            src="https://cdn.lunaiz.com/kghs/badge_kec.png"
            alt="기계공학부 로고"
            height={45}
            width={80}
          />
        </NextLink>
        <NextLink
          href="/club/kphc"
          className="justify-between rounded-xl bg-gray-800 p-5"
        >
          <div className="text-2xl font-bold">물리부</div>
          <Image
            src="https://cdn.lunaiz.com/kghs/badge_kphc.png"
            alt="물리부 로고"
            height={45}
            width={80}
          />
        </NextLink>

        <NextLink
          href="/club/kbrc"
          className="justify-between rounded-xl bg-gray-800 p-5"
        >
          <div className="text-2xl font-bold">생물부</div>
          <Image
            src="https://cdn.lunaiz.com/kghs/badge_kbrc.png"
            alt="생물부 로고"
            height={45}
            width={80}
          />
        </NextLink>
        <NextLink
          href="/club/kmoc"
          className="justify-between rounded-xl bg-gray-800 p-5"
        >
          <div className="text-2xl font-bold">수학부</div>
          <Image
            src="https://cdn.lunaiz.com/kghs/badge_kmoc.png"
            alt="수학부 로고"
            height={45}
            width={80}
          />
        </NextLink>
        <NextLink
          href="/club/kac"
          className="justify-between rounded-xl bg-gray-800 p-5"
        >
          <div className="text-2xl font-bold">천문학부</div>
          <Image
            src="https://cdn.lunaiz.com/kghs/badge_kac.png"
            alt="천문학부 로고"
            height={45}
            width={80}
          />
        </NextLink>

        <NextLink
          href="/club/css"
          className="justify-between rounded-xl bg-gray-800 p-5"
        >
          <div className="text-2xl font-bold">창의융합과학부</div>
          <Image
            src="https://cdn.lunaiz.com/kghs/badge_css.png"
            alt="창의융합과학부 로고"
            height={45}
            width={80}
          />
        </NextLink>
        <NextLink
          href="/club/cel"
          className="justify-between rounded-xl bg-gray-800 p-5"
        >
          <div className="text-2xl font-bold">컴퓨터부</div>
          <Image
            src="https://cdn.lunaiz.com/kghs/badge_cel.png"
            alt="컴퓨터부 로고"
            height={45}
            width={80}
          />
        </NextLink>
        <NextLink
          href="/club/kcc"
          className="justify-between rounded-xl bg-gray-800 p-5"
        >
          <div className="text-2xl font-bold">화학부</div>
          <Image
            src="https://cdn.lunaiz.com/kghs/badge_kcc.png"
            alt="화학부 로고"
            height={45}
            width={80}
          />
        </NextLink>
      </div>

      <Advertisements page="club" />
    </main>
  )
}

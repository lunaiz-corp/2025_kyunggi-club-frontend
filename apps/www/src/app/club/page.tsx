import type { Metadata } from "next"
import Image from "next/image"

import { NextLink } from "@packages/ui/components/krds/Action/Link"
import Advertisements from "@/components/Advertisements"

import { clubs } from "@/data/clubs.json"

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
    <main className="mx-auto mb-12 flex max-w-[1200px] flex-col gap-12 px-6 pt-8 lg:px-0">
      <h1 className="text-4xl font-bold tracking-tight md:text-[42px]">
        동아리 소개
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {clubs.map(club => (
          <NextLink
            href={`/club/${club.id}`}
            className="justify-between rounded-xl bg-gray-800 p-5"
            key={club.id}
          >
            <div className="text-2xl font-bold">
              {club.name.split(" ")[1]}
            </div>
            <Image
              src={`https://cdn.lunaiz.com/kghs/badge_${club.id}.png`}
              alt={`${club.name} 로고`}
              height={45}
              width={80}
            />
          </NextLink>
        ))}
      </div>

      <Advertisements page="club" />
    </main>
  )
}

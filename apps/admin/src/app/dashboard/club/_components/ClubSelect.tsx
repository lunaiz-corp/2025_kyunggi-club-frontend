import Image from "next/image"

import { NextLink } from "@packages/ui/components/krds/Action"

import * as clubsJson from "@/data/clubs.json"

const { clubs } = clubsJson

export default function ClubSelect({
  nextUrl,
}: Readonly<{ nextUrl: string }>) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {clubs.map(club => (
        <NextLink
          href={`${nextUrl}/${club.id}`}
          className="justify-between rounded-xl bg-gray-800 p-5 hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-700"
          key={club.id}
        >
          <div className="text-2xl font-bold">
            {club.name.split(" ")[1]}
          </div>
          <Image
            src={`hhttps://kg-cdn-toast.schooler.kr/assets/badge/${club.id}.webp`}
            alt={`${club.name} 로고`}
            height={45}
            width={80}
          />
        </NextLink>
      ))}
    </div>
  )
}

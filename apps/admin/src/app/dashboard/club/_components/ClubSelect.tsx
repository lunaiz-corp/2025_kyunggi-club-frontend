"use client"

import { useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next-nprogress-bar"

import { useQuery } from "@tanstack/react-query"
import { getProfile } from "@/api/profile"

import { NextLink } from "@packages/ui/components/krds/Action"

import * as clubsJson from "@/data/clubs.json"

const { clubs } = clubsJson

export default function ClubSelect({
  nextUrl,
}: Readonly<{ nextUrl: string }>) {
  const router = useRouter()

  const {
    isLoading: isProfileLoading,
    error: profileError,
    data: profile,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  })

  useEffect(() => {
    ;(async () => {
      // Check the token is exist
      if (!localStorage.getItem("accessToken")) {
        router.replace("/auth/signin")
        return
      }

      // Check the token is valid
      if ((!isProfileLoading && !profile) || profileError) {
        localStorage.removeItem("accessToken")
        router.replace("/auth/signin")
        return
      }

      if (profile.club.length === 1) {
        router.push(`${nextUrl}/${profile.club[0]}`)
      }
    })()
  })

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {profile &&
        clubs
          .filter(club => profile.club.includes(club.id))
          .map(club => (
            <NextLink
              href={`${nextUrl}/${club.id}`}
              className="justify-between rounded-xl bg-gray-800 p-5 hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-700"
              key={club.id}
            >
              <div className="text-2xl font-bold">
                {club.name.split(" ")[1]}
              </div>
              <Image
                src={`https://kg-cdn-toast.schooler.kr/assets/badge/${club.id}.webp`}
                alt={`${club.name} 로고`}
                height={45}
                width={80}
              />
            </NextLink>
          ))}
    </div>
  )
}

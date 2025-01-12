"use client"

import { useEffect } from "react"

import HappytalkService from "./happytalk"

export default function Happytalk() {
  useEffect(() => {
    HappytalkService.boot({
      siteId: "6000000578",
      siteName: "경기고등학교 이공계동아리연합",

      categoryId: "193348",
      divisionId: "193349",

      // kakaoId: '@kyunggi',

      dynamicScript: true,
    })
  }, [])

  return null
}

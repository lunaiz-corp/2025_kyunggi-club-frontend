"use client"

import { useEffect } from "react"

import * as ChannelService from "@channel.io/channel-web-sdk-loader"

export default function Happytalk() {
  useEffect(() => {
    ChannelService.loadScript()
    ChannelService.boot({
      pluginKey: "15cf15bd-8f69-4e33-8974-cbf8690beb3e",
      // memberId: "",
      // memberHash: "",
      // profile: {}
    })
  }, [])

  return null
}

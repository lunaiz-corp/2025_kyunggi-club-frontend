import { Airtake } from "@airtake/browser"

export const airtake = Airtake.init({
  token: process.env.NEXT_PUBLIC_AIRTAKE_TOKEN!,
})

import type { Metadata } from "next"
import Image from "next/image"

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
  return (
    <main className="mx-auto flex max-w-[1200px] flex-col gap-24 px-6 py-12 md:py-16 lg:px-0">
      <div className="mb-12 flex flex-col gap-24">
        <div
          className="absolute top-[-85px] left-0 -z-50 h-dvh w-full md:top-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(19, 19, 19, .4) 0%, rgba(19, 19, 19, 1) 100%), url('https://cdn.lunaiz.com/kghs/bg_list.png') lightgray 50% / cover no-repeat",
          }}
        />

        <div className="inline-flex flex-col items-center justify-between gap-8 md:flex-row">
          <h1 className="text-5xl font-bold">과학기술정보통신부</h1>

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

        <div className="inline-flex h-[239px] items-center justify-center rounded-4xl bg-ceruleanBlue-950">
          <span className="text-5xl font-bold text-gray-100">
            광고
          </span>
        </div>

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

        <Image
          src="https://cdn.discordapp.com/attachments/1335292116712034304/1335292153605390336/history_list.svg?ex=679fa339&is=679e51b9&hm=5af54ee091705be91b8a1cd83261253596fa239203ba33be5e95b738a7728566&"
          alt="연혁 이미지"
          width={1200}
          height={1000}
        />
      </div>
    </main>
  )
}

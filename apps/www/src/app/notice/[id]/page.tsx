import type { Metadata } from "next"

import { ChevronLeftIcon } from "@heroicons/react/24/solid"
import { NextLink } from "@packages/ui/components/krds/Action/Link"

import Advertisements from "@/components/Advertisements"

export const metadata: Metadata = {
  title: "공지사항 보기",
  openGraph: {
    title: "공지사항 보기",
  },
  twitter: {
    title: "공지사항 보기",
  },
}

export default function NoticeDetail() {
  return (
    <main className="mx-auto mb-12 flex max-w-[1200px] flex-col gap-12 px-6 pt-8 lg:px-0">
      <h1 className="text-4xl font-bold tracking-tight md:text-[42px]">
        공지사항
      </h1>

      <Advertisements page="notice" />

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <NextLink href="/notice" className="p-1.5">
            <ChevronLeftIcon className="size-5" />
          </NextLink>

          <div className="text-gray-10 text-3xl font-bold">
            제목: 죄송합니다.
          </div>
        </div>

        <div className="text-gray-300">2025년 1월 21일 00:05:08</div>
      </div>

      <article className="inline-flex flex-col gap-11">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="h-[248px] w-[443px] rounded-[15px]"
          src="https://placeholderjs.com/443x248&text=443+x+248&fontsize=40&color=_9e9e9e"
          alt=""
        />

        <span>
          안녕하세요. 저는 트위치에서 방송을 하고 있는 스트리머
          케인입니다. 먼저 저의 말과 행동으로 인해 큰 피해를 끼치고
          실망을 드린 샌드백님, 시청자분들께 죄송합니다.
          <br />
          <br />
          지금부터는 제가 정리한 글을 보면서 이야기하겠습니다.
          <br />
          <br />
          저는 3월 18일 우희쨩님의 해명 방송, 샌드백님의 반박 방송에
          대해 누구의 편도 들지 않고 중립적인 위치에서 방송한다고
          말하였으나, 일방적으로 우희쨩님 편에 선 방송을 했습니다.
          또한 제3자인 제가 당사자들의 연애 문제에 주제넘은 간섭을
          했습니다. 그로 인해 당사자 및 많은 분들에게 실망을
          안겨드렸습니다.
          <br />
          <br />
          2018년 저는 평소 친하게 지내는 우희쨩님에게 제가 좋아하는
          샌드백님을 소개시켜주었고 두 분은 잘 사귀며 공개 연애를
          했습니다.
          <br />
          <br />
          (&apos;샌드백님의 허락을 받고 올리는 내용입니다&apos;라는
          자막과 샌드백, 케인의 카카오톡 내용 캡처)
          <br />
          <br />
          공개 연애 후 서로 평소보다 방송이 잘 되지 않아 방송으로는
          서로 이별을 했다고 말을 한 후 두분은 계속 사귀었고, 2020년
          2월 초에 두분은 헤어졌습니다. 헤어진 후 우희쨩님은
          샌드백님이 방송에서 자꾸 본인 얘기를 해서 시청자들의 언급,
          이간질, 커뮤니티에 본인의 부정적인 글에 대해 힘들다는 연락이
          왔습니다. 그 후 저도 샌드백님이 우희쨩님에 대해 언급을 하는
          방송을 보았습니다. 그래서 제가 샌드백님에게 연락을 취해
          만났습니다. 평상시 둘의 연애 갈등은 우희쨩님과만 이야기를
          하였고 샌드백님의 말은 만나서 그때 들었습니다. 말을 다 듣고
          그동안 제가 샌드백님에게 오해하고 있는 부분들이 많이
          있었습니다. 하지만 그 많은 것들이 모두 오해였습니다.
        </span>
      </article>
    </main>
  )
}

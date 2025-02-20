import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import {
  ChevronLeftIcon,
  PencilIcon,
} from "@heroicons/react/24/solid"
import { TrashIcon } from "@heroicons/react/24/outline"

import { NextLink, Button } from "@packages/ui/components/krds/Action"

export const metadata: Metadata = {
  title: "공지사항 관리",
  openGraph: {
    title: "공지사항 관리",
  },
  twitter: {
    title: "공지사항 관리",
  },
}

export default async function Notice({
  params,
}: Readonly<{
  params: Promise<{ id: string }>
}>) {
  const { id } = await params

  if (Number.isNaN(Number(id))) {
    notFound()
  }

  return (
    <div className="my-10 flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <NextLink href="/dashboard/notice" className="p-1.5">
            <ChevronLeftIcon className="size-5" />
          </NextLink>

          <div className="text-gray-10 text-3xl font-bold">
            제목: Lorem Ipsum
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

        <span className="pre-line">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Vestibulum finibus laoreet est, a aliquet velit maximus ac.
          Integer ullamcorper lacinia sagittis. Morbi eleifend commodo
          enim, vel lacinia ipsum rutrum dictum. Aliquam ex leo,
          placerat eget efficitur quis, imperdiet eu felis.
          Suspendisse in sodales nisi. Integer a mauris elit. Nam
          vitae vestibulum ex. Vivamus consectetur velit elit, eget
          fermentum diam commodo ultrices. Aenean eget tincidunt erat,
          eu consequat leo. Aliquam cursus blandit hendrerit. Donec
          rhoncus dolor lorem, facilisis sodales lorem maximus a.
          Aliquam ultricies est dolor, at auctor turpis tincidunt ut.
          Nam placerat odio in gravida ultrices. Pellentesque nec enim
          nec mi condimentum dictum. Nulla commodo at nisl a aliquet.
          Aliquam id risus et mauris gravida venenatis id a dolor.
          Donec sit amet lacus eu ex commodo porta. Phasellus eu magna
          eget nisl dapibus convallis sit amet nec massa. Etiam risus
          sem, ullamcorper eu risus at, malesuada elementum tellus.
          Nulla porttitor, mauris in suscipit dictum, tellus ipsum
          facilisis risus, id tincidunt est sem et justo. Nullam eu
          turpis eu ipsum fermentum efficitur cursus elementum nisi.
          Vestibulum consectetur elit vitae erat ultricies ornare.
          Integer maximus, sapien eu congue tempus, leo nulla dictum
          lectus, consectetur vehicula neque nibh eu dolor.
          Suspendisse malesuada tortor facilisis, consectetur erat
          tristique, scelerisque mauris. Aliquam rhoncus, lacus vel
          lobortis maximus, est urna scelerisque magna, sed convallis
          odio nibh et neque. Phasellus euismod sapien vel mauris
          elementum fringilla. Aenean cursus eget sem eu varius. Sed
          ornare tortor convallis cursus pharetra. Mauris ornare,
          purus nec laoreet varius, mauris est blandit tortor, a
          tempor sapien ligula id augue. Donec vehicula vulputate
          scelerisque. Curabitur sodales est id urna imperdiet
          dignissim. Donec consequat sodales risus eget dapibus.
          Nullam semper tincidunt erat ut lacinia. Integer at pharetra
          felis, id placerat velit. Pellentesque mattis diam id neque
          eleifend suscipit. Aenean porttitor turpis vel pharetra
          malesuada. Sed quis magna a massa posuere iaculis. Donec
          placerat rutrum odio dignissim imperdiet. Suspendisse et
          bibendum erat. Morbi molestie, nisi vitae elementum
          faucibus, mauris tortor porta velit, ac cursus nibh ligula
          id dui. Aliquam ultrices sagittis mauris, ac commodo lorem
          congue et. Cras vulputate aliquet tortor et fermentum.
          Integer et vestibulum odio. Phasellus rutrum lacus nec felis
          suscipit ornare. Fusce congue nulla eu tempor fermentum.
          Vivamus lacinia et mauris nec luctus. Integer quis ex
          turpis. Proin porta elementum rhoncus. Integer convallis
          tempor nisl nec ultrices. Suspendisse vulputate faucibus
          luctus. Proin a ipsum in nulla fermentum condimentum.
          Aliquam erat volutpat. Nullam suscipit orci in felis feugiat
          pulvinar.
        </span>
      </article>

      <div className="flex gap-6">
        <Button
          type="button"
          className="disabled:bg-point-970 border-point-500 bg-point-500 hover:bg-point-400 focus:bg-point-400 focus:outline-point-500 active:bg-point-400 disabled:cursor-not-allowed disabled:border-point-700"
        >
          <TrashIcon className="size-5 stroke-gray-100 stroke-2" />
          <span className="text-gray-100">삭제</span>
        </Button>

        <Link href={`/dashboard/notice/${id}/edit`}>
          <Button
            type="button"
            className="border-gray-100 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:outline-gray-100 active:bg-gray-200 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-300"
          >
            <PencilIcon className="size-4 fill-gray-900" />
            <span className="text-gray-900">수정</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}

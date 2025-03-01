import Spinner from "@/assets/spinner.svg"
import PassCallback from "../_components/PassCallback"

export default async function KcpPassCallback({
  searchParams,
}: Readonly<{
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}>) {
  const data = (await searchParams).data as string
  const orderId = (await searchParams).orderId as string

  const parsedData = JSON.parse(
    typeof window === "undefined"
      ? Buffer.from(data, "base64").toString("utf-8")
      : atob(data),
  ) as {
    res_cd: string
    res_msg: string
    user_name?: string
    phone_no?: string
    is_parent?: boolean
  }

  return (
    <div className="absolute top-[-90px] left-0 z-[9999] flex h-dvh w-dvw flex-col items-center justify-center gap-5 bg-gray-900 md:top-0">
      <h3 className="text-2xl leading-8 font-bold">인증 중</h3>

      <p className="mt-2.5 inline-flex items-center justify-center gap-3 leading-6 text-gray-300">
        <Spinner className="size-6 stroke-gray-100" />
        인증 정보를 가져오는 중입니다...
      </p>

      <PassCallback orderId={orderId} data={parsedData} />
    </div>
  )
}

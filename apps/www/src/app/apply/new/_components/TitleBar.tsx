export default function TitleBar({
  title,
}: Readonly<{ title: string }>) {
  return (
    <div className="inline-flex flex-col gap-3">
      <span className="text-2xl text-gray-600">지원하기</span>
      <h1 className="text-4xl font-bold tracking-tight md:text-[42px]">
        {title}
      </h1>
    </div>
  )
}

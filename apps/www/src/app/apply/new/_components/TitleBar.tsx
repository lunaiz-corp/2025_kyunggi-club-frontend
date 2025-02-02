export default function TitleBar({
  title,
}: Readonly<{ title: string }>) {
  return (
    <div className="inline-flex flex-col gap-1">
      <span className="text-2xl text-gray-600">지원하기</span>
      <h1 className="text-[42px] font-bold tracking-tight">
        {title}
      </h1>
    </div>
  )
}

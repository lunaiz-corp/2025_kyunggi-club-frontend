export default function TitleBar({
  category,
  title,
}: Readonly<{
  category: string
  title: string
}>) {
  return (
    <div className="mt-5 inline-flex flex-col gap-2">
      <span className="text-xl text-gray-400">{category}</span>
      <h1 className="text-3xl font-bold tracking-tight md:text-[36px]">
        {title}
      </h1>
    </div>
  )
}

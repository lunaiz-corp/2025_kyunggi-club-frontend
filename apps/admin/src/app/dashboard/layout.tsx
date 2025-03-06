import Sidebar from "@/components/navigation/Sidebar"
import Topbar from "@/components/navigation/Topbar"

export default function DashboardLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex">
      <Sidebar />

      <div className="max-h-dvh w-full overflow-y-auto px-10 pt-8 pb-20 md:pb-8">
        <Topbar />
        {children}
      </div>
    </main>
  )
}

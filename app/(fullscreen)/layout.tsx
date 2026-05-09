export default function FullscreenLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {children}
    </div>
  )
}

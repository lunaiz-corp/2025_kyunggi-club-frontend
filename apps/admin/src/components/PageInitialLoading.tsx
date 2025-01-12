export default function PageInitialLoading() {
  return (
    <div className="flex h-dvh flex-1 items-center justify-center">
      <svg
        height="100%"
        viewBox="0 0 32 32"
        width="100%"
        className="size-8 animate-spin stroke-white"
      >
        <circle
          cx="16"
          cy="16"
          fill="none"
          r="14"
          strokeWidth={4}
          opacity={0.2}
        />
        <circle
          cx="16"
          cy="16"
          fill="none"
          r="14"
          strokeWidth={4}
          strokeDasharray={80}
          strokeDashoffset={60}
        />
      </svg>
    </div>
  )
}

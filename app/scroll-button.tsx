"use client"

export function ScrollButton() {
  const scrollToContent = () => {
    document.getElementById("content")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <button
      onClick={scrollToContent}
      className="animate-fade-up animate-fade-up-delay-3 mt-4 flex flex-col items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <span>Read More</span>
      <svg
        className="h-5 w-5 animate-bounce"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </button>
  )
}

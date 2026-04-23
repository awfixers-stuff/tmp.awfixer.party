interface XAccountProps {
  username: string
}

export function XAccount({ username }: XAccountProps) {
  return (
    <div className="my-8">
      <h2 id="x-twitter" className="scroll-mt-24 text-2xl font-semibold tracking-tight sm:text-3xl">
        X (Twitter)
      </h2>
      <p className="mt-2 text-muted-foreground">
        Follow us on X for the latest updates, policy discussions, and community engagement.
      </p>
      <div className="mt-6 flex items-center gap-4 rounded-lg border bg-card p-6">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-purple-600">
          <svg
            className="h-8 w-8 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="font-heading text-xl font-bold">AWFixer Party</span>
          <span className="text-muted-foreground">@{username}</span>
        </div>
        <a
          href={`https://x.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex items-center justify-center rounded-md bg-[#000000] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#000000]/80"
        >
          Follow
          <svg
            className="ml-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}
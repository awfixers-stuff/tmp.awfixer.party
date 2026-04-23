export function XPosts() {
  return (
    <div className="my-8">
      <p className="mb-4 text-muted-foreground">
        Stay up to date with our latest posts and announcements.
      </p>
      <div className="rounded-lg border bg-card">
        <div className="flex items-center justify-center border-b p-8">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p className="mt-4 font-heading text-lg font-semibold">X Timeline</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Follow our X account to see real-time updates
            </p>
            <a
              href="https://x.com/awfixerparty"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700"
            >
              View on X
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
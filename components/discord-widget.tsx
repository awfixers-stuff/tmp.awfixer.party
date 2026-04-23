interface DiscordWidgetProps {
  serverId: string
  inviteUrl: string
  serverName: string
}

interface WidgetResponse {
  presence_count?: number
}

interface GuildResponse {
  approximate_member_count?: number
}

export async function DiscordWidget({ serverId, inviteUrl, serverName }: DiscordWidgetProps) {
  let onlineCount: number | null = null
  let totalMembers: number | null = null

  try {
    const res = await fetch(
      `https://discord.com/api/guilds/${serverId}/widget.json`,
      { next: { revalidate: 60 } },
    )
    if (res.ok) {
      const data: WidgetResponse = await res.json()
      onlineCount = data.presence_count ?? null
    }
  } catch {
    // widget disabled or network error — degrade gracefully
  }

  const botToken = process.env.DISCORD_BOT_TOKEN
  if (botToken) {
    try {
      const res = await fetch(
        `https://discord.com/api/v10/guilds/${serverId}?with_counts=true`,
        {
          headers: { Authorization: `Bot ${botToken}` },
          next: { revalidate: 300 },
        },
      )
      if (res.ok) {
        const data: GuildResponse = await res.json()
        totalMembers = data.approximate_member_count ?? null
      }
    } catch {
      // bot token missing or invalid — skip total count
    }
  }

  const isExternal = inviteUrl.startsWith("http")

  return (
    <div className="my-8">
      <h2 id="discord" className="scroll-mt-24 text-2xl font-semibold tracking-tight sm:text-3xl">
        Discord
      </h2>
      <p className="mt-2 text-muted-foreground">
        Join our Discord server to connect with the community, participate in discussions, and stay informed.
      </p>
      <div className="mt-6 overflow-hidden rounded-xl border bg-card">
        <div className="relative flex items-center gap-4 border-b border-border/50 bg-gradient-to-r from-[#5865F2]/10 to-purple-600/10 p-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#5865F2]">
            <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-xl font-bold">{serverName}</span>
            <span className="text-sm text-muted-foreground">Community Server</span>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-purple-600/10 p-4 text-center">
              {onlineCount !== null ? (
                <>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                    <span className="font-heading text-2xl font-bold text-purple-600">
                      {onlineCount.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">Online Now</div>
                </>
              ) : (
                <>
                  <div className="font-heading text-2xl font-bold text-purple-600">24/7</div>
                  <div className="mt-1 text-xs text-muted-foreground">Community Access</div>
                </>
              )}
            </div>
            <div className="rounded-lg bg-purple-600/10 p-4 text-center">
              {totalMembers !== null ? (
                <>
                  <div className="font-heading text-2xl font-bold text-purple-600">
                    {totalMembers.toLocaleString()}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">Total Members</div>
                </>
              ) : (
                <>
                  <div className="font-heading text-2xl font-bold text-purple-600">Discussion</div>
                  <div className="mt-1 text-xs text-muted-foreground">Policy Channels</div>
                </>
              )}
            </div>
            <div className="col-span-2 rounded-lg bg-purple-600/10 p-4 text-center sm:col-span-1">
              <div className="font-heading text-2xl font-bold text-purple-600">Events</div>
              <div className="mt-1 text-xs text-muted-foreground">Town Halls & More</div>
            </div>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">
            Our Discord server is the central hub for real-time community discussion. Join to participate in policy debates, connect with other members, and get involved.
          </p>
          <a
            href={inviteUrl}
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#5865F2] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#5865F2]/80"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.30z" />
            </svg>
            Join Discord Server
          </a>
        </div>
      </div>
    </div>
  )
}

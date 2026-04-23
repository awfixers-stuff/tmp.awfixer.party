import type { Metadata } from "next"

import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Party Leadership | AWFixer Political Party",
  description: "Meet the leadership of the AWFixer Political Party.",
}

const members = [
  {
    slug: "awfixer",
    name: "AWFixer",
    role: "Founder & Co-Leader",
    description: "Systems thinker and former software engineer who founded the party on the principle of incentive-based governance.",
  },
]

export default function MembersPage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-12 px-4 pb-16 sm:gap-14 sm:px-6 sm:pb-20">
      <header className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-widest text-purple-600">
          AWFixer Political Party
        </p>
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Party Leadership
        </h1>
        <p className="text-muted-foreground italic">
          "A party that cannot govern itself has no credibility demanding it of others."
        </p>
      </header>
      <Separator className="bg-border/60" />
      <div className="space-y-8">
        <p className="text-lg leading-relaxed">
          AWFixer is led by three Co-Leaders with equal authority, supported by a Steering Committee of seven members. All leaders are subject to the same transparency and accountability standards the party advocates for in government.
        </p>

        <div className="grid gap-6">
          {members.map((member) => (
            <a
              key={member.slug}
              href={`/governance/members/${member.slug}`}
              className="group block rounded-lg border border-border p-6 transition-colors hover:border-purple-600 hover:bg-card"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-purple-600 text-2xl font-bold text-white">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-heading text-xl font-bold group-hover:text-purple-600">
                    {member.name}
                  </h2>
                  <p className="text-sm font-medium text-purple-600">{member.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{member.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-bold">Steering Committee</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            The seven-member Steering Committee includes the three Co-Leaders and four elected members. Full biographies will be published as members join the party.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-bold">Join the Party</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            AWFixer is growing. Members can run for leadership positions after 180 days of membership. Every member has voting rights on party decisions.
          </p>
          <a
            href="/join"
            className="mt-4 inline-flex items-center justify-center rounded-md bg-purple-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700"
          >
            Become a Member
          </a>
        </div>
      </div>
    </main>
  )
}
"use client"

export function AwfixerContent() {
  return (
    <>
      <div className="mb-8 flex flex-col items-center sm:flex-row sm:items-start sm:gap-8">
        <div className="mb-6 flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-purple-600 text-5xl font-bold text-white">
          A
        </div>
        <div className="text-center sm:text-left">
          <h2 className="font-heading text-2xl font-bold">AWFixer</h2>
          <p className="text-muted-foreground">Founder & Co-Leader</p>
          <p className="mt-2 text-sm text-muted-foreground">Member since founding</p>
        </div>
      </div>

      <p className="text-lg font-medium leading-relaxed">
        AWFixer is the founder and original inspiration for the AWFixer Political Party. A former software engineer and systems thinker, AWFixer spent fifteen years studying the institutional failures that produce consistent bad outcomes across political administrations.
      </p>

      <p>
        The insight that became the party's core philosophy — "fix the incentive, change the outcome" — emerged from analyzing why technically competent governments repeatedly make the same structural mistakes. AWFixer concluded that the problem was never competence but incentive alignment.
      </p>

      <h2 id="background" className="scroll-mt-24 text-2xl font-semibold tracking-tight sm:text-3xl animate-fade-up">
        Background
      </h2>
      
      <p>
        Before founding the party, AWFixer worked in technology with a focus on distributed systems and incentive design. This background shaped the analytical framework that now guides the party's policy positions: every institution is a system, every system has incentives, and outcomes follow incentive structures — not intentions.
      </p>

      <h2 id="role" className="scroll-mt-24 text-2xl font-semibold tracking-tight sm:text-3xl animate-fade-up">
        Role in the Party
      </h2>
      
      <p>
        As one of three Co-Leaders, AWFixer focuses on: strategic direction, policy coherence, and party governance. Under the party's structural rules, no single Co-Leader can make unilateral decisions — all major decisions require agreement from at least two Co-Leaders.
      </p>

      <h2 id="commitments" className="scroll-mt-24 text-2xl font-semibold tracking-tight sm:text-3xl animate-fade-up">
        Public Commitments
      </h2>
      
      <ul className="list-disc space-y-2 pl-6">
        <li>Will never accept campaign contributions from PACs, corporations, or dark money sources</li>
        <li>Will publish all campaign expenditures in real-time</li>
        <li>Will submit to annual financial disclosure</li>
        <li>Will step down if convicted of any felony</li>
        <li>Will not serve more than two terms as Co-Leader</li>
      </ul>

      <h2 id="contact" className="scroll-mt-24 text-2xl font-semibold tracking-tight sm:text-3xl animate-fade-up">
        Contact
      </h2>
      
      <p>
        AWFixer can be reached through the party's official communication channels. The party does not engage with media through proxies or intermediaries — all official communications come directly from party channels.
      </p>
    </>
  )
}
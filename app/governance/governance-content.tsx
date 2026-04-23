"use client"

export function GovernanceContent() {
  return (
    <>
      <section className="rounded-lg border-l-4 border-purple-600 bg-card p-6 animate-fade-up">
        <h2 className="font-heading text-2xl font-bold">
          A political party that{' '}
          <span className="text-purple-600">governs itself</span>{' '}
          the way it wants to govern the country.
        </h2>
        <p className="mt-4 text-muted-foreground">
          AWFixer does not believe in governing differently than it operates. If we advocate for transparency in government, our party must be transparent. If we demand accountability from institutions, we must hold ourselves to the same standard. This page explains how.
        </p>
      </section>

      <h2 id="governance-philosophy" className="scroll-mt-24 text-2xl font-semibold tracking-tight sm:text-3xl animate-fade-up animate-fade-up-delay-1">
        Governance Philosophy
      </h2>
      
      <p className="text-lg font-medium leading-relaxed animate-fade-up animate-fade-up-delay-1">
        The AWFixer Party is governed by a single principle: the structures we advocate for in government, we must first demonstrate in ourselves.
      </p>

      <p className="animate-fade-up animate-fade-up-delay-1">
        We believe that political parties should be laboratories for the governance they propose. If we advocate for an independent anti-corruption commission at the federal level, our party must operate with anti-corruption mechanisms that are equally rigorous. If we call for transparency in government spending, we must publish our own finances with the same rigor we demand from the Pentagon.
      </p>

      <blockquote className="border-l-4 border-purple-600 pl-4 italic animate-fade-up animate-fade-up-delay-1">
        "We do not ask of others what we do not first demand of ourselves. A party that cannot govern itself with integrity has no credibility demanding it of institutions far more powerful than any political party."
      </blockquote>

      <h2 id="how-decisions-are-made" className="scroll-mt-24 text-2xl font-semibold tracking-tight sm:text-3xl animate-fade-up animate-fade-up-delay-2">
        How Decisions Are Made
      </h2>
      
      <p className="text-lg font-medium leading-relaxed animate-fade-up animate-fade-up-delay-2">
        AWFixer operates on a structured consensus model with tiered decision-making based on significance.
      </p>

      <div className="my-8 space-y-2 animate-fade-up animate-fade-up-delay-2">
        <div className="rounded-lg border bg-card p-4 border-l-4 border-l-purple-600">
          <span className="text-xs font-mono text-purple-600">Tier 1</span>
          <h4 className="mt-2 font-mono text-sm font-semibold uppercase">Day-to-Day Operations</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            Decisions made by the Executive Committee with simple majority. Includes staffing, communications, event coordination, and operational matters.
          </p>
        </div>
        
        <div className="rounded-lg border bg-card p-4 border-l-4 border-l-purple-600">
          <span className="text-xs font-mono text-purple-600">Tier 2</span>
          <h4 className="mt-2 font-mono text-sm font-semibold uppercase">Platform & Policy Positions</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            Requires supermajority (60%) approval of the Steering Committee after a 14-day member comment period. All policy positions must align with the core philosophy.
          </p>
        </div>
        
        <div className="rounded-lg border bg-card p-4 border-l-4 border-l-purple-600">
          <span className="text-xs font-mono text-purple-600">Tier 3</span>
          <h4 className="mt-2 font-mono text-sm font-semibold uppercase">Constitutional Amendments</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            Requires 75% approval of full voting membership after a 30-day comment period. The core philosophy principles cannot be amended.
          </p>
        </div>
        
        <div className="rounded-lg border bg-card p-4 border-l-4 border-l-purple-600">
          <span className="text-xs font-mono text-purple-600">Tier 4</span>
          <h4 className="mt-2 font-mono text-sm font-semibold uppercase">Candidate Endorsements</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            Requires 60% Steering Committee approval plus membership vote. All endorsed candidates must sign the AWFixer Accountability Pledge.
          </p>
        </div>
      </div>

      <h2 id="transparency-and-accountability" className="scroll-mt-24 text-2xl font-semibold tracking-tight sm:text-3xl animate-fade-up animate-fade-up-delay-2">
        Transparency & Accountability
      </h2>
      
      <p className="text-lg font-medium leading-relaxed animate-fade-up animate-fade-up-delay-2">
        Every structural reform AWFixer advocates for in government, we implement in our own operations first.
      </p>

      <h3 className="text-xl font-semibold animate-fade-up animate-fade-up-delay-2">Financial Transparency</h3>
      <p className="animate-fade-up animate-fade-up-delay-2">
        All party finances are published quarterly in machine-readable format. This includes: all donations over $100 (donor name, amount, date), all expenditures (recipient, amount, purpose), executive compensation, and operational costs. No dark money. No PACs. No bundling arrangements that obscure the source of funds.
      </p>

      <h3 className="text-xl font-semibold animate-fade-up animate-fade-up-delay-2">Decision Logs</h3>
      <p className="animate-fade-up animate-fade-up-delay-2">
        Every formal decision made by the Steering Committee is recorded with: the text of the proposal, all votes recorded by name, any dissenting views published in full, and the rationale for the final decision. These are published within 48 hours of each meeting.
      </p>

      <h3 className="text-xl font-semibold animate-fade-up animate-fade-up-delay-2">Conflict of Interest Disclosures</h3>
      <p className="animate-fade-up animate-fade-up-delay-2">
        All Steering Committee members and party officers file annual disclosures covering: all political donations made in the past five years, all employment and consulting relationships, all board positions, and any family members with material political or business interests. These are published publicly.
      </p>

      <h2 id="member-rights" className="scroll-mt-24 text-2xl font-semibold tracking-tight sm:text-3xl animate-fade-up animate-fade-up-delay-3">
        Member Rights
      </h2>
      
      <p className="text-lg font-medium leading-relaxed animate-fade-up animate-fade-up-delay-3">
        Every member of AWFixer has specific rights that cannot be revoked except through due process.
      </p>

      <ul className="list-disc pl-6 space-y-2 animate-fade-up animate-fade-up-delay-3">
        <li><strong>Vote</strong> on all Tier 2 and Tier 3 decisions after 90 days of membership</li>
        <li><strong>Run</strong> for any party office after 180 days of membership</li>
        <li><strong>Access</strong> all published decision logs, financial records, and disclosures</li>
        <li><strong>Propose</strong> policy positions for Steering Committee consideration with 50 member signatures</li>
        <li><strong>Recall</strong> any elected party officer with a petition signed by 30% of voting membership</li>
        <li><strong>Appeal</strong> any disciplinary action to an independent panel of three randomly selected members</li>
      </ul>

      <h2 id="leadership-structure" className="scroll-mt-24 text-2xl font-semibold tracking-tight sm:text-3xl animate-fade-up animate-fade-up-delay-3">
        Leadership Structure
      </h2>
      
      <p className="text-lg font-medium leading-relaxed animate-fade-up animate-fade-up-delay-3">
        AWFixer's leadership is designed to prevent the concentration of power that we believe corrupts other institutions.
      </p>

      <div className="my-8 rounded-lg bg-purple-600 p-6 text-white animate-fade-up animate-fade-up-delay-3">
        <div className="flex items-start gap-4">
          <span className="font-heading text-6xl font-bold text-white/20">3</span>
          <div>
            <h4 className="font-heading text-xl font-bold">Co-Leaders. Never a Single Leader.</h4>
            <p className="mt-2 text-sm text-white/80">
              AWFixer is led by three Co-Leaders, each with equal authority. No single person can commit the party, sign contracts over $5,000, or make policy positions unilaterally. All major decisions require at least two Co-Leaders to agree.
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-semibold animate-fade-up animate-fade-up-delay-3">The Steering Committee</h3>
      <p className="animate-fade-up animate-fade-up-delay-3">
        Seven members including the three Co-Leaders. The other four are elected by full membership for two-year terms, with staggered elections to ensure continuity. No more than two Steering Committee members may reside in the same state.
      </p>

      <h3 className="text-xl font-semibold animate-fade-up animate-fade-up-delay-3">Term Limits</h3>
      <p className="animate-fade-up animate-fade-up-delay-3">
        Co-Leaders serve a maximum of two two-year terms. Steering Committee members serve a maximum of three two-year terms. After serving the maximum, a member must sit out for at least one term before running again.
      </p>

      <h2 id="amendments-and-evolution" className="scroll-mt-24 text-2xl font-semibold tracking-tight sm:text-3xl animate-fade-up animate-fade-up-delay-4">
        Amendments & Evolution
      </h2>
      
      <p className="text-lg font-medium leading-relaxed animate-fade-up animate-fade-up-delay-4">
        AWFixer's governance structure is designed to evolve — but only through deliberate, member-approved processes.
      </p>

      <p className="animate-fade-up animate-fade-up-delay-4">
        The party constitution can be amended through the Tier 3 process (75% approval after 30-day comment period). However, three core principles are permanently protected and cannot be amended:
      </p>

      <ol className="list-decimal pl-6 space-y-2 animate-fade-up animate-fade-up-delay-4">
        <li><strong>Co-Leadership:</strong> There shall always be three Co-Leaders with equal authority</li>
        <li><strong>Financial Transparency:</strong> All finances will be published quarterly in full</li>
        <li><strong>Member Democracy:</strong> No decision affecting party policy can be made without member vote</li>
      </ol>

      <div className="my-8 rounded-lg bg-card p-6 animate-fade-up animate-fade-up-delay-4">
        <h4 className="font-heading text-lg font-bold">Living Document</h4>
        <p className="mt-2 text-sm text-muted-foreground">
          This governance structure is not carved in stone. It is a living document that will evolve as we learn what works and what doesn't. Every amendment is an opportunity to build a better model. Every failure is data.
        </p>
      </div>

      <blockquote className="border-l-4 border-purple-600 pl-4 italic animate-fade-up animate-fade-up-delay-5">
        "We judge political institutions by what they do, not what they promise. AWFixer will be judged the same way — by the structure of our decisions, not the elegance of our language."
      </blockquote>

      <p className="animate-fade-up animate-fade-up-delay-5">
        The AWFixer Party exists to fix the incentive structures that produce bad outcomes in American governance. We begin by fixing our own.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row animate-fade-up animate-fade-up-delay-5">
        <a
          href="/philosophy"
          className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
        >
          Read Our Philosophy
        </a>
        <a
          href="/join"
          className="inline-flex items-center justify-center rounded-md bg-purple-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-700"
        >
          Become a Member
        </a>
      </div>
    </>
  )
}
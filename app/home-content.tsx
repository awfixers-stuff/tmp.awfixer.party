"use client"

import { HomeTOC } from "./home-toc"

export function HomeContent() {
  return (
    <>
      <h2 id="fix-the-system" className="scroll-mt-24 text-2xl font-semibold tracking-tight sm:text-3xl animate-fade-up">
        Fix the System
      </h2>
      
      <p className="text-lg font-medium leading-relaxed text-foreground animate-fade-up animate-fade-up-delay-1">
        Not the left. Not the right. The AWFixer Party exists because the existing political establishment has had thirty years to fix America's foundational problems and has instead made most of them worse.
      </p>

      <h2 id="our-core-statement" className="scroll-mt-24 text-2xl font-semibold tracking-tight sm:text-3xl animate-fade-up animate-fade-up-delay-2">
        Our Core Statement
      </h2>
      
      <p className="animate-fade-up animate-fade-up-delay-2">
        We are not a protest vote. We are not a single-issue movement. We are a comprehensive political platform built on one premise: that American governance has failed not because of bad people but because of bad incentive structures — and that fixing those structures, honestly and without partisan cover, is the only path forward.
      </p>
      
      <p className="animate-fade-up animate-fade-up-delay-3">
        We believe in accountability without cruelty, competition without monopoly, transparency without naivety, and consequences without waste. We believe the American people are capable of handling the truth about what is broken and what it will take to repair it. We intend to tell them.
      </p>

      <h2 id="our-platform-ten-pillars" className="scroll-mt-24 text-2xl font-semibold tracking-tight sm:text-3xl animate-fade-up animate-fade-up-delay-3">
        Our Platform — Ten Pillars
      </h2>
      
      <div className="grid gap-4 sm:grid-cols-2 animate-fade-up animate-fade-up-delay-4">
        <a href="/policy/competition" className="rounded-lg border bg-card p-4 block transition-colors hover:bg-accent">
          <span className="text-xs font-mono text-purple-500">01</span>
          <h3 className="mt-2 font-heading text-lg font-semibold">Competition & Markets</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Real deregulation means breaking monopolies, not protecting them.
          </p>
        </a>
        
        <a href="/policy/foreign-policy" className="rounded-lg border bg-card p-4 block transition-colors hover:bg-accent">
          <span className="text-xs font-mono text-purple-500">02</span>
          <h3 className="mt-2 font-heading text-lg font-semibold">Foreign Policy</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Diplomacy first. Military force reserved for direct, unmistakable threats to Americans.
          </p>
        </a>
        
        <a href="/policy/labor" className="rounded-lg border bg-card p-4 block transition-colors hover:bg-accent">
          <span className="text-xs font-mono text-purple-500">03</span>
          <h3 className="mt-2 font-heading text-lg font-semibold">Labor & Immigration</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Fix the incentive to exploit foreign labor. The behavior follows.
          </p>
        </a>
        
        <a href="/policy/energy" className="rounded-lg border bg-card p-4 block transition-colors hover:bg-accent">
          <span className="text-xs font-mono text-purple-500">04</span>
          <h3 className="mt-2 font-heading text-lg font-semibold">Energy & Nuclear</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Nuclear is the only honest large-scale clean energy answer we actually have.
          </p>
        </a>
        
        <a href="/policy/fiscal-transparency" className="rounded-lg border bg-card p-4 block transition-colors hover:bg-accent">
          <span className="text-xs font-mono text-purple-500">05</span>
          <h3 className="mt-2 font-heading text-lg font-semibold">Fiscal Transparency</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Every federal dollar on a public ledger. Permanently. No exceptions.
          </p>
        </a>
        
        <a href="/policy/criminal-justice" className="rounded-lg border bg-card p-4 block transition-colors hover:bg-accent">
          <span className="text-xs font-mono text-purple-500">06</span>
          <h3 className="mt-2 font-heading text-lg font-semibold">Criminal Justice</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Real consequences. Real rehabilitation. A 77% recidivism rate is not tough — it's failure.
          </p>
        </a>
        
        <a href="/policy/anti-corruption" className="rounded-lg border bg-card p-4 block transition-colors hover:bg-accent">
          <span className="text-xs font-mono text-purple-500">07</span>
          <h3 className="mt-2 font-heading text-lg font-semibold">Anti-Corruption</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Every branch. Every level. Every uniform. No carve-outs.
          </p>
        </a>
        
        <a href="/policy/technology" className="rounded-lg border bg-card p-4 block transition-colors hover:bg-accent">
          <span className="text-xs font-mono text-purple-500">08</span>
          <h3 className="mt-2 font-heading text-lg font-semibold">Technology & AI</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Open source in public life. Curiosity is not a crime — it should be rewarded.
          </p>
        </a>
        
        <a href="/policy/tax" className="rounded-lg border bg-card p-4 block transition-colors hover:bg-accent">
          <span className="text-xs font-mono text-purple-500">09</span>
          <h3 className="mt-2 font-heading text-lg font-semibold">Tax & Business</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Pro-business means building a tax base that actually works. Not loopholes.
          </p>
        </a>
        
        <a href="/policy/civil-standard" className="rounded-lg border bg-card p-4 block transition-colors hover:bg-accent">
          <span className="text-xs font-mono text-purple-500">10</span>
          <h3 className="mt-2 font-heading text-lg font-semibold">Civil Standard of Living</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Replace the minimum wage with a real, regional measure of dignified existence.
          </p>
        </a>
      </div>

      <blockquote className="border-l-4 border-purple-500 pl-4 italic animate-fade-up animate-fade-up-delay-4">
        "The problem is never just <em>what</em> is broken. It is always <em>who benefits</em> from it staying that way."
      </blockquote>

      <div className="flex flex-col gap-4 sm:flex-row animate-fade-up animate-fade-up-delay-5">
        <a
          href="/philosophy"
          className="inline-flex items-center justify-center rounded-md bg-purple-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-700"
        >
          Read Our Philosophy
        </a>
        <a
          href="/platform"
          className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
        >
          Explore the Full Platform →
        </a>
      </div>
    </>
  )
}

export function HomePageTOC() {
  return <HomeTOC />
}
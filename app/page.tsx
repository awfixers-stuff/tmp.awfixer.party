import Content from "./content.mdx"
import { ScrollButton } from "./scroll-button"

export default function Page() {
  return (
    <>
      <section className="relative flex h-screen flex-col items-center justify-center px-4 sm:px-6">
        {/* Flag gif — bleeds above (behind nav) and ~3 inches below the hero */}
        <div
          className="animate-flag-fade-in absolute -top-24 right-0 -bottom-72 left-0 bg-[url('/flag.gif')] bg-cover bg-center bg-no-repeat sm:-top-28"
          aria-hidden="true"
        />
        <div
          className="animate-flag-fade-in absolute -top-24 right-0 -bottom-72 left-0 bg-black/45 sm:-top-28"
          aria-hidden="true"
        />
        {/* Fade bottom of flag into site background */}
        <div
          className="animate-flag-fade-in absolute right-0 bottom-[-18rem] left-0 h-32 bg-gradient-to-b from-transparent to-background"
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="max-w-2xl text-center">
            <p className="animate-fade-up font-mono text-xs tracking-widest text-purple-600 uppercase">
              AWFixer Political Party
            </p>
            <h1 className="animate-fade-up animate-fade-up-delay-1 mt-4 font-heading text-5xl font-bold tracking-tight text-balance sm:text-7xl">
              Fix the <span className="text-purple-600">System.</span>
            </h1>
            <p className="animate-fade-up animate-fade-up-delay-2 mt-6 max-w-xl text-lg text-muted-foreground">
              Not the left. Not the right. The AWFixer Party exists because the
              existing political establishment has had thirty years to fix
              America's foundational problems and has instead made most of them
              worse.
            </p>
          </div>
          <ScrollButton />
        </div>
      </section>
      <main
        id="content"
        className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-12 px-4 pt-[40vh] pb-16 sm:gap-14 sm:px-6 sm:pb-20"
      >
        <div className="prose max-w-none text-[0.9375rem] leading-relaxed text-foreground/90 prose-neutral dark:prose-invert prose-headings:scroll-mt-24 prose-h1:mt-0 prose-h1:mb-8 prose-h2:mt-12 prose-h2:mb-5 prose-p:mt-0 prose-p:mb-6 prose-ol:my-6 prose-ul:my-6 prose-li:my-2">
          <Content />
        </div>
      </main>
    </>
  )
}

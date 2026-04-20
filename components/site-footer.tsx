import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-6 sm:px-6">
        <p className="text-pretty text-center text-[0.8125rem] leading-relaxed text-foreground/85">
          This is a temporary website. Source and updates:{" "}
          <Button
            variant="link"
            className="h-auto p-0 text-[0.8125rem] font-medium text-foreground underline-offset-4"
            asChild
          >
            <a
              href="https://github.com/awfixers-stuff/awfixer.party"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/awfixers-stuff/awfixer.party
            </a>
          </Button>
          .
        </p>
        <Separator className="bg-border/60" />
        <p className="text-pretty text-center text-[0.8125rem] leading-relaxed text-muted-foreground">
          AWFixer Political Party and PAC are operationally separate and
          distinct from AWFixer Enterprising Company Inc.
        </p>
      </div>
    </footer>
  )
}

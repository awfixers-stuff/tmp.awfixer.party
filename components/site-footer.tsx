import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-6 sm:px-6">
        <p className="text-center text-[0.8125rem] leading-relaxed text-pretty text-foreground/85">
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
        <nav className="flex justify-center gap-4 text-[0.8125rem]">
          <Link
            href="/privacy"
            className="text-foreground/85 underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-use"
            className="text-foreground/85 underline-offset-4 hover:underline"
          >
            Terms of Use
          </Link>
          <Link
            href="/terms-of-access"
            className="text-foreground/85 underline-offset-4 hover:underline"
          >
            Terms of Access
          </Link>
        </nav>
        <Separator className="bg-border/60" />
        <p className="text-center text-[0.8125rem] leading-relaxed text-pretty text-muted-foreground">
          AWFixer Political Party and PAC are operationally separate and
          distinct from AWFixer Enterprising Company Inc.
        </p>
        <Separator className="bg-border/60" />
        <p className="text-center text-[0.8125rem] leading-relaxed text-pretty text-muted-foreground">
          AWFixer Political Party is an independant organization that is not
          affiliated with any corporation, Political Action Committie or current
          political party.
        </p>
        <Separator className="bg-border/60" />
        <p className="text-center text-[0.8125rem] leading-relaxed text-pretty text-muted-foreground">
          Canidates, Staff and Volenteers working for and with the AWFixer
          Political Party are vetted and legally checked before endorsement and
          we do not legally obligate ourselves to the continued endorsement of
          any canidate or party member who is deemed to be acting in an
          extralegal or illegal manor.
        </p>
        <Separator className="bg-border/60" />
      </div>
    </footer>
  )
}

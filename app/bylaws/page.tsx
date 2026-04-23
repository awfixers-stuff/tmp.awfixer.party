import { bylawNavTree } from "./bylaws"
import { BylawsLayout } from "@/components/BylawsNav"

export const metadata = {
  title: "Bylaws | AWFixer Political Party",
  description: "Official bylaws governing the AWFixer Political Party",
}

export default function BylawsPage() {
  return (
    <BylawsLayout navItems={bylawNavTree}>
      <div className="space-y-4">
        <h1 className="font-heading text-3xl font-bold">Bylaws</h1>
        <p className="text-muted-foreground">
          Select a bylaw section from the navigation to view its contents.
        </p>
      </div>
    </BylawsLayout>
  )
}

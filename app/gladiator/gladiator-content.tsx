"use client"

import Gladiator from "./content.mdx"
import {
  GladiatorEvent,
  ArenaSection,
  StatBox,
  InlineImage,
  QuoteBox,
  CalloutBox,
  EventCard,
  HeroImage,
} from "./gladiator-components"

const components = {
  GladiatorEvent,
  ArenaSection,
  StatBox,
  InlineImage,
  QuoteBox,
  CalloutBox,
  EventCard,
  HeroImage,
  img: (props: React.ComponentProps<"img">) => (
    <InlineImage src={props.src || ""} alt={props.alt || ""} />
  ),
}

export function GladiatorContent() {
  return <Gladiator components={components} />
}

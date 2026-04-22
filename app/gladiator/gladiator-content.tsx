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
  ScheduleGrid,
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
  ScheduleGrid,
  img: (props: React.ComponentProps<"img">) => (
    <InlineImage src={String(props.src) || ""} alt={props.alt || ""} />
  ),
}

export function GladiatorContent() {
  return <Gladiator components={components} />
}

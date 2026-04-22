"use client"

import { Separator } from "@/components/ui/separator"

import { HomeContent, HomePageTOC } from "./home-content"

export function PageContent() {
  return (
    <>
      <HomePageTOC />
      <HomeContent />
    </>
  )
}
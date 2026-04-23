"use client"

import Image from "next/image"
import type { DetailedHTMLProps, HTMLAttributes } from "react"

const ALLOWED_IMAGES = ["/images"] as const

const ALLOWED_GIFS = [
  "/gifs/hawaii-sugar.gif",
  "/gifs/marching.gif",
  "/gifs/olympics.gif",
  "/gifs/olympicsmarch.gif",
  "/gifs/teddy.gif",
] as const

type AllowedImagePath = (typeof ALLOWED_IMAGES)[number] | string
type AllowedGifPath = (typeof ALLOWED_GIFS)[number]

interface StaticImageProps {
  src: AllowedImagePath
  alt: string
  width?: number
  height?: number
  className?: string
  unoptimized?: boolean
}

export function StaticImage({
  src,
  alt,
  width,
  height,
  className,
  unoptimized = true,
}: StaticImageProps) {
  const isAllowedImage = src.startsWith("/images")
  if (!isAllowedImage) {
    throw new Error(`StaticImage: src must start with /images. Got: ${src}`)
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      unoptimized={unoptimized}
    />
  )
}

interface GifProps {
  src: AllowedGifPath
  alt: string
  className?: string
}

export function Gif({ src, alt, className }: GifProps) {
  const isAllowedGif = (ALLOWED_GIFS as readonly string[]).includes(src)
  if (!isAllowedGif) {
    throw new Error(
      `Gif: src must be one of: ${ALLOWED_GIFS.join(", ")}. Got: ${src}`
    )
  }

  return <img src={src} alt={alt} className={className} loading="lazy" />
}

interface YoutubeProps {
  src: string
  title?: string
}

interface FigureProps {
  src: string
  alt: string
  caption?: string
  className?: string
  isGif?: boolean
}

export function Youtube({ src, title = "YouTube video" }: YoutubeProps) {
  const videoId = src.includes("youtu.be")
    ? src.split("youtu.be/")[1]?.split("?")[0]
    : src.split("v=")[1]?.split("&")[0]

  if (!videoId) return null

  return (
    <div className="my-6 aspect-video w-full overflow-hidden rounded-lg">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  )
}

export function Figure({
  src,
  alt,
  caption,
  className,
  isGif = false,
}: FigureProps) {
  const isImageFromImages = src.startsWith("/images")
  const isImageFromGifs = src.startsWith("/gifs")
  const isValid = isImageFromImages || isImageFromGifs

  if (!isValid) {
    throw new Error(`Figure: src must start with /images or /gifs. Got: ${src}`)
  }

  const isGifSrc = isGif || isImageFromGifs

  return (
    <figure className={`my-6 ${className || ""}`}>
      {isGifSrc ? (
        <img src={src} alt={alt} className="rounded-lg" loading="lazy" />
      ) : (
        <Image src={src} alt={alt} className="rounded-lg" unoptimized />
      )}
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

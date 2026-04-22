import createMDX from "@next/mdx"
import remarkGfm from "remark-gfm"
import defaultComponents from "./app/mdx-components"

const components = {
  ...defaultComponents,
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
  components,
})

export default withMDX(nextConfig)

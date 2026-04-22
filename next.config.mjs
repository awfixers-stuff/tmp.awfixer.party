import createMDX from "@next/mdx"
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
    remarkPlugins: [],
    rehypePlugins: [],
  },
  components,
})

export default withMDX(nextConfig)

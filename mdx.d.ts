declare module "*.mdx" {
  import type { MDXComponents, MDXProps } from "mdx/types"
  import type { ComponentType, ComponentProps } from "react"

  type MDXContentProps = MDXProps & {
    components?: MDXComponents
  }

  export default function MDXContent(props: MDXContentProps): JSX.Element
  export { MDXContent }

  const Content: ComponentType<MDXContentProps>
  export { Content }
}

declare module "*.md" {
  import type { MDXComponents, MDXProps } from "mdx/types"
  import type { ComponentType } from "react"

  type MDXContentProps = MDXProps & {
    components?: MDXComponents
  }

  export default function MDXContent(props: MDXContentProps): JSX.Element
  export { MDXContent }

  const Content: ComponentType<MDXContentProps>
  export { Content }
}

declare module "*.md" {
  import type { MDXComponents } from "mdx/types"

  export default function MDXContent(props: MDXComponents): JSX.Element
  export { MDXContent }
}

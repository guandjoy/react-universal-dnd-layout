import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer"
import Layout from "../layout"
import SEO from "../seo"
import Menu from "./Menu"

interface Props {
  data: {
    mdx: {
      frontmatter: {
        title: string
      }
      body: string
    }
  }
  path: string
}

const PageTemplate: React.FC<Props> = props => {
  const { title } = props.data.mdx.frontmatter
  return (
    <Layout path={props.path}>
      <SEO title={title} />
      <div className="docs">
        <Menu />
        <div className="content">
          <MDXProvider>
            <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
          </MDXProvider>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
      }
      body
    }
  }
`

export default PageTemplate
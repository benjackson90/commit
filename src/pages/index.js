import React, { useMemo } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import { PostList } from "../components/PostList"
import SEO from "../components/seo"
import { get } from "../utils/qs-get";

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const slug = get(location, "p");

  const post = useMemo(() => (
    posts.find(({ node }) => slug === node.fields.slug)
  ), [ posts, slug ]);

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <PostList pathname={location.pathname} posts={posts} slug={slug} post={post} />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          html
          frontmatter {
            name
            date(formatString: "MMMM DD, YYYY")
            title
            description
            link
            price
            tags
          }
        }
      }
    }
  }
`

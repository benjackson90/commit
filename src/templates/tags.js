import React, { useMemo } from "react"
// Components
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { PostList } from "../components/PostList"
import SEO from "../components/seo"
import { get } from "../utils/qs-get";

const Tags = ({ pageContext, data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const slug = get(location, "p");

  const post = useMemo(() => (
    posts.find(({ node }) => slug === node.fields.slug)
  ), [ posts, slug ]);

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={siteTitle} />
      <PostList pathname={location.pathname} posts={posts} slug={slug} post={post} />
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
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

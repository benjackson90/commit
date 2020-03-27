import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const PostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  
  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article className="max-w-2xl m-auto">
        <header>
          <div className="flex items-start justify-between">
            <h3 className="flex-1 text-2xl leading-6 font-medium text-gray-900">
              <a className="text-pink-600 hover:text-pink-700 leading-normal font-medium flex items-center" href={post.frontmatter.link} target="_blank">
                {post.frontmatter.title}
              </a>
            </h3>
          </div>
          <i className="text-sm text-gray-600 font-medium">
            {post.frontmatter.date}
          </i>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr />
      </article>
    </Layout>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        link
      }
    }
  }
`

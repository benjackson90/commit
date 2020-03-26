import React from "react"
// Utilities
import kebabCase from "lodash/kebabCase"
// Components
import { Link, useStaticQuery, graphql } from "gatsby";

export const Tags = () => {
  const data = useStaticQuery(graphql`
    query TagsQuery {
      tag: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  return (
    <div>
      <span className="px-6 pt-6 pb-5 text-lg font-medium text-gray-900">Filter</span>
      <nav aria-label="Main navigation" className="text-sm">
        <div className="mb-8">
          <h3 className="px-6 text-xs uppercase text-gray-600">Tags</h3>
          <ul className="text-xs font-normal flex flex-wrap">
            {data.tag.group.map(tag => (
              <li key={tag.fieldValue}>
                <span className="inline-block bg-pink-200 text-pink-800 text-xs px-2 rounded-full font-semibold tracking-wide mr-2">
                  <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                    {tag.fieldValue} ({tag.totalCount})
                  </Link>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  )
}

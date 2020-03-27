import React, { Fragment } from "react"
import { Highlight, Snippet } from "react-instantsearch-dom"
import { Link } from "gatsby"

export const PostHit = clickHandler => ({ hit }) => (
  <div>
    <Link to={`/post${hit.fields.slug}`} onClick={clickHandler}>
      <h4 className="text-lg font-medium">
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h4>
    </Link>
    <div>
      <div className="flex">
        <i className="text-sm text-gray-600 font-medium">
          <Highlight attribute="date" hit={hit} tagName="mark" />
        </i>
        &nbsp;
        &nbsp;
        <div className="flex flex-1">
          {hit.tags.map((tag, index) => (
            <span key={tag} style={{ padding: "0 0.5rem" }} className="flex items-center mt-2 inline-block bg-pink-200 text-pink-800 text-xs px-2 rounded-full font-semibold tracking-wide mr-2">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
    <Snippet className="text-sm mt-2 text-gray-600 leading-snug" attribute="excerpt" hit={hit} tagName="mark" />
  </div>
)

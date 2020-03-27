import React, { useState, useEffect, useRef, forwardRef, useMemo } from "react"
import {
  InstantSearch,
  Index,
  Hits,
  connectStateResults,
} from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"
import Input from "./Input"
import * as hitComps from "./hitComps"
import { document } from 'browser-monads';

const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) =>
    res && res.nbHits > 0 ? children : `No results for '${state.query}'`
)
const Stats = connectStateResults(
  ({ searchResults: res }) =>
    res && res.nbHits > 0 && `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`
)

export function useEventListener(eventNames, handler, element = document) {
  // Create a ref that stores the handler.
  const savedHandler = useRef()
  if (!Array.isArray(eventNames)) eventNames = [eventNames]

  // Save handler to ref.current on initial call to useEventListener
  // and then update ref.current whenever the handler changes.
  // This allows the second useEffect below to always get the latest
  // handler without needing to have it in than hooks deps array which
  // could cause the effect to re-run every render.
  useEffect(() => (savedHandler.current = handler), [handler])

  useEffect(() => {
    if (!element.addEventListener) return // Element doesn't support a listener, abort.

    // Create event listener that calls handler function stored in ref
    const listener = event => savedHandler.current(event)
    for (const e of eventNames) element.addEventListener(e, listener)
    return () => {
      for (const e of eventNames) element.removeEventListener(e, listener)
    }
  }, [element, eventNames])
}

export function useOnClickOutside(ref, handler, events) {
  if (!events) events = [`mousedown`, `touchstart`]
  const detectClickOutside = event =>
    ref.current && event && !ref.current.contains(event.target) && handler(event)
  useEventListener(events, detectClickOutside)
}

const PoweredBy = () => (
  <span className="text-xs text-right p-0">
    Powered by{` `}
    <a href="https://algolia.com">
      Algolia
    </a>
  </span>
);

const Root = forwardRef((props, ref) => {
  return <div ref={ref} className="relative" style={{ display: "grid", gridGap: "1em" }} {...props} />
})

export default function Search({ indices, collapse, hitsAsGrid }) {
  const ref = useRef()
  const [query, setQuery] = useState(``)
  const [focus, setFocus] = useState(false)
  const appId = process.env.GATSBY_ALGOLIA_APP_ID
  const searchKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY

  const searchClient = useMemo(() =>
    algoliasearch(appId, searchKey),
    [
      appId,
      searchKey,
    ]
  )

  useOnClickOutside(ref, () => setFocus(false));

  return (
    <Root ref={ref}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <Input onFocus={() => setFocus(true)} {...{ collapse, focus }} />
        <div className={`HitsWrapper ${query.length > 0 && focus ? "grid" : "hidden"}`}>
          {indices.map(({ name, title, hitComp }) => (
            <Index key={name} indexName={name}>
              <header className="flex justify-between mb-2">
                <div className="text-gray-900 bg-gray-200 text-lg font-medium px-4 py-2">{title}</div>
                <div className="text-gray-600 text-sm">
                  <Stats />
                </div>
              </header>
              <Results>
                <Hits hitComponent={hitComps[hitComp](() => setFocus(false))} />
              </Results>
            </Index>
          ))}
          <PoweredBy />
        </div>
      </InstantSearch>
    </Root>
  )
}

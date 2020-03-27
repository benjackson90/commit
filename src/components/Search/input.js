import React from "react"
import { connectSearchBox } from "react-instantsearch-dom";
import Search from "./search";

export default connectSearchBox(({ refine, onFocus, ...rest }) => (
  <form className="flex flex-row-reverse items-center">
    <input
      className="search-placeholder outline-none border-none text-base bg-transparent rounded-sm text-white"
      type="text"
      placeholder="Search"
      aria-label="Search"
      onChange={e => refine(e.target.value)}
      onFocus={onFocus}
    />
  <Search size={18} className="text-white mr-2" />
  </form>
))

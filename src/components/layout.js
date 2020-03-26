import React from "react"
import { Link } from "gatsby";
import { Tags } from "./Tags";
import { SubmitModal } from "./SubmitModal";

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center border-b border-solid border-gray-200 px-4 h-16">
        <h3 className="m-0 border-none">
          <Link to={`/`}>
            {title}
          </Link>
        </h3>
        <SubmitModal />
      </header>
      <main className="flex flex-1">
        <div className="flex-1 w-full">
          {children}
        </div>
        <div className="w-64 border-l border-solid border-gray-200">
          <Tags />
        </div>
      </main>
    </div>
  )
}

export default Layout

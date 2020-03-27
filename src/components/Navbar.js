import React, { memo, useState } from "react";
import { Link } from "gatsby";
import Search from "./Search";
import { SubmitModal } from "./SubmitModal";
import Menu from "../icons/menu";
import GitHub from "../icons/github";

const searchIndices = [
  { name: `Posts`, title: `Blog Posts`, hitComp: `PostHit` },
]

export const Navbar = memo(({ fixed, title, onSuccess }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <nav className="lg:h-16 sm:h-full relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-pink-500">
      <div className="px-4 w-full flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-56 lg:static lg:block lg:justify-start">
          <Link
            to={`/`}
            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white"
          >
            {title}
          </Link>
          <button
            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <Menu />
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center flex-1" +
            (navbarOpen ? " flex" : " hidden")
          }
          id="example-navbar-danger"
        >
          <div className="flex-1 flex justify-between items-center">
            <Search collapse indices={searchIndices} />
            <div className="flex items-center">
              <SubmitModal onSuccess={onSuccess} />
              <a href="https://github.com/benjackson90/commit" target="_blank">
                <GitHub color="white" className="ml-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
})

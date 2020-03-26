import React, { useState, useEffect, useCallback } from "react";
import { navigate } from "@reach/router";

function stopBubbles(e) {
  e.preventDefault();
  e.stopPropagation();
}

export const PostModal = ({ pathname, post, slug }) => {
  const [showModal, setShowModal] = useState(!!slug);

  useEffect(() => {
    setShowModal(!!slug)
  }, [slug])

  const closeModal = useCallback(
    () => {
      navigate(pathname)
    },
    []
  );

  return (
    <>
      {showModal && !!post ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={closeModal}
          >
            <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
              <div className="fixed inset-0 transition-opacity">
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                {/* <div className="absolute inset-0 bg-gray-500 opacity-75"></div> */}
              </div>

              <div style={{ height: "calc(100% - 114px)"}} onClick={stopBubbles} className="bg-white rounded-lg overflow-x-hidden overflow-y-auto shadow-xl transform transition-all sm:max-w-4xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <div className="mt-2">
                        <article>
                          <header>
                            <h3 className="text-2xl leading-6 font-medium text-gray-900">
                              {post.node.frontmatter.title}
                            </h3>
                            <i className="text-sm text-gray-600 font-medium">
                              {post.node.frontmatter.date}
                            </i>
                          </header>
                          <section dangerouslySetInnerHTML={{ __html: post.node.html }} />
                          <hr />
                          <footer>
                            {/* <Bio /> */}
                          </footer>
                        </article>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>

      ) : null}
    </>
  )
}

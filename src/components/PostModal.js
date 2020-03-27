import React, { useState, useEffect, useCallback } from "react";
import { navigate } from "@reach/router";
import X from "../icons/x";

function stopBubbles(e) {
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
            style={{ top: 64 }}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={closeModal}
          >
            <div className="relative w-auto my-6 mx-auto max-w-6xl h-full">
              {/*content*/}
              <div onClick={stopBubbles} className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="flex-1 text-2xl leading-6 font-medium text-gray-900">
                    <a onClick={stopBubbles} className="text-pink-600 hover:text-pink-700 leading-normal font-medium flex items-center" href={post.node.frontmatter.link} target="_blank">
                      {post.node.frontmatter.title}
                    </a>
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeModal}
                  >
                    <X size={20} className="cursor-pointer" />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="h-full">
                    <i className="text-sm text-gray-600 font-medium">
                      {post.node.frontmatter.date}
                    </i>
                    <section dangerouslySetInnerHTML={{ __html: post.node.html }} />
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>

      ) : null}
    </>
  )
}

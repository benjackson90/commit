import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { MarkdownEditor } from "./MarkdownEditor";

function stopBubbles(e) {
  e.preventDefault();
}

const markdown = `This is my first post on my new fake blog! How exciting!

I'm sure I'll write a lot more interesting things in the future.

Oh, and here's a great quote from this Wikipedia on
[salted duck eggs](https://en.wikipedia.org/wiki/Salted_duck_egg).

> A salted duck egg is a Chinese preserved food product made by soaking duck
> eggs in brine, or packing each egg in damp, salted charcoal. In Asian
> supermarkets, these eggs are sometimes sold covered in a thick layer of salted
> charcoal paste. The eggs may also be sold with the salted paste removed,
> wrapped in plastic, and vacuum packed. From the salt curing process, the
> salted duck eggs have a briny aroma, a gelatin-like egg white and a
> firm-textured, round yolk that is bright orange-red in color.

![Chinese Salty Egg](./salty_egg.jpg)
`

export const SubmitModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState(markdown);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
  };
  console.log(errors)
  const openModal = useCallback(
    () => {
      setShowModal(true)
    },
    [setShowModal]
  )

  const closeModal = useCallback(
    () => {
      setShowModal(false)
    },
    [setShowModal]
  );

  return (
    <>
      <button onClick={openModal} type="button" className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-pink-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-pink-500 focus:outline-none focus:border-pink-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5">Submit</button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
              <div className="fixed inset-0 transition-opacity">
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </div>

              <div style={{ height: "calc(100% - 114px)"}} className="bg-white rounded-lg overflow-x-hidden overflow-y-auto shadow-xl transform transition-all sm:max-w-4xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <div className="mt-2">
                        <div className="container mx-auto px-4 h-full">
                          <div className="flex content-center items-center justify-center h-full">
                            <div className="w-full lg:w-full px-4">
                              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg border-0">
                                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                  <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="relative w-full mb-3">
                                      <label
                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                      >
                                        Title
                                      </label>
                                      <input
                                        name="title"
                                        ref={register({ required: true })}
                                        className={`px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-xs shadow focus:outline-none focus:shadow-outline w-full ${errors.title && "border border-solid border-red-500"}`}
                                        placeholder="Title"
                                        style={{ transition: "all .15s ease" }}
                                      />
                                      {errors.title && (
                                        <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                                      )}
                                    </div>

                                    <div className="relative w-full mb-3">
                                      <label
                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                      >
                                        Description
                                      </label>
                                      <input
                                        name="description"
                                        ref={register({ required: true })}
                                        className={`px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-xs shadow focus:outline-none focus:shadow-outline w-full ${errors.description && "border border-solid border-red-500"}`}
                                        placeholder="Description"
                                        style={{ transition: "all .15s ease" }}
                                      />
                                      {errors.description && (
                                        <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                                      )}
                                    </div>

                                    <div className="relative w-full mb-3">
                                      <label
                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                      >
                                        Link
                                      </label>
                                      <input
                                        name="link"
                                        ref={register({ required: true })}
                                        className={`px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-xs shadow focus:outline-none focus:shadow-outline w-full ${errors.link && "border border-solid border-red-500"}`}
                                        placeholder="Link"
                                        style={{ transition: "all .15s ease" }}
                                      />
                                      {errors.link && (
                                        <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                                      )}
                                    </div>

                                    <div className="relative w-full mb-3">
                                      <label
                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                      >
                                        Price
                                      </label>
                                      <input
                                        name="price"
                                        ref={register({ required: true })}
                                        className={`px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-xs shadow focus:outline-none focus:shadow-outline w-full ${errors.price && "border border-solid border-red-500"}`}
                                        placeholder="Price"
                                        style={{ transition: "all .15s ease" }}
                                      />
                                      {errors.price && (
                                        <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                                      )}
                                    </div>

                                    <div className="relative w-full mb-3">
                                      <label
                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                      >
                                        Tags
                                      </label>
                                      <input
                                        name="tags"
                                        ref={register({ required: true })}
                                        className={`px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-xs shadow focus:outline-none focus:shadow-outline w-full ${errors.tags && "border border-solid border-red-500"}`}
                                        placeholder="Tags"
                                        style={{ transition: "all .15s ease" }}
                                      />
                                      {errors.tags && (
                                        <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                                      )}
                                    </div>

                                    <div className="relative w-full mb-3">
                                      <label
                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                      >
                                        Content
                                      </label>
                                      <MarkdownEditor value={content} onChange={(newContent) => setContent(newContent)} />
                                    </div>
                                    <div className="text-center mt-6">
                                      <button
                                        className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                        style={{ transition: "all .15s ease" }}
                                      >
                                        Submit
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
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

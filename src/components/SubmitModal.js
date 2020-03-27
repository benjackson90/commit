import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { MarkdownEditor } from "./MarkdownEditor";
import { createPost } from "../api/repo";
import X from "../icons/x";

function stopBubbles(e) {
  e.stopPropagation();
}

export const SubmitModal = ({ onSuccess }) => {
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors, getValues, setValue, setError, clearError } = useForm();

  const onSubmit = async (data) => {
    if (tags.length === 0) {
      setError('tag', 'require');
      return;
    };
    setLoading(true);
    const pull = await createPost({...data, content, tags});
    setLoading(false);
    closeModal();
    if (typeof onSuccess === "function") {
      onSuccess(pull)
    }
  };

  const openModal = useCallback(
    () => {
      setShowModal(true)
    },
    [setShowModal]
  )

  const closeModal = useCallback(
    () => {
      if (loading) return;
      setTags([]);
      setContent("");
      setShowModal(false)
    },
    [setShowModal, loading]
  );

  const onTagEnter = useCallback((e) => {
    if(e.key === 'Enter'){
      e.preventDefault();
      e.stopPropagation();
      const { tag } = getValues();
      if(!tag || tag.trim() === "") return;
      const newTags = [...tags, tag];
      setTags(newTags);
      setValue('tag', '');
      if (errors.tag) {
        clearError(['tag'])
      }
    }
  }, [getValues, tags, setTags, setValue, errors, clearError])

  const deleteTag = useCallback(tag => {
    const newTags = tags.filter(t => t !== tag);
    if (newTags.length === 0) setError('tag', 'require');
    setTags(newTags);
  }, [tags, setError, setTags])

  return (
    <>
      <button onClick={openModal} type="button" className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-pink-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-pink-700 focus:outline-none focus:shadow-outline-red transition ease-in-out duration-150 hidden lg:flex sm:text-sm sm:leading-5">Submit</button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={closeModal}
          >
            <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
              <div className="fixed inset-0 transition-opacity">
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </div>

              <div onClick={stopBubbles} style={{ height: "calc(100% - 126px)"}} className="bg-white rounded-lg overflow-x-hidden overflow-y-auto shadow-xl transform transition-all sm:max-w-4xl sm:w-full">
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
                                        Name
                                      </label>
                                      <input
                                        name="name"
                                        ref={register}
                                        className={`px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-xs shadow focus:outline-none focus:shadow-outline w-full ${errors.title && "border border-solid border-red-500"}`}
                                        placeholder="Name"
                                        style={{ transition: "all .15s ease" }}
                                      />
                                    </div>
                                    <div className="relative w-full mb-3">
                                      <label
                                        className="block uppercase text-gray-700 text-xs font-bold mb-2 required"
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
                                        ref={register}
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
                                        className="block uppercase text-gray-700 text-xs font-bold mb-2 required"
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
                                        ref={register}
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
                                        className="block uppercase text-gray-700 text-xs font-bold mb-2 required"
                                        htmlFor="grid-password"
                                      >
                                        Tag <i className="text-xs font-normal text-gray-500 normal-case">(Hit Enter to create tag)</i>
                                      </label>
                                      <input
                                        name="tag"
                                        ref={register}
                                        className={`px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-xs shadow focus:outline-none focus:shadow-outline w-full ${errors.tag && "border border-solid border-red-500"}`}
                                        placeholder="Tag"
                                        style={{ transition: "all .15s ease" }}
                                        onKeyPress={onTagEnter}
                                      />
                                      {errors.tag && (
                                        <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                                      )}
                                      <div className="flex">
                                        {tags.map(tag => (
                                          <span key={tag} className="flex items-center mt-2 inline-block bg-pink-200 text-pink-800 text-xs px-2 rounded-full font-semibold tracking-wide mr-2">
                                            {tag} <X className="cursor-pointer ml-1" onClick={() => deleteTag(tag)} size={14} />
                                          </span>
                                        ))}
                                      </div>
                                    </div>

                                    <div className="relative w-full mb-3">
                                      <label
                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                      >
                                        Content <i className="text-xs font-normal text-gray-500 normal-case">(Markdown)</i>
                                      </label>
                                      <MarkdownEditor value={content} onChange={(newContent) => setContent(newContent)} />
                                    </div>
                                    <div className="text-center mt-6">
                                      <button
                                        disabled={loading}
                                        className="w-full text-pink-500 bg-transparent border border-solid border-pink-500 hover:bg-pink-500 hover:text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1"
                                        style={{ transition: "all .15s ease" }}
                                      >
                                        {loading ? "Submitting" : "Submit"}
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

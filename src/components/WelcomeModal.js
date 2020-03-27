import React, { useState, useEffect, useCallback } from "react";
import X from "../icons/x";

function stopBubbles(e) {
  e.stopPropagation();
}

export const WelcomeModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const isWelcome = localStorage.getItem('welcome');
    if (!isWelcome) {
      setShowModal(true);
    }

  }, [])

  const closeModal = useCallback(
    () => {
      setShowModal(false);
      localStorage.setItem('welcome', true);
    },
    []
  );

  return (
    <>
      {showModal && (
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

              <div onClick={stopBubbles} style={{ height: "50%" }} className="bg-white rounded-lg overflow-x-hidden overflow-y-auto shadow-xl transform transition-all sm:max-w-4xl sm:w-full">
                <div className="bg-white w-full h-full">
                  <div className="sm:flex sm:items-start h-full">
                    <div className="text-center w-full h-full sm:text-left">
                      <div className="h-full">
                        <div className="relative flex content-center h-full items-center justify-center">
                          <div className="absolute top-0 w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1584931423298-c576fda54bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80")' }}>
                            <span className="w-full h-full absolute opacity-75 bg-black" />
                          </div>
                          <div className="container h-full relative mx-auto">
                            <div className="items-center flex flex-wrap h-full">
                              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                                <div className="pr-12">
                                  <h1 className="text-white font-semibold text-2xl">Deals from companies that want to help out with COVID-19.</h1>
                                  <p className="mt-4 text-base text-gray-300">Join with us now!!!</p>
                                  <i className="mt-4 text-sm text-gray-300">
                                    Thank to all those companies that made it happen.
                                  </i>
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
      )}
    </>
  )
}

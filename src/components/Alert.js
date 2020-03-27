import React, { memo } from "react";
import Bell from "../icons/bell";

export const Alert = memo(({ color, alert, showAlert, setShowAlert, onCloseAlert }) => {
  return (
    <>
      {showAlert ? (
        <div className={"text-white px-4 py-2 border-0 relative flex items-center bg-" + color + "-500"} >
          <span className="text-xl inline-block mr-5 align-middle">
            <Bell size={20} />
          </span>
          <span className="inline-block text-sm font-medium align-middle mr-8">
            {alert}
          </span>
          <button
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-2 mr-4 outline-none focus:outline-none"
            onClick={() => {
              setShowAlert(false);
              onCloseAlert();
            }}
          >
            <span>×</span>
          </button>
        </div>
      ) : null}
    </>
  );
});

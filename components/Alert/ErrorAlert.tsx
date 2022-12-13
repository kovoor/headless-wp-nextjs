import React, { useState } from "react";

export const ErrorAlert = ({ message, status, setFunction }: any) => {
  const [close, setClose] = useState<boolean>();
  console.log(message);
  console.log("Status", status);
  console.log(close);
  console.log(setFunction);
  return (
    <div
      className={
        status !== null
          ? status === true
            ? "hidden"
            : ""
          : close === true
          ? "hidden"
          : ""
      }
    >
      <div className="text-center py-4 lg:px-4 rounded">
        <div
          className="p-2 bg-red-800 items-center text-white leading-none rounded-full flex lg:inline-flex"
          role="alert"
        >
          <span className="flex rounded-full bg-red-600 uppercase px-2 py-1 text-xs font-bold mr-3">
            Error
          </span>
          <span className="font-semibold mr-2 text-left flex-auto">
            {message}
          </span>
          <button
            onClick={() => {
              setClose(true);
              if (setFunction) {
                setFunction(true);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

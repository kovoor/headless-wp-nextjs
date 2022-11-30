import React, { useState } from "react";

export const NoteAlert = ({ message }: any) => {
  const [close, setClose] = useState<boolean>();
  console.log(message);
  console.log(close);
  return (
    <div className={close === true ? "hidden" : ""}>
      <div className="text-center py-4 lg:px-4">
        <div
          className="p-2 bg-yellow-600 items-center text-white leading-none rounded-full flex lg:inline-flex"
          role="alert"
        >
          <span className="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3">
            Note
          </span>
          <span className="font-semibold mr-2 text-left flex-auto">
            {message}
          </span>
          {/* <svg
                className="fill-current opacity-75 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
              </svg> */}
          <button onClick={() => setClose(true)}>
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

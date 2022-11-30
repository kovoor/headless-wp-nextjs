import React, { useState } from "react";

export const PreviewAlert = ({ preview }: any) => {
  //   const [close, setClose] = useState(false);

  return (
    <div>
      {preview ? (
        <div className="text-center py-4 lg:px-4">
          <div
            className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none rounded-full flex lg:inline-flex"
            role="alert"
          >
            <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
              Preview
            </span>
            <div className="font-semibold mr-2 text-left flex-auto">
              This is a page preview.{" "}
              <a
                href="/api/exit-preview"
                className="underline hover:text-cyan duration-200 transition-colors"
              >
                {" "}
                Click here
              </a>{" "}
            </div>
            <svg
              className="fill-current opacity-75 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
            </svg>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

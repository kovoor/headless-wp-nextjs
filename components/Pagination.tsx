import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React from "react";

const MAX_NUM_PAGES = 10;

export const Pagination = ({
  pagesCount,
  currentPage,
  basePath,
  addCanonical = true,
}: any) => {
  const path = `/page/`;
  const hasPreviousPage = pagesCount > 1 && currentPage > 1;
  const hasNextPage = pagesCount > 1 && currentPage < pagesCount;

  let hasPrevDots = false;
  let hasNextDots = false;

  function getPages() {
    let pages = pagesCount;

    let start = 0;
    // If the number of pages exceeds the max
    if (pagesCount > MAX_NUM_PAGES) {
      // Set number of pages to the max
      pages = MAX_NUM_PAGES;
      const half = Math.ceil(MAX_NUM_PAGES / 2);
      const isHead = currentPage <= half;
      const isTail = currentPage > pagesCount - half;
      hasNextDots = !isTail;
      // If the current page is at the head, the start variable remains 0
      if (!isHead) {
        hasPrevDots = true;
        // If the current page is at the tail, the start variable is set to
        // the last chunk. Otherwise the start variable will place the current
        // page at the middle
        start = isTail ? pagesCount - MAX_NUM_PAGES : currentPage - half;
      }
    }
    return [...new Array(pages)].map((_, i) => i + 1 + start);
  }

  const pages = getPages();

  return (
    <nav
      // className={styles.nav}
      role="navigation"
      aria-label="Pagination Navigation"
    >
      <div className="px-4 py-3 flex flex-1 sm:justify-center items-center justify-between border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          {hasPreviousPage && (
            <Link href={`${path}${currentPage - 1}`}>
              {/* <a aria-label="Goto Previous Page">
              <PreviousIcon /> Previous
            </a> */}
              <a
                aria-label="Goto Previous Page"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </a>
            </Link>
          )}

          {/* <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </a> */}

          {hasNextPage && (
            <Link href={`${path}${currentPage + 1}`}>
              <a
                aria-label="Goto Next Page"
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </a>
            </Link>
          )}
          {/* <a
            href="#"
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </a> */}
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
          {/* <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
            <span className="font-medium">97</span> results
          </p>
        </div> */}
          <div>
            <nav
              className="group first-letter:relative z-0 inline-flex rounded-md shadow-sm -space-x-px font-Space-Grotesk"
              aria-label="Pagination"
            >
              {hasPreviousPage && (
                <Link href={`${path}${currentPage - 1}`}>
                  {/* <a aria-label="Goto Previous Page">
              <PreviousIcon /> Previous
            </a> */}
                  <a className=" relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </Link>
              )}

              {/* <a
                href="#"
                className=" relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a> */}
              {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}

              {pages.map((page) => {
                const active = page === currentPage;
                return active ? (
                  // <li key={page}>
                  //   <span aria-label={`Current Page, Page ${page}`} aria-current="true">
                  //     {page}
                  //   </span>
                  // </li>
                  <a
                    key={page}
                    href="#"
                    aria-label={`Current Page, Page ${page}`}
                    aria-current="true"
                    className="z-10 bg-indigo-50 border-indigo-500 font-bold relative inline-flex items-center px-4 py-2 border text-sm"
                  >
                    {page}
                  </a>
                ) : (
                  // <li key={page}>
                  //   <Link href={`${path}${page}`}>
                  //     <a aria-label={`Goto Page ${page}`}>
                  //       <span>{page}</span>
                  //     </a>
                  //   </Link>
                  // </li>
                  <li
                    key={page}
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    <Link href={`${path}${page}`}>
                      <a aria-label={`Goto Page ${page}`}>
                        <span>{page}</span>
                      </a>
                    </Link>
                  </li>
                );
              })}

              {/* <a
                href="#"
                aria-current="true"
                className="z-10 bg-indigo-50 border-indigo-500 font-bold relative inline-flex items-center px-4 py-2 border text-sm"
              >
                1
              </a> */}
              {/* <a
                href="#2"
                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              >
                2
              </a>
              <a
                href="#3"
                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
              >
                3
              </a>
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
              <a
                href="#"
                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
              >
                8
              </a>
              <a
                href="#"
                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              >
                9
              </a>
              <a
                href="#"
                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              >
                10
              </a> */}

              {hasNextPage && (
                <Link href={`${path}${currentPage + 1}`}>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    aria-label="Goto Next Page"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
};

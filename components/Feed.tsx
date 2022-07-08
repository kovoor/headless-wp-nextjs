import Link from "next/link";
import React from "react";
import { Pagination } from "./Pagination";
import { Post } from "./Post";
import { GetServerSideProps } from 'next'

export const Feed = () => {
  return (
    <div className="flex flex-col lg:w-9/12 h-6/12 overflow-hidden flex-wrap">
      {/* Screen Title */}
      <div className="flex">
        <h2 className="font-Space-Grotesk text-2xl xl:text-3xl font-bold">
          Latest Posts
        </h2>
      </div>

      {/* Posts Vertically – 5 min-h-screen */}
      <div className="flex flex-col space-y-1 mt-4 ">
        <Link href="/post/1/hello-world" prefetch={false}>
          <a>
            <Post />
          </a>
        </Link>
        <Link href="/post/1/hello-world" prefetch={false}>
          <a>
            <Post />
          </a>
        </Link>
        <Link href="/post/1/hello-world" prefetch={false}>
          <a>
            <Post />
          </a>
        </Link>
        <Link href="/post/1/hello-world" prefetch={false}>
          <a>
            <Post />
          </a>
        </Link>
        <Link href="/post/1/hello-world" prefetch={false}>
          <a>
            <Post />
          </a>
        </Link>
      </div>

      {/* Pagination Buttons */}
      <div>
        <Pagination />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const vaar = "hello world"
  return {
    props: {}
  };
}




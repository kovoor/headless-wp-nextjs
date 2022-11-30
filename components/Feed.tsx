import Link from "next/link";
import React from "react";
import { Pagination } from "./Pagination";
import { Post } from "./Post";

export const Feed = ({ posts, pagination }: any) => {
  
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
        {posts.map((post: any) => (
          <div key={post.slug}>
            {/* <Link
              href={`/post/${post.databaseId}/${post.slug}`}
              prefetch={false}
              passHref
            >
              <a> */}
                <Post
                  id={post.databaseId}
                  title={post.title}
                  coverImage={post.featuredImage}
                  date={post.date}
                  author={post.author}
                  slug={post.slug}
                  excerpt={post.excerpt}
                  tags={post.tags}
                  categories={post.categories}
                />
              {/* </a>
            </Link> */}
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      {pagination ? (
        <div>
          <Pagination
            addCanonical={false}
            currentPage={pagination?.currentPage}
            pagesCount={pagination?.pagesCount}
            basePath={pagination?.basePath}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

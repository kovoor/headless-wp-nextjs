import Link from "next/link";
import React from "react";
import { Pagination } from "./Pagination";
import { Post } from "./Post";
import { GetServerSideProps } from "next";

export const Feed = ({ posts }: any) => {
  posts.map(({ node }: any) => (console.log(node)))
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
        {posts.map(({ node }: any) => (
          <div key={node.slug}>
          <Link href={`/post/${node.databaseId}/${node.slug}`} prefetch={false}>
            <a>
              <Post
                id={node.databaseId}
                title={node.title}
                coverImage={node.featuredImage}
                date={node.date}
                author={node.author}
                slug={node.slug}
                excerpt={node.excerpt}
                tags={node.tags}
                categories={node.categories}
              />
            </a>
          </Link>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div>
        <Pagination />
      </div>
    </div>
  );
};

import Link from "next/link";
import React from "react";
import { SidebarPost } from "./SidebarPost";

export const Sidebar = ({ posts }: any) => {
  return (
    <div className="hidden lg:flex lg:flex-col w-3/12">
      <div className='text-center'>
        <h2 className='text-2xl font-bold font-Space-Grotesk'>Guides</h2>
      </div>

      {/* Posts vertically – 4 */}
      <div className="flex flex-col space-y-1 mt-4">
 
      {posts?.map((post: any) => (
          <div key={post.slug}>
          <Link href={`/post/${post.databaseId}/${post.slug}`} prefetch={false}>
            <a>
              <SidebarPost
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
            </a>
          </Link>
          </div>
        ))}
      </div>
      {/* Button for More – link to guides page*/}
    </div>
  );
};

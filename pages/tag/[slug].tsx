import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Post } from "../../components/Post";
import {
  getAllTagsWithSlug,
  getPostsForTagPage,
} from "../../lib/postQueryFunctions";

const Tag = ({ allPosts: { posts, description, name } }: any) => {
  return (
    <div className="min-h-screen overflow-hidden">
      <Head>
        {/* TODO:Change below title */}
        <title>{name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex min-h-screen px-4 py-4 space-x-8 bg-slate-50">
        <div className="flex flex-col lg:w-9/12 h-6/12 overflow-hidden flex-wrap">
          {/* Screen Title */}
          <div className="w-fit bg-gray-700 px-2 pb-1 justify-center items-center rounded-lg">
            <span className="text-xs text-white font-Space-Grotesk font-semibold">
              Tag
            </span>
          </div>
          <div className="flex">
            <h2 className="font-Space-Grotesk text-2xl xl:text-3xl font-bold mt-2">
              {name}
            </h2>
          </div>
          <div>
            <p className="text-sm mt-2 ">{description} </p>
          </div>

          {/* Posts Vertically – 5 min-h-screen */}
          <div className="flex flex-col space-y-1 mt-4 overflow-hidden">
            {posts ? (
              posts?.map((post: any) => (
                <div key={post.slug}>
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
                </div>
              ))
            ) : (
              <></>
            )}
          </div>

          {/* Pagination Buttons */}
          <div>
            <Pagination />
          </div>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export async function getStaticPaths({ preview = false }) {
  const allPosts = await getAllTagsWithSlug(preview);
  console.log(allPosts);

  return {
    paths: allPosts.nodes.map((post: any) => `/tag/${post.slug}`) || [],
    fallback: true,
  };
}

export async function getStaticProps({ preview = false, params }: any) {
  const id = params.slug;
  console.log("MINIONS!", id);
  const allPosts = await getPostsForTagPage(preview, id);
  return {
    props: { allPosts, preview },
    revalidate: 10,
  };
}

export default Tag;

import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { CalendarIcon } from "@heroicons/react/outline";
import { FolderIcon } from "@heroicons/react/outline";
import { ArrowSmRightIcon } from "@heroicons/react/outline";
import { RelatedPost } from "../../../components/RelatedPost";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../../lib/api";
import Date from "../../../components/Date";
import PostBody from "../../../components/Post/PostBody";
import { supabase } from "../../../utils/supabase";
import { User } from "@supabase/supabase-js";

export const Post = ({ post, posts, preview }: any) => {
  const router = useRouter();
  const morePosts = posts?.edges;
  const [userExists, setUserExists] = useState<User | null>();
  const [email, setEmail] = useState("");

  const handleNewsletterSub = () => {};

  // if (!router.isFallback && !post?.slug) {
  //   return <ErrorPage statusCode={404} />
  // }

  useEffect(() => {
    const user = supabase.auth.user();
    setUserExists(user);
  }, []);

  const name = post?.author
    ? post.author.node.firstName && post.author.node.lastName
      ? `${post.author.node.firstName} ${post.author.node.lastName}`
      : post.author.node.name
    : null;

  posts.edges.map((post: any) => console.log(post.node))

  return (
    <div>
      <Header />

      <article>
        <Head>
          {/* TODO:Change below title */}
          <title>{post?.title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="min-h-screen bg-slate-50 flex flex-col flex-1 w-full">
          <div className="flex flex-col flex-1 px-5 pt-4 bg-slate-50 md:justify-center md:w-3/4 md:self-center">
            {/* Breadcrumbs + Tags */}
            <div className="flex space-x-2 font-Space-Grotesk text-sm font-semibold text-slate-500 border-b pb-2 w-fit">
              <FolderIcon className="h-5 w-5 text-slate-500" />
              <span className="hover:underline hover:text-black cursor-pointer">
                <Link
                  href={`/category/${post?.categories.edges[0].node.slug}`}
                  prefetch={false}
                >
                  <a>{post?.categories.edges[0].node.name}</a>
                </Link>
              </span>
              {post?.tags.length > 0 ? <ArrowSmRightIcon className="h-5 w-5 text-slate-500" /> : <></>}
              <span className="hover:underline hover:text-black cursor-pointer">
                <Link
                  href={post?.tags.length > 0 ? `/tag/${post?.tags?.edges[0].node.slug}` : ''}
                  prefetch={false}
                >
                  <a>{post?.tags.length > 0 ? post.tags.edges[0].node.name : <></>}</a>
                </Link>
              </span>
            </div>
          </div>

          {/* min-h-screen  */}
          <main className="flex px-6 py-2 bg-slate-50 md:justify-center">
            {/* Breadcrumbs + Tags */}
            <div className="flex flex-col md:w-3/4 ">
              <div className="">
                {/* Post Title (Not SEO version) */}
                <h1 className="font-Space-Grotesk text-3xl font-bold">
                  {post?.title}
                </h1>
                {/* Post Excerpt (Not SEO Meta Description) */}
                <div
                  className="font-Space-Grotesk text-base text-slate-600 font-normal mt-2"
                  dangerouslySetInnerHTML={{ __html: post?.excerpt }}
                />
                {/* Author(s) + Date */}
                <div className="flex flex-row justify-between mt-2">
                  <span className="font-Space-Grotesk text-slate-500 text-xs">
                    Published by {/* TODO: Add author images here */}
                    <span className="hover:text-black cursor-pointer">
                      <Link href="/profile/jakekovoor">{name}</Link>{" "}
                    </span>
                    {/* <span className="">and </span>
                    <span className="hover:text-black cursor-pointer">
                      <Link href="/profile/janekovoor">Jane Kovoor</Link>
                    </span> */}
                  </span>
                  <div className="group flex flex-row space-x-1">
                    <CalendarIcon className="h-4 w-4 text-slate-500" />
                    <span className="font-Space-Grotesk text-slate-500 text-xs">
                      {/* <Link href="/archive/28-5-2022">May 26, 2022</Link> */}
                      <Date dateString={post?.date} />
                    </span>
                  </div>
                </div>
              </div>
              {/* Featured Image + Caption */}
              <figure className="flex flex-col mt-8">
                <img
                  className="object-cover w-full h-full md:w-9/12 md:h-9/12 self-center"
                  src={post?.featuredImage?.node.sourceUrl}
                  alt={post?.featuredImage?.node.altText}
                />
                <figcaption
                  className="font-Space-Grotesk text-slate-500 text-xs mt-2 self-center"
                  dangerouslySetInnerHTML={{
                    __html: post?.featuredImage?.node.caption,
                  }}
                />
              </figure>

              {/* Post Content  */}
              <div className="mt-6 text-slate-600 tracking-wide	md:text-lg">
                <PostBody content={post?.content} />
              </div>
            </div>
          </main>

          {/* TODO: Add appearing button conditionally */}
          {userExists ? (
            <></>
          ) : (
            <div className="flex flex-1 mb-10 bg-slate-100 mx-8 justify-center md:self-center md:w-4/6 lg:w-3/6 rounded-md border">
              <div className="flex flex-col py-4">
                {/* TODO: Hide if the user is alr logged in */}
                <h2 className="font-Space-Grotesk text-xl font-semibold text-center">
                  Subscribe to Our Newsletter
                </h2>
                <div className="flex justify-center space-x-3">
                  {/* TODO: Add email pattern validation */}
                  <input
                    type="email"
                    className="shadow border rounded text-gray-600 my-2 px-4 py-1"
                    placeholder="satoshi@gmail.com"
                    size={30}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    required
                  />
                  <button
                    className="bg-purple-500 hover:bg-purple-700 shadow text-white font-bold my-2 py-2 px-2 rounded focus:outline-none focus:shadow-outline disabled:transform-none disabled:transition-none disabled:bg-slate-400 disabled:cursor-not-allowed disabled:text-white"
                    type="button"
                    // TODO: Add this state management + form with external newsletter management api
                    onClick={() => handleNewsletterSub()}
                    disabled={!email.length}
                  >
                    {" "}
                    I'm ready
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TODO: Add comments section */}
          <div className="flex flex-1 px-6 py-2">
            {/* TODO:can be removed later, not need a heading  */}
            <h2 className="font-Space-Grotesk text-2xl font-bold ">
              {/* Comments */}
            </h2>
          </div>

          { posts ? <div className="flex flex-1 flex-col px-6 py-2 bg-slate-50 w-full mb-6 max-h-fit  ">
            <div className="flex w-full md:w-3/4 md:self-center border-t">
              <h2 className="font-Space-Grotesk text-2xl font-bold mt-4">
                You may also like ...
              </h2>
            </div>

            {/* flex flex-1 space-x-2 mt-4 justify-center w-80 h-full flex-wrap overflow-auto  md:w-3/4 h-96 lg:h-full */}
            <div className="flex flex-row mt-4 md:space-x-2 space-x-1 overflow-hidden w-full justify-center md:w-3/4 md:self-center flex-wrap max-w-full max-h-96">
              {posts.edges.map(({ node }: any) => (
                <div key={node.slug}>
                  <Link
                    href={`/post/${node.databaseId}/${node.slug}`}
                    prefetch={false}
                  >
                    <a>
                  {" "}
                  <RelatedPost 
                title={node.title}
                coverImage={node.featuredImage}
                date={node.date}
                author={node.author}
                slug={node.slug}
                excerpt={node.excerpt}
                tag={node.tags}
                categories={node.categories}/>
                </a>
                  </Link>
                </div>
              ))}
            </div>
          </div> : <></>}
          
        </div>

        <footer>
          <Footer />
        </footer>
      </article>
    </div>
  );
};

export async function getStaticProps({
  params,
  preview = false,
  previewData,
}: any) {
  const data = await getPostAndMorePosts(params.slug, preview, previewData);

  return {
    props: {
      preview,
      post: data.post,
      posts: data.posts,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  console.log(allPosts);

  return {
    paths:
      allPosts.edges.map(
        ({ node }: any) => `/post/${node.databaseId}/${node.slug}`
      ) || [],
    fallback: true,
  };
}

export default Post;

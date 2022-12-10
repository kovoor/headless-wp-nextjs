import { NextPage } from "next";
import Head from "next/head";
import React from 'react';
import { PreviewAlert } from "../../components/Alert/PreviewAlert";
import { Feed } from "../../components/Feed";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { getAllPosts, getPagesCount, getPaginatedPosts, getSidebarPosts } from "../../lib/postQueryFunctions";

const Posts: NextPage = ({ posts, sidebarPosts, preview, pagination }: any) => {
  // const posts = edges
  
  return (
    <div className="">
      <Head>
        <title className="font-body">Defiants</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <PreviewAlert preview={preview} />

      <main className="flex min-h-screen px-4 py-4 space-x-8 bg-slate-50">
        <Feed posts={posts} pagination={pagination} />
        <Sidebar posts={sidebarPosts} />
      </main>

      <Footer />
    </div>
  );
};

export async function getStaticProps({ params = {} }: any = {}, preview=false
) {
  // let preview;
  const { posts, pagination } = await getPaginatedPosts(preview, {
    currentPage: params?.page,
  });

  console.log("params?.page", params)

  const category = "guides";
  const { sidebarPosts } = await getSidebarPosts(preview, category);

  if (!pagination.currentPage) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      posts,
      sidebarPosts,
      pagination: {
        ...pagination,
        basePath: "/",
      },
    },
    revalidate: 10,
  };
}

export async function getStaticPaths({ preview = false }) {
  const { posts } = await getAllPosts(preview);
  const pagesCount = await getPagesCount(posts);

  const paths = [...new Array(pagesCount)].map((_, i) => {
    return { params: { page: String(i + 1) } };
  });  

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default Posts;

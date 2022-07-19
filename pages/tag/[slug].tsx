import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { Post } from '../../components/Post'
import { getAllPostsForHome } from '../../lib/api'

const Tag = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      <Head>
        {/* TODO:Change below title */}
        <title>Category Title</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex min-h-screen px-4 py-4 space-x-8 bg-slate-50">
      <div className="flex flex-col lg:w-9/12 h-6/12 overflow-hidden flex-wrap">
      {/* Screen Title */}
      <div className="w-fit bg-gray-700 px-2 pb-1 justify-center items-center rounded-lg">
        <span className="text-xs text-white font-Space-Grotesk font-semibold">Tag</span>
      </div>
      <div className="flex">
        <h2 className="font-Space-Grotesk text-2xl xl:text-3xl font-bold mt-2">
          Ethereum
        </h2>
      </div>
      {/* TODO: Change the below description */}
      {/* <div>
        <p className="text-sm mt-2 ">
        ERC-721 is a token standard for non-fungible tokens on Ethereum. A pillar of the ecosystem, it supports billions of dollars worth of NFTs.
        </p>
      </div> */}

      {/* Posts Vertically – 5 min-h-screen */}
      <div className="flex flex-col space-y-1 mt-4 overflow-hidden">
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
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
};

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview);
  return {
    props: { allPosts, preview },
    revalidate: 10,
  }
}

export default Tag;
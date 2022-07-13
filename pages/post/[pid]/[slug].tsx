import Head from "next/head";
import React from "react";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { CalendarIcon } from "@heroicons/react/outline";
import { FolderIcon } from "@heroicons/react/outline";
import { ArrowSmRightIcon } from "@heroicons/react/outline";
import { RelatedPost } from "../../../components/RelatedPost";
import Link from "next/link";
import { GetServerSideProps } from "next";

export const NewsPost = () => {
  return (
    <div className="">
      <Head>
        {/* TODO:Change below title */}
        <title>SEO Post Title</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="min-h-screen bg-slate-50 flex flex-col flex-1 w-full">
        <div className="flex flex-col flex-1 px-5 pt-4 bg-slate-50 md:justify-center md:w-3/4 md:self-center">
          {/* Breadcrumbs + Tags */}
          <div className="flex space-x-2 font-Space-Grotesk text-sm font-semibold text-slate-500 border-b pb-2 w-fit">
            <FolderIcon className="h-5 w-5 text-slate-500" />
            <span className="hover:underline hover:text-black cursor-pointer">
              <Link href="/category/guides" prefetch={false}>
                <a>Guides</a>
              </Link>
            </span>
            <ArrowSmRightIcon className="h-5 w-5 text-slate-500" />
            <span className="hover:underline hover:text-black cursor-pointer">
              <Link href="/tag/ethereum" prefetch={false}>
                <a>Ethereum</a>
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
                What is ERC-721? The Ethereum NFT Token Standard
              </h1>
              {/* Post Excerpt (Not SEO Meta Description) */}
              <p className="font-Space-Grotesk text-base text-slate-600 font-normal mt-2">
                ERC-721 is a token standard for non-fungible tokens on Ethereum.
                A pillar of the ecosystem, it supports billions of dollars worth
                of NFTs.
              </p>
              {/* Author(s) + Date */}
              <div className="flex flex-row justify-between mt-2">
                <span className="font-Space-Grotesk text-slate-500 text-xs">
                  Published by {/* TODO:add author images here */}
                  <span className="hover:text-black cursor-pointer">
                    <Link href="/profile/jakekovoor">Jake Kovoor</Link> {" "}
                  </span>
                  <span className="">
                    and {" "}
                  </span>
                  <span className="hover:text-black cursor-pointer"><Link href="/profile/janekovoor">
                  Jane Kovoor</Link>
                  </span>
                </span>
                <div className="group flex flex-row space-x-1">
                  <CalendarIcon className="h-4 w-4 text-slate-500" />
                  <span className="font-Space-Grotesk text-slate-500 text-xs">
                  <Link href="/archive/28-5-2022">
                  May 26, 2022</Link>
                  </span>
                </div>
              </div>
            </div>
            {/* Featured Image + Caption */}
            <figure className="flex flex-col mt-4">
              <img
                className="object-cover w-full h-full"
                src="https://images.unsplash.com/photo-1642104704074-907c0698cbd9"
                alt="to be determined"
              />
              <figcaption className="font-Space-Grotesk text-slate-500 text-xs mt-2 self-center	">
                Image caption of ethereum object
              </figcaption>
            </figure>

            {/* Post Content  */}
            <div className="mt-6 text-slate-600 tracking-wide	md:text-lg	">
              <p className="pb-4">
                After a tumultuous month for the crypto markets, Bitcoin (BTC)
                was poised to extend its losing streak to a record nine weeks.
                However, that scenario has been narrowly avoided after the
                leading cryptocurrency jumped in the late hours on Sunday to hit
                a seven-day high of $30,723.
              </p>

              <p className="pb-4">
                Though a modest correction brought Bitcoin down to $30,594 by
                press time, it is still up 5.5% on the last day, according to
                CoinMarketCap.{" "}
              </p>
              <p className="pb-4">
                Despite the latest positive sentiment, data from Coinglass shows
                that Bitcoin is down 18.63% so far this month, following a 17.3%
                loss in gains in April.{" "}
              </p>
              <p className="pb-4">
                After a tumultuous month for the crypto markets, Bitcoin (BTC)
                was poised to extend its losing streak to a record nine weeks.
                However, that scenario has been narrowly avoided after the
                leading cryptocurrency jumped in the late hours on Sunday to hit
                a seven-day high of $30,723.
              </p>

              <p className="pb-4">
                Though a modest correction brought Bitcoin down to $30,594 by
                press time, it is still up 5.5% on the last day, according to
                CoinMarketCap.{" "}
              </p>
            </div>
          </div>
        </main>

        {/* TODO: Add appearing button conditionally */}
        <div className="flex flex-1 mb-10 bg-slate-100 mx-8 justify-center md:self-center md:w-4/6 lg:w-3/6 rounded-md border">
          <div className="flex flex-col py-4">
            {/* TODO: Hide if the user is alr logged in */}
            <h2 className="font-Space-Grotesk text-xl font-semibold text-center">
              Subscribe to Our Newsletter
            </h2>
            <div className="flex justify-center space-x-3">
              <input
                type="email"
                className="shadow border rounded text-gray-600 my-2 px-4 py-1"
                placeholder="satoshi@gmail.com"
                pattern=".+@globex\.com"
                size={30}
                id="email"
              />
              <button
                className="bg-purple-500 hover:bg-purple-700 shadow text-white font-bold my-2 py-2 px-2 rounded focus:outline-none focus:shadow-outline disabled:transform-none disabled:transition-none disabled:bg-slate-400 disabled:cursor-not-allowed disabled:text-white"
                type="button"
                // TODO: Add this state management + form with external newsletter management api 
                // onClick={() => handleResetPass}
                // disabled={!resetPassEmail.length}
              >
                {" "}
                I'm ready
              </button>
            </div>
          </div>
        </div>

        {/* TODO: Add comments section */}
        <div className="flex flex-1 px-6 py-2">
          {/* TODO:can be removed later, not need a heading  */}
          <h2 className="font-Space-Grotesk text-2xl font-bold ">
            {/* Comments */}
          </h2>
        </div>

        <div className="flex flex-1 flex-col px-6 py-2 bg-slate-50 w-full mb-6 max-h-fit  ">
          <div className="flex w-full md:w-3/4 md:self-center border-t">
            <h2 className="font-Space-Grotesk text-2xl font-bold mt-4">
              You may also like ...
            </h2>
          </div>

          {/* flex flex-1 space-x-2 mt-4 justify-center w-80 h-full flex-wrap overflow-auto  md:w-3/4 h-96 lg:h-full */}
          <div className="flex flex-row mt-4 md:space-x-2 space-x-1 overflow-hidden w-full justify-center md:w-3/4 md:self-center flex-wrap max-w-full max-h-96">
            <Link href="/post/1/hello-world" prefetch={false}>
              <a>
                {" "}
                <RelatedPost />
              </a>
            </Link>{" "}
            <Link href="/post/1/hello-world" prefetch={false}>
              <a>
                {" "}
                <RelatedPost />
              </a>
            </Link>{" "}<Link href="/post/1/hello-world" prefetch={false}>
              <a>
                {" "}
                <RelatedPost />
              </a>
            </Link>{" "}<Link href="/post/1/hello-world" prefetch={false}>
              <a>
                {" "}
                <RelatedPost />
              </a>
            </Link>{" "}<Link href="/post/1/hello-world" prefetch={false}>
              <a>
                {" "}
                <RelatedPost />
              </a>
            </Link>{" "}
          </div>
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const vaar = "hello world"
  return {
    props: {}
  };
}

export default NewsPost;

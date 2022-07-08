import Head from 'next/head'
import React from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

const Custom500 = () => {
  return (
  <div className="min-h-screen">
      <Head>
        <Header />
      </Head>

      <div className="flex flex-col min-h-screen px-4 py-4 space-x-8 bg-slate-50 align-middle items-center">
        <h1 className="font-semibold font-Space-Grotesk mt-4 text-xl">
         500 - Internal Server Error
        </h1>
        <h2 className="font-bold font-Space-Grotesk mt-6 text-3xl">
          Our servers are taking a break
        </h2>
        <img
          src="https://c.tenor.com/NDJLxTnxbsMAAAAd/cat-bed-laying-lazy-dzekas.gif"
          className="mt-8"
        />
        <div className="flex w-96 self-center mt-4 space-x-1"></div>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Custom500
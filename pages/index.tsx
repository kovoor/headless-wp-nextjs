import type { NextPage } from "next";
import Head from "next/head";
import { Feed } from "../components/Feed";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { getAllPostsForHome } from '../lib/api'

const Home: NextPage = ({ allPosts: { edges }, preview }: any) => {
  console.log(edges)


  return (
    <div className="">
      <Head>
        <title className="font-body">Defiants</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex min-h-screen px-4 py-4 space-x-8 bg-slate-50">
        <Feed />
        <Sidebar />
      </main>

        <Footer />

    </div>
  );
};

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview);
  return {
    props: { allPosts, preview },
    revalidate: 10,
  }
}

export default Home;



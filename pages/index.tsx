import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { PreviewAlert } from "../components/Alert/PreviewAlert";
import { Feed } from "../components/Feed";
import { ErrorAlert } from "../components/Alert/ErrorAlert";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import {
  getPaginatedPosts,
  getHomepageSidebarPosts,
} from "../lib/postQueryFunctions";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";
import { SuccessAlert } from "../components/Alert/SuccessAlert";

const Home: NextPage = ({ posts, sidebarPosts, preview, pagination }: any) => {
  const [x, setX] = useState<any>();
  const [resetStatus, setResetStatus] = useState<any>();
  const [createUserStatus, setCreateUserStatus] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      // console.log(event, session);
      if (session?.provider_refresh_token && session?.provider_token) {
        setCreateUserStatus(true);
      }
    });

    const { reset } = router.query;
    if (reset) {
      setResetStatus(reset);
    }

    var hash = window!.location.hash.substr(1);
    var result = hash.split("&").reduce(function (res: any, item) {
      var parts = item.split("=");
      res[parts[0]] = parts[1];
      return res;
    }, {});
    // console.log(result);
    setX(result);
  }, []);

  // if (typeof window !== "undefined") {
  //   var hash = window!.location.hash.substr(1);

  //   const result = hash.split("&").reduce(function (res: any, item) {
  //     var parts = item.split("=");
  //     res[parts[0]] = parts[1];
  //     return res;
  //   }, {});
  // }

  return (
    <div className="">
      <Head>
        <title className="font-body">Defiants</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <PreviewAlert preview={preview} />

      {x?.error && (
        <div className=" bg-slate-50">
          <ErrorAlert message={x.error_description.split("+").join(" ")} />
        </div>
      )}

      {resetStatus && (
        <div className=" bg-slate-50">
          <SuccessAlert message={"Password reset successfully"} />
        </div>
      )}

      {createUserStatus && (
        <div className=" bg-slate-50">
          <SuccessAlert message={"Account created successfully"} />
        </div>
      )}

      <main className="flex min-h-screen px-4 py-4 space-x-8 bg-slate-50">
        <Feed posts={posts} pagination={pagination} />
        <Sidebar posts={sidebarPosts} />
      </main>

      <Footer />
    </div>
  );
};

export async function getStaticProps({ preview = false }) {
  const { posts, pagination } = await getPaginatedPosts(preview);
  const category = "guides";
  const { sidebarPosts } = await getHomepageSidebarPosts(preview, category);

  // supabase.auth.onAuthStateChange((event, session) => {
  //   console.log(event, session);
  // });

  return {
    props: {
      posts,
      sidebarPosts,
      preview,
      pagination: {
        ...pagination,
        basePath: "/",
      },
    },
    revalidate: 10,
  };
}

export default Home;

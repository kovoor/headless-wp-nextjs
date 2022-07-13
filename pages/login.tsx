import { ChevronLeftIcon, HomeIcon } from "@heroicons/react/outline";
import Head from "next/head";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { supabase } from "../utils/supabase";
import { Provider } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { Apple } from "../components/Form/Apple";
import { Google } from "../components/Form/Google";
import { SuccessAlert } from "../components/Alert/SuccessAlert";
import { NoteAlert } from "../components/Alert/NoteAlert";
import { ErrorAlert } from "../components/Alert/ErrorAlert";

const Login = (props: any) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [resetPassEmail, setResetPassEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: "",
    content: "",
  });

  const user = supabase.auth.user();

  useEffect(() => {
    // console.log(props?.router?.query.reset);
    // if (props?.router?.query.reset === "success") {
    //   setMessage({ type: "success", content: "Password reset successfully" });
    // }
    if (user !== null) {
      router.push("/");
    }
  }, [user]);
  // useEffect(() => {
  //   console.log(props?.router?.query.reset);
  //   if (props?.router?.query.reset === "success") {
  //     setMessage({ type: "success", content: "Password reset successfully" });
  //   }
  //   if (user !== null) {
  //     router.replace("/");
  //   }
  // }, [user, props?.router?.query]);

  // if (user) {
  //   return null;
  // }

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage({});

    const { user, session, error } = await supabase.auth.signIn(
      { email: email, password: password },
      { redirectTo: "/" }
    );

    if (error) {
      setMessage({ type: "error", content: error.message });
    }
    if (!password) {
      setMessage({
        type: "note",
        content: "Check your email for the magic link.",
      });
    }
    setLoading(false);
  };

  const handleResetPass = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.api.resetPasswordForEmail(
      resetPassEmail,
      {
        redirectTo: `${window.location.origin}/recovery`,
      }
    );

    if (data) {
      setMessage({
        type: "success",
        content: "Check your email for the reset password instructions.",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Head>
        {/* TODO:Change below title */}
        <title>Log into Account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex min-h-screen px-4 py-4 space-x-8 bg-slate-50 justify-center ">
        <div className="flex flex-1 flex-col lg:w-9/12 h-6/12 overflow-hidden flex-wrap">

          {message.type === "error" && (
            <div className="flex justify-center">
              <ErrorAlert message={message.content} />
            </div>
          )}

          {message.type === "note" && (
            <div className="flex justify-center">
              <NoteAlert message={message.content} />
            </div>
          )}

          {message.type === "success" && (
            <div className="flex justify-center">
              <SuccessAlert message={message.content} />
            </div>
          )}
          <div className="flex justify-center">
            {/* Page title */}

            <h2 className="font-Space-Grotesk text-2xl xl:text-3xl font-semibold mt-6">
              {/* {forgot ? "Reset password" : "Sign in to your account"} */}
              Sign in to your account
            </h2>
          </div>

          {/* Login form  h-72*/}
          <div className="flex flex-col bg-slate-100 w-96 py-4 mt-6 p-8 rounded-md border border-slate-200 justify-center self-center">
            {/* NextAuth comes here, tho */}
            {/* Third Party OAuth + Username/Email & Password – Apple + Google only */}
            {/* <div className="flex justify-evenly	">
            <Apple />
            <Google />
            </div>
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="flex-shrink mx-4 text-gray-400">or</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div> */}
            {forgot == false && (
              <>
                <form onSubmit={handleSignIn} method="POST">
                  <p className="text-black">Email address</p>
                  <input
                    type="email"
                    className="border border-gray-300 rounded text-gray-600 my-2 px-4 py-1 w-full"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size={30}
                    id="email"
                    required
                  />
                  <p className="text-black mt-3">Password</p>
                  <input
                    type="password"
                    className="border border-gray-300 rounded text-gray-600 my-2 px-4 py-1 w-full"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    size={30}
                    id="password"
                    required
                  />
                  <div className="flex justify-between flex-1 mt-2">
                    <div className="flex space-x-2 justify-center items-center ">
                      {/* TODO: Add localstorage persistence / cookie for this */}
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="login-remember-checkbox"
                        className="mr-6 text-sm font-medium text-gray-900 "
                      >
                        Remember Me
                      </label>
                    </div>
                    <button
                      className="bg-blue-500 hover:bg-blue-800 shadow text-white font-bold my-2 py-2 px-2 rounded w-24 focus:ring-2 focus:outline-blue-300 cursor-pointer disabled:transform-none disabled:transition-none disabled:bg-slate-400 disabled:cursor-not-allowed disabled:text-white"
                      onClick={() => handleSignIn}
                      type="submit"
                      disabled={!password.length || !email.length}
                    >
                      {" "}
                      Log in
                    </button>
                  </div>
                </form>
              </>
            )}

            {forgot == true && (
              <>
                <form onSubmit={handleResetPass} method="POST">
                  <p className="text-black">Reset password</p>
                  <input
                    type="email"
                    className="border border-gray-300 rounded text-gray-600 my-2 px-4 py-1 w-full"
                    placeholder="Enter your email address"
                    size={30}
                    id="email"
                    value={resetPassEmail}
                    onChange={(e) => setResetPassEmail(e.target.value)}
                    required
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-800 shadow text-white font-bold my-2 py-2 px-2 rounded focus:ring-2 focus:outline-blue-300 cursor-pointer justify-center align-middle self-center w-full disabled:transform-none disabled:transition-none disabled:bg-slate-400 disabled:cursor-not-allowed disabled:text-white"
                    type="submit"
                    onClick={() => handleResetPass}
                    disabled={!resetPassEmail.length}
                  >
                    {" "}
                    Send reset link
                  </button>
                </form>
              </>
            )}
          </div>

          {forgot == false && (
            <div className="flex w-96 self-center mt-4">
              <button
                className="hover:underline cursor-pointer text-blue-400"
                onClick={() => setForgot(true)}
              >
                Lost your password?
              </button>
            </div>
          )}

          {forgot == true && (
            <div className="flex w-96 self-center mt-4">
              <button
                className=" flex w-96 self-center space-x-1 hover:underline cursor-pointer text-blue-400 align-middle items-center"
                onClick={() => setForgot(false)}
              >
                <ChevronLeftIcon className="h-6 w-4 " />
                Go back
              </button>
            </div>
          )}

          {/* <div className="flex w-96 self-center mt-4 space-x-1">
            <ChevronLeftIcon className="h-6 w-4 "/>
            <span className="hover:underline cursor-pointer">
              Back to homepage
            </span>
          </div> */}
          <div className="group flex w-96 self-center mt-4 justify-center border py-4 rounded-lg bg-white border-slate-400 cursor-pointer ">
            <span className="">
              New to Defiants?{" "}
              <span className="border-gray-300 group-hover:underline text-blue-400">
                <Link href="/signup">
                  <a>Create an account</a>
                </Link>
              </span>
              .
            </span>
          </div>

          <div className="flex w-96 self-center mt-4 space-x-1 justify-center">
            <Link href="/">
              <a className="group flex w-96 self-center mt-4 space-x-1 justify-center">
                <HomeIcon className="h-6 w-5 " />
                <div className="cursor-pointer group-hover:underline">
                  Back to homepage
                </div>
              </a>
            </Link>
          </div>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Login;

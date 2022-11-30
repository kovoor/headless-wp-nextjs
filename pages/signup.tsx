import { useMutation } from "@apollo/client";
import { ChevronLeftIcon, HomeIcon } from "@heroicons/react/outline";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { User } from "@supabase/supabase-js";
import Head from "next/head";
import Link from "next/link";
import router from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { ErrorAlert } from "../components/Alert/ErrorAlert";
import { NoteAlert } from "../components/Alert/NoteAlert";
import { SuccessAlert } from "../components/Alert/SuccessAlert";
import { Footer } from "../components/Footer";
import { Apple } from "../components/Form/Apple";
import { Google } from "../components/Form/Google";
import { Header } from "../components/Header";
import { MUTATION_REGISTER_USER } from "../data/users";
import { getUser, handleWPSignUp } from "../lib/users";
import { supabase } from "../utils/supabase";

const SignUp = () => {
  const [newUser, setNewUser] = useState<User | null>(null);
  const [userExists, setUserExists] = useState<User | null>();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: "",
    content: "",
  });

  const [handleWPSignUp, { data, loading: mutationLoading, error: mutationError }] =
    useMutation(MUTATION_REGISTER_USER, {
      variables: {
        input: {
          clientMutationId: "RegisterUser",
          username,
          password,
          email,
        },
      },
    });

  // getUser().then((user) => {
  //   console.log(user);
  //   setUserExists(user);
  // });

  // useEffect(() => {
  //   // console.log(props?.router?.query.reset);
  //   // if (props?.router?.query.reset === "success") {
  //   //   setMessage({ type: "success", content: "Password reset successfully" });
  //   // }

  //   if (userExists !== null) {
  //     router.replace("/account");
  //   }

  // }, [userExists]);

  if (userExists) {
    return null;
  }

  useEffect(() => {
    // if (userExists !== null) {
    //   // router.push("/account");
    // }

    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session)
    })

    getUser().then((user) => {
      // setUserExists(user)
      console.log(user)
      if(user) {
        router.push('/')
      }
    })

    // if(userExists) {
    //   router.push('/')
    // }

    // if (newUser !== null) {
    //   router.push("/");
    // }
  }, []);
  // }, [userExists, newUser]);

  /* const handleSignUp = async (
    email: string,
    username: string,
    password: string
  ) => {
    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth.signUp(
        { email: email, password: password },
        {
          data: {
            username: username,
          },
        }
      );
      if (error) throw error;
      alert("Check your email for the login link!");
      console.log(user)
    } catch (error: any) {
      alert(error.error_description || error.message);
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    const { user, error } = await supabase.auth.update({
      data: { username: "bacon" },
    });

    console.log(user);
    console.log(error);
  };

  handleUpdate();*/

  //creates account in wordpress

  //creates account in supabase
  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage({});

    console.log(email);

    const { data: createdUser, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username,
        },
      },
    })

    console.log(email);

    if (error) {
      setMessage({ type: "error", content: error.message });
      console.log(error);
      console.log(mutationError)
    } else {
      if (createdUser.user) {
        setNewUser(createdUser.user);
        console.log(newUser);
        console.log("acct created - success! ", createdUser);

        await handleWPSignUp({
          variables: {
            input: {
              clientMutationId: "RegisterUser",
              username,
              password,
              email,
            },
          },
        })
          .then(() => {
            console.log("success", data);
            setMessage({
              type: "success",
              content: "Just one more step. Please check your email for the confirmation link.",
            });
          })
          .catch((error) => {
            `Submission error! ${error.message}`;
          });
      } 
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <Head>
        <title>Create an Account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex min-h-screen px-4 py-4 space-x-8 bg-slate-50 justify-center ">
        <div className="flex flex-1 flex-col lg:w-9/12 h-6/12 overflow-hidden flex-wrap">
          <div className="flex justify-center">
            {/* Page title */}
            <h2 className="font-Space-Grotesk text-2xl xl:text-3xl font-semibold mt-2">
              Create an account
            </h2>
          </div>
          {message.type === "error" && (
            <>
              <ErrorAlert message={message.content} />
            </>
          )}

          {message.type === "note" && (
            <>
              <NoteAlert message={message.content} />
            </>
          )}

          {message.type === "success" && (
            <>
              <SuccessAlert message={message.content} status={false} />
            </>
          )}
          {/* Sign Up form*/}
          <div className="flex flex-col bg-slate-100 w-96 py-4 mt-6 p-8 rounded-md border border-slate-200 justify-center self-center">
            {/* Third Party OAuth + Username/Email & Password – Google only */}
            {/* <div className="flex justify-evenly	">
            <Apple />
            <Google />
            </div>
            
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="flex-shrink mx-4 text-gray-400">or</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div> */}

            <form onSubmit={handleSignUp}>
              <p className="text-black ">Username</p>
              {/* TODO: Add username pattern validation */}
              <input
                type="username"
                className="border rounded text-gray-600 my-2 px-4 py-1 w-full"
                placeholder="Enter desired username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                size={30}
                id="username"
                required
              />
              <p className="text-black mt-3">Email address</p>
              {/* TODO: Add email pattern validation */}
              <input
                type="email address"
                className="border rounded text-gray-600 my-2 px-4 py-1 w-full"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size={30}
                id="email address"
                required
              />
              <p className="text-black mt-3">Password</p>
              {/* TODO: Add password pattern validation */}
              <input
                type="password"
                className="border rounded text-gray-600 my-2 px-4 py-1 w-full"
                placeholder="Enter a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size={30}
                id="password"
                required
              />
              <div className="flex justify-center flex-1 mt-2">
                {/* <div className="flex space-x-2 justify-center items-center ">
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
              </div> */}
                <button
                  className="bg-blue-500 hover:bg-blue-800 shadow text-white font-bold my-2 py-2 px-2 rounded focus:ring-2 focus:outline-blue-300 w-36 disabled:transform-none disabled:transition-none disabled:bg-slate-400 disabled:cursor-not-allowed disabled:text-white"
                  onClick={() => handleSignUp}
                  type="submit"
                  disabled={
                    !password.length || !email.length || !username.length
                  }
                >
                  {" "}
                  Sign up
                </button>
              </div>
            </form>
          </div>

          <div className="group flex w-96 self-center mt-4 justify-center border py-4 rounded-lg bg-white border-slate-400 cursor-pointer ">
            <span className="">
              Already have an account?{" "}
              <span className="border-gray-300 group-hover:underline text-blue-400">
                <Link href="/login">
                  <a>Log in here</a>
                </Link>
              </span>
              .
            </span>
          </div>

          {/* <div className="flex flex-col w-96 self-center mt-8 border-t pt-6">
            <h2 className="text-xl font-Space-Grotesk font-semibold">
              Benefits of having an account
            </h2>
          </div>
          <div className="flex flex-col w-96 self-center pt-3 space-y-2 text-lg">
            <div className="flex flex-row space-x-2">
              <CheckCircleIcon className="w-6 h-7 text-green-600" />
              <span className="inline">No ads</span>
            </div>
            <div className="flex flex-row space-x-2 border-t pt-2">
              <CheckCircleIcon className="w-6 h-7 text-green-600" />
              <span className="inline">
                Earn $DFNT tokens by reading everyday (?)
              </span>
            </div>
            <div className="flex flex-row space-x-2 border-t pt-2">
              <CheckCircleIcon className="w-6 h-7 text-green-600" />
              <span className="inline">Commenting on posts</span>
            </div>
            <div className="flex flex-row space-x-2 border-t pt-2">
              <CheckCircleIcon className="w-8 h-8 text-green-600" />
              <span className="inline">
                Content filters to adjust what you wish to read every day
              </span>
            </div>
            <div className="flex flex-row space-x-2 border-t pt-2">
              <CheckCircleIcon className="w-9 h-8 text-green-600" />
              <span className="inline">
                Access to future feature releases: mobile app, tools, and more
              </span>
            </div>
            <div className="flex flex-row space-x-2 border-t pt-2 ">
              <CheckCircleIcon className="w-6 h-7 text-green-600" />
              <span className="inline"> Invite to our Discord community</span>
            </div>
            <div className="flex flex-row space-x-2 border-t py-2 border-b ">
              <CheckCircleIcon className="w-14 h-7 text-green-600" />
              <span className="inline">
                {" "}
                Exclusive discount coupon codes with crypto services like
                Ledger, Nansen.ai, Glassnode, and more{" "}
              </span>
            </div>
          </div> */}
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

export default SignUp;

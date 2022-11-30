import { ChevronLeftIcon, HomeIcon } from "@heroicons/react/outline";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { Session, User } from "@supabase/supabase-js";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEventHandler, useEffect, useState } from "react";
import { ErrorAlert } from "../components/Alert/ErrorAlert";
import { NoteAlert } from "../components/Alert/NoteAlert";
import { SuccessAlert } from "../components/Alert/SuccessAlert";
import { Header } from "../components/Header";
import { getUser } from "../lib/users";
import { supabase } from "../utils/supabase";

const Recovery = () => {
  const [state, setState] = useState<"default" | "resetting">("default");
  const [userExists, setUserExists] = useState<User | null>();
  const [sessionStatus, setSessionStatus] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  const router = useRouter();
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: "",
    content: "",
  });

  // useEffect(() => {
  //   // console.log(props?.router?.query.reset);
  //   // if (props?.router?.query.reset === "success") {
  //   //   setMessage({ type: "success", content: "Password reset successfully" });
  //   // }

  //   // getUser().then((user) => {
  //   //   setUserExists(user)
  //   //   console.log(user)
  //   // })

  // }, []);

  const handleRecovery: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (newPassword !== newPasswordRepeat) {
      setMessage({
        type: "error",
        content: "The passwords do not match. Try again",
      });
      return;
    }
    setState("resetting");

    if (sessionStatus) {
      await supabase.auth
        .updateUser({
          data: {
            password: newPassword,
          },
        })
        .then((data: any) => {
          router.push(
            {
              pathname: "/",
              query: { reset: "success" },
            },
            "/"
          );
          console.log("password reset successfully", data);
        })
        .catch((error: any) => {
          setMessage({
            type: "error",
            content:
              "Token has expired. Request again for new password instructions.",
          });
          console.log(error);
          setState("default");
        });
    } else {
      setMessage({
        type: "error",
        content: "Missing access token",
      });
    }
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        console.log("PASSWORD_RECOVERY", session);
        setSessionStatus(session?.access_token);
      }
    });

    getUser().then((user) => {
      setUserExists(user);
      console.log(user);
    });

    if(!sessionStatus && userExists) {
      router.push("/")
    }


  }, []);

  return (
    <div className="min-h-screen">
      <Head>
        {/* TODO:Change below title */}
        <title>Password Recovery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex min-h-screen px-4 py-4 space-x-8 bg-slate-50 justify-center ">
        <div className="flex flex-1 flex-col lg:w-9/12 h-6/12 overflow-hidden flex-wrap">
          <div className="flex justify-center">
            {/* Page title */}
            <h2 className="font-Space-Grotesk text-2xl xl:text-3xl font-semibold mt-2">
              Password Recovery
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
              <SuccessAlert message={message.content} />
            </>
          )}

          <div className="flex flex-col bg-slate-100 w-96 py-4 mt-6 p-8 rounded-md border border-slate-200 justify-center self-center">
            <form onSubmit={handleRecovery}>
              <p className="text-black ">Password</p>
              <input
                type="password"
                className="border rounded text-gray-600 my-2 px-4 py-1 w-full"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                size={30}
                id="password"
                required
              />
              <p className="text-black mt-3">Repeat Password</p>
              <input
                type="password"
                className="border rounded text-gray-600 my-2 px-4 py-1 w-full"
                placeholder="Enter your email"
                value={newPasswordRepeat}
                onChange={(e) => setNewPasswordRepeat(e.target.value)}
                size={30}
                id="passwordRepeat"
                required
              />
              <div className="flex justify-center flex-1 mt-2">
                <button
                  className="bg-blue-500 hover:bg-blue-800 shadow text-white font-bold my-2 py-2 px-2 rounded focus:ring-2 focus:outline-blue-300 align-middle self-center w-full disabled:transform-none disabled:transition-none disabled:bg-slate-400 disabled:cursor-not-allowed disabled:text-white"
                  onClick={() => handleRecovery}
                  type="submit"
                  disabled={!newPassword.length || !newPasswordRepeat.length}
                >
                  {" "}
                  Reset Password
                </button>
              </div>
            </form>
          </div>

          <div className="group flex w-96 self-center mt-4 justify-center border py-4 rounded-lg bg-white border-slate-400 cursor-pointer ">
            <span className="">
              Clicked here by accident?{" "}
              <span className="border-gray-300 group-hover:underline text-blue-400">
                <Link href="/login">
                  <a>Log in here</a>
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
    </div>
  );
};

export default Recovery;

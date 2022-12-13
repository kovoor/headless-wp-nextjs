import { User } from "@supabase/supabase-js";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { FormEvent, useEffect, useState } from "react";
import { ErrorAlert } from "../../components/Alert/ErrorAlert";
import { NoteAlert } from "../../components/Alert/NoteAlert";
import { SuccessAlert } from "../../components/Alert/SuccessAlert";
import { Header } from "../../components/Header";
import { supabase } from "../../utils/supabase";
import { useRouter } from "next/router";
import { getAuthors } from "../../lib/userQueryFunctions";
import { getUser } from "../../lib/userSupabaseFunctions";

export const UserProfile = ({ data, isAuthor }: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userExists, setUserExists] = useState<User | null>();
  const [close, setClose] = useState<boolean>();
  // const [message, setMessage] = useState<{ type?: string; content?: string }>({
  //   type: "",
  //   content: "",
  // });
  const [message, setMessage] = useState<{
    type?: string;
    status?: boolean;
    content?: string;
  }>({
    type: "",
    content: "",
  });

  const router = useRouter();

  useEffect(() => {
    getUser().then((user) => {
      setUserExists(user);
    });

    // supabase.auth.onAuthStateChange((event, session) => {
    //   if (event == "USER_UPDATED") console.log("USER_UPDATED", session);
    // });
  }, [userExists]);

  const handleEmailChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      await supabase.auth
        .updateUser({ email: email })
        .then((data) => {
          console.log(data);
          setMessage({
            type: "note",
            status: false,
            content: "Check your email for the confirmation link.",
          });
          setClose(false);

        })
        .catch((error) => {
          console.log(error);
          setMessage({
            type: "error",
            status: false,
            content: `${error}`,
          });
          setClose(false);

        });
    }
  };

  const handlePasswordChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password) {
      await supabase.auth
        .updateUser({
          password: password,
        })
        .then((data) => {
          // router.reload()
          console.log(data);
          setMessage({
            type: "success",
            status: false,
            content: "Password changed successfully.",
          });
          setClose(false);

        })
        .catch((error) => {
          setMessage({
            type: "error",
            status: false,
            content: `${error}`,
          });
          setClose(false);

        });
    }
  };

  const handleUsernameChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username) {
        await supabase.auth
          .updateUser({
            data: {
              username: username,
            },
          })
          .then((data) => {
            // setClose(false)
            if(data.error != null) {
              console.log(data.error)
              setMessage({
                type: "error",
                status: false,
                content: `This username is unavailable.`,
              });
              setClose(false);
            } else {
              router.push(`/profile/${username}`)
              setMessage({
                type: "success",
                status: false,
                content: "Username changed successfully.",
              });
              setClose(false);
            }
          })
          .catch((error) => {
            console.log(error)
            setMessage({
              type: "error",
              status: false,
              content: `${error}`,
            });
            setClose(false);
          });
      }
  };

  return (
    <div className="">
      <Head>
        {/* TODO:Change below title */}
        <title>Username Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="min-h-screen bg-slate-50 flex flex-col flex-1 items-center pt-10">
        {/* Avatar pic */}
        {message.type === "error" && (
          <div className="flex justify-center">
            <ErrorAlert message={message.content} status={close} setFunction={setClose}/>
          </div>
        )}

        {message.type === "note" && (
          <div className="flex justify-center">
            <NoteAlert message={message.content} status={close} setFunction={setClose}/>
          </div>
        )}

        {message.type === "success" && (
          <div className="flex justify-center">
            <SuccessAlert
              message={message.content}
              status={close}
              setFunction={setClose}
            />
          </div>
        )}

        {/* TODO: Add profile image capabilities (v2) */}
        {/* <img
          className="w-44 h-44 object-cover rounded-full bg-slate-400"
          src="/my-pic.png"
        /> */}

        <div className="flex space-x-2 ">
          {isAuthor && (
            <div className="w-fit bg-gray-200 px-2 justify-center items-center rounded-lg">
              <span className="text-xs text-black font-Space-Grotesk font-semibold">
                {isAuthor ? "Author" : ""}
              </span>
            </div>
          )}

          <div className="w-fit bg-gray-200 pb-1 px-2 justify-center items-center rounded-lg">
            <span className="text-xs text-black font-Space-Grotesk font-semibold">
              {data[0].email_confirmed_at !== null
                ? "Verified email"
                : "Unverified Email"}
            </span>
          </div>
        </div>

        {/* {data[0].email_confirmed_at === null && (
          <>
            <button
              className="bg-blue-400 hover:bg-blue-700 shadow text-white font-bold my-2 py-2 px-2 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => handleResendEmailConfirm}
            >
              {" "}
              Change
            </button>
          </>
        )} */}

        {/* Username */}
        <div className="flex space-x-2">
          <h2 className="text-2xl font-Space-Grotesk font-semibold mt-6">
            {/* @{userIsLoggedIn?.user_metadata.username} */}
            {data[0] ? "@" + data[0]?.username : "User not found"}
          </h2>
          {/* <button>
            <PencilAltIcon className="w-6 h-8 mt-6" />
          </button> */}
        </div>

        {userExists?.user_metadata.username == data[0]?.username &&
        userExists != null ? (
          <div className="flex w-fit flex-col items-left border p-4 mt-8 rounded-md bg-slate-100">
            {/* Change Username */}
            <form onSubmit={handleUsernameChange} method="POST">
              <h3 className="text-lg font-Space-Grotesk font-semibold">
                Change username
              </h3>
              <div className="flex space-x-2">
                <div className="flex justify-center space-x-3 w-full">
                  <input
                    className="shadow border rounded w-full text-gray-600 my-2 px-4 py-1"
                    type="username"
                    size={15}
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Enter new username"
                  />
                  <button
                    className="bg-blue-400 hover:bg-blue-700 shadow text-white font-bold my-2 py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    onClick={() => handleUsernameChange}
                  >
                    {" "}
                    Change
                  </button>
                </div>
              </div>
            </form>

            {/* Change password form */}
            <form onSubmit={handlePasswordChange} method="POST">
              <h3 className="text-lg font-Space-Grotesk font-semibold mt-8">
                Change password
              </h3>
              <div className="flex space-x-2">
                <div className="flex justify-center space-x-3 w-full">
                  <input
                    className="shadow border rounded text-gray-600 my-2 px-4 py-1 w-full"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter new password"
                  />
                  <button
                    className="bg-blue-400 hover:bg-blue-700 shadow text-white font-bold my-2 py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    onClick={() => handlePasswordChange}
                  >
                    {" "}
                    Change
                  </button>
                </div>
              </div>
            </form>

            {/* Change email form */}
            <form onSubmit={handleEmailChange} method="POST">
              <h3 className="text-lg font-Space-Grotesk font-semibold mt-8">
                Change email
              </h3>
              <div className="flex space-x-2">
                <div className="flex justify-center space-x-3 w-full">
                  <input
                    className="shadow border rounded text-gray-600 my-2 px-4 py-1 w-full"
                    type="email"
                    size={30}
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter new email"
                  />
                  <button
                    className="bg-blue-400 hover:bg-blue-700 shadow text-white font-bold my-2 py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    onClick={() => handleEmailChange}
                  >
                    {" "}
                    Change
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", context.query.username);

  console.log(data);

  const authors = await getAuthors();

  const result: any = authors?.find(
    (o: any) => o.key === context.query.username
  );

  const author = result?.value === "author" ? true : false;

  if (author) {
    return {
      props: { data, isAuthor: true },
    };
  } else {
    return {
      props: { data },
    };
  }
};

export default UserProfile;

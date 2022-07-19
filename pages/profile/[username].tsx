import { User } from "@supabase/supabase-js";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { FormEvent, useEffect, useState } from "react";
import { ErrorAlert } from "../../components/Alert/ErrorAlert";
import { NoteAlert } from "../../components/Alert/NoteAlert";
import { SuccessAlert } from "../../components/Alert/SuccessAlert";
import { Header } from "../../components/Header";
import { supabase } from "../../utils/supabase";

export const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userExists, setUserExists] = useState<User | null>()
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: "",
    content: "",
  });

  useEffect(()=>{
    const user = supabase.auth.user();
    setUserExists(user)
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == 'USER_UPDATED') console.log('USER_UPDATED', session)
    })
  }, [])

  const handleChangeUserDetails = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email) {
      await supabase.auth.update({ email: email }).then((data) => {
        setMessage({
          type: "note",
          content: "Check your email for the confirmation link.",
        });
      }).catch((error) => {
        setMessage({
          type: "error",
          content: `${error}`,
        });
      });
      // console.log(user, error)
    } else if (password) {
      await supabase.auth.update({
        password: password,
      }).then((data) => {
        setMessage({
          type: "success",
          content: "Password changed successfully.",
        });
      }).catch((error) => {
        setMessage({
          type: "error",
          content: `${error}`,
        });
      });
      // console.log(user, error)
    } else if (username) {
       await supabase.auth.update({
        data: {
          username: username,
        },
      }).then((data) => {
        setMessage({
          type: "success",
          content: "Username changed successfully.",
        });
      }).catch((error) => {
        setMessage({
          type: "error",
          content: `${error}`,
        });
      });
      // console.log(user, error)
  };
}
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

        {/* TODO: Add profile image capabilities (v2) */}
        {/* <img
          className="w-44 h-44 object-cover rounded-full bg-slate-400"
          src="/my-pic.png"
        /> */}

        {/* Username */}
        <div className="flex space-x-2">
          <h2 className="text-2xl font-Space-Grotesk font-semibold mt-6">
            @{userExists?.user_metadata.username}
          </h2>
          {/* <button>
            <PencilAltIcon className="w-6 h-8 mt-6" />
          </button> */}
        </div>

        {userExists ? (
          <div className="flex w-fit flex-col items-left border p-4 mt-8 rounded-md bg-slate-100">
            {/* Change Username */}
            <form onSubmit={handleChangeUserDetails} method="POST">
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
                    onClick={() => handleChangeUserDetails}
                  >
                    {" "}
                    Change
                  </button>
                </div>
              </div>
            </form>

            {/* Change password form */}
            <form onSubmit={handleChangeUserDetails} method="POST">
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
                  onClick={() => handleChangeUserDetails}
                >
                  {" "}
                  Change
                </button>
              </div>
            </div></form>

            {/* Change email form */}
            <form onSubmit={handleChangeUserDetails} method="POST">
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
                  onClick={() => handleChangeUserDetails}
                >
                  {" "}
                  Change
                </button>
              </div>
            </div></form>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const vaar = "hello world"
  return {
    props: {}
  };
}

export default UserProfile;

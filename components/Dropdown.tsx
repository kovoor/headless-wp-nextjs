import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/solid";
import { supabase } from "../utils/supabase";
import router from "next/router";
import Link from "next/link";
import { Session, User } from "@supabase/supabase-js";
import { getSession, getUser, signOutUser } from "../lib/userSupabaseFunctions";

// const handleSignOut = async () => {
//   signOutUser().then((data) => {
//     console.log(data)
//   }).catch((error) => console.log(error))
// };

// const handleClick = (event: Event) => {
//   router.push("/profile/jakekovoor");
// };

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};

const LoggedInUserDropdown = () => {
  return (
    <Menu.Button className="justify-center w-full rounded-full shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
      {/* TODO: Add profile image capabilities (v2) */}
      {/* <img
              className={`object-cover w-8 h-8 sm:w-10 sm:h-10 rounded-full inline
              }`}
              src="/my-pic.png"
              alt="Profile picture" /> */}

      <UserCircleIcon className="w-10 h-10 text-slate-500" />
      {/* <ChevronDownIcon className={`-mr-1 ml-2 h-5 w-5 ${user ? 'hidden' : 'inline'}`} aria-hidden="true" /> */}
    </Menu.Button>
  );
};

const NotLoggedInUserDropdown = () => {
  return (
    <Link href="/login" passHref prefetch={false}>
      <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
        <div className="text-sm sm:text-base font-semibold">Log in</div>
        {/* <ChevronDownIcon className={`-mr-1 ml-2 h-5 w-5 ${user ? 'hidden' : 'inline'}`} aria-hidden="true" /> */}
      </Menu.Button>
    </Link>
  );
};

const Dropdown = ({user}: any) => {
  const [userExists, setUserExists] = useState<User | null>();
  const [sessionExists, setSessionExists] = useState<Session | null>()
  const [show, setShow] = useState(false)

  useEffect(() => {
    getUser().then((user) => {
      setUserExists(user)
    })

    // getSession().then(({session}) => {
    //   setSessionExists(session)
    // }) 
  }, [userExists]);
  

  return (
    <Menu
      as="div"
      className="relative inline-block text-left font-Space-Grotesk font-semibold"
    >
      <div>
        {userExists !== null && userExists !== undefined ? (
          <LoggedInUserDropdown />
        ) : (
          <NotLoggedInUserDropdown />
        )}
      </div>

      {userExists ? (
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right mt-1 absolute right-0 w-56 rounded-md shadow-lg font-Space-Grotesk font-semibold  bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div >
              <Link href={`/profile/${userExists.user_metadata.username}`} passHref>
                <Menu.Item >
                  {({ active }) => (
                    <button
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900 border-solid border-b-2" : "text-gray-700",
                        "block w-full text-left px-4 py-3 text-sm border-solid border-b-2"
                      )}
                    >
                      Account settings
                    </button>
                  )}
                </Menu.Item>
              </Link>
              {/* <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Toggle dark mode
                  </div>
                )}
              </Menu.Item> */}
              {/* <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Support
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  License
                </a>
              )}
            </Menu.Item> */}
              {/* <form method="POST" action="#"> */}
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="submit"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900 " : "text-gray-700",
                        "block w-full text-left px-4 py-3 text-sm font-semibold"
                      )}
                      onClick={async () => {await supabase.auth.signOut(); router.reload()}}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              {/* </form> */}
            </div>
          </Menu.Items>
        </Transition>
      ) : (
        <></>
      )}
    </Menu>
  );
};

export default Dropdown;

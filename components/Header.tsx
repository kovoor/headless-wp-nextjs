import React from "react";
import { UserCircleIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { supabase } from "../utils/supabase";
import Router, { useRouter } from "next/router";
import Dropdown from "./Dropdown";

export const Header = () => {
  const user = supabase.auth.user();
  return (
    <div className="flex items-center sticky top-0 shadow-md px-4 sm:px-4 md:px-4 lg:px-4 py-2 z-10 bg-white">
      {/* Logo */}
      <div className="flex">
        <h1 className="text-lg sm:text-2xl font-Space-Grotesk font-semibold cursor-pointer">
          <Link href="/" prefetch={false}>
            Defiants
          </Link>
        </h1>
      </div>

      {/* Tabs – Discover, Updates, Blog, Discord */}
      <div className="flex text-sm sm:text-base font-semibold justify-center grow md:space-x-6 space-x-4 text-slate-500 font-Space-Grotesk">
        <span className="hover:underline hover:text-black cursor-pointer">
          <Link href="/" prefetch={false}>
            Home
          </Link>
        </span>
        {/* <span className="hover:underline hover:text-black cursor-pointer">
          <Link href="/" prefetch={false}>
            Updates
          </Link>
        </span> */}
        <span className="hover:underline hover:text-black cursor-pointer">
          <Link href="/category/news" prefetch={false}>
            News
          </Link>
        </span>
        <span className="hover:underline hover:text-black cursor-pointer">
          <Link href="/category/guides" prefetch={false}>
            Guides
          </Link>
        </span>
        {/* <span className="hover:underline hover:text-black cursor-pointer">
          <Link href="/category/guides" prefetch={false}>
            Blog
          </Link>
        </span> */}

        {/* Add hover menu with submenu  https://codesandbox.io/s/tailwind-dropdown-with-group-hover-gm9k9 */}

        <span className="hover:underline hover:text-black cursor-pointer">
          <a href="https://discord.com/invite/minecraft">Discord</a>
        </span>
      </div>

      {/* TODO: Add working dropdown */}
      <Dropdown />
    </div>
  );
};

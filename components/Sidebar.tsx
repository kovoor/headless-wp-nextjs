import Link from "next/link";
import React from "react";
import { SidebarPost } from "./SidebarPost";

export const Sidebar = () => {
  return (
    <div className="hidden lg:flex lg:flex-col w-3/12">
      <div className='text-center'>
        <h2 className='text-2xl font-bold font-Space-Grotesk'>Guides</h2>
      </div>

      {/* Posts vertically – 4 */}
      <div className="flex flex-col space-y-1 mt-4">
      <Link href="/post/1/hello-world" prefetch={false}><a><SidebarPost /></a></Link>
      <Link href="/post/1/hello-world" prefetch={false}><a><SidebarPost /></a></Link>
      <Link href="/post/1/hello-world" prefetch={false}><a><SidebarPost /></a></Link>
      </div>
      {/* Button for More – link to guides page*/}
    </div>
  );
};

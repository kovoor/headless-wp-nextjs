import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="flex px-6 py-2 border-t justify-between">
      {/* Logo */}
      <div className="flex flex-1 flex-col justify-center lg:items-center">
          <h2 className="text-xl font-semibold">Defiants.io</h2>
          <p className="text-xs">Part of Kovoor Media</p>
      </div>

      {/* Footer Menu 1 – Terms of Use, Privacy Policy, Cookie Policy, Contact */}
      <div className="flex list-disc flex-1 border-l justify-center">
        <div className="flex flex-col text-slate-500 text-xs sm:text-sm lg:text-sm">
          <span className="hover:underline hover:text-black cursor-pointer"><Link href='/terms-of-use'>Terms of Use</Link></span>
          <span className="hover:underline hover:text-black cursor-pointer"><Link href='/privacy-policy'>
            Privacy Policy</Link>
          </span>
          <span className="hover:underline hover:text-black cursor-pointer"><Link href='/cookie-policy'>
            Cookie Policy</Link>
          </span>
          <span className="hover:underline hover:text-black cursor-pointer"><Link href='/contact'>Contact</Link></span>
        </div>
      </div>

      {/* Footer Menu 2 – About, Tip Us, Jobs, Advertise with Us */}
      <div className="flex list-disc flex-1 border-l justify-center">
        <div className="flex flex-col text-slate-500 text-xs sm:text-sm lg:text-sm">
          <span className="hover:underline hover:text-black cursor-pointer"><Link href='/about'>About</Link></span>
          <span className="hover:underline hover:text-black cursor-pointer"><Link href='/tip-us'>Tip Us</Link></span>
          <span className="hover:underline hover:text-black cursor-pointer"><Link href='/jobs'>Jobs</Link></span>
          <span className="hover:underline hover:text-black cursor-pointer"><Link href='/advertise'>
            Advertise with Us</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

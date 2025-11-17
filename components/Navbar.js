"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
const Navbar = () => {
  const { data: session } = useSession();
  const [showDropdown, setshowDropdown] = useState(false);

  return (
    <nav className="bg-black/25 text-white flex justify-between p-3 px-5 items-center">
      <Link href={"/"} className="logo font-bold text-xl">Patrify</Link>
        <div className="relative">
          {session && (
            <>
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-80 cursor-pointer"
                type="button"
                onClick={() => setshowDropdown(!showDropdown)}
                // onBlur={() => setshowDropdown(false)}
              >
                Welcome, {session.user.name.split(" ")[0]}{" "}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {/* <!-- Dropdown menu --> */}
              <div
                id="dropdown"
                className={`z-10 ${showDropdown ? "" : "hidden"} absolute right-[-2] bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/profile/${session.user.username}`}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Your Page
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => signOut({callbackUrl: "/login"})}
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}
          {!session && (
            <Link href={"/login"}>
              <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-linear-to-br from-neutral-950 to-(--bg-gradient-start) group-hover:from-neutral-950 group-hover:to-(--bg-gradient-start) hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-(--bg-gradient-start) dark:focus:ring-(--bg-gradient-start)">
                <span className="text-md font-bold relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-(--bg-gradient-start) rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                  Login
                </span>
              </button>
            </Link>
          )}
        </div>
    </nav>
  );
};

export default Navbar;

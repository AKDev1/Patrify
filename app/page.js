"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    // redirect('/dashboard');
  }
  return (
    <>
      <div className="flex flex-col min-h-[40vh] w-full justify-center items-center gap-y-10">
        <div className="flex flex-col items-center px-5 md:px-0 gap-2">
          <div className="font-bold text-6xl">Patrify</div>
          <p className="text-center">
            A crowdfunding platform for creators. Get funded by your fans and
            followers. Start now from below!
          </p>
        </div>
        <div>
          <Link href="/login" >
            <button className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-neutral-950 to-(--bg-gradient-start) group-hover:from-neutral-950 group-hover:to-(--bg-gradient-start) hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-(--bg-gradient-start) dark:focus:ring-(--bg-gradient-start)">
              <span className="text-md font-bold relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-(--bg-gradient-start) rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Start Now
              </span>
            </button>
          </Link>
          <Link href="/about" >
            <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-neutral-950 to-(--bg-gradient-start) group-hover:from-neutral-950 group-hover:to-(--bg-gradient-start) hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-(--bg-gradient-start) dark:focus:ring-(--bg-gradient-start)">
              <span className="text-md font-bold relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-(--bg-gradient-start) rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Read More
              </span>
            </button>
          </Link>
        </div>
      </div>
      <div className="partition h-1 opacity-20 bg-(--bg-gradient-start)"></div>
      <div className="flex flex-col items-center py-15">
        <h2 className="text-3xl font-bold mb-15 text-center">Your fans can be your Patrons!</h2>
        <section className="flex w-3/4 flex-col md:flex-row items-center gap-10 md:gap-0">
          <div className="flex flex-col items-center gap-5 w-full md:w-1/3">
            <img src="/man.gif" alt="" className="bg-(--bg-gradient-start) rounded-full w-1/4" />
            <p className="text-xl font-bold">Fund Yourself</p>
            <p>Your fans want to help you</p>
          </div>
          <div className="flex flex-col items-center gap-5 w-full md:w-1/3">
            <img src="/coin.gif" alt="" className="bg-(--bg-gradient-start) rounded-full w-1/4" />
            <p className="text-xl font-bold">Fund Yourself</p>
            <p>Your fans want to help you</p>
          </div>
          <div className="flex flex-col items-center gap-5 w-full md:w-1/3">
            <img src="/group.gif" alt="" className="bg-(--bg-gradient-start) rounded-full w-1/4" />
            <p className="text-xl font-bold">Fans want to help</p>
            <p>Your fans are available to help you</p>
          </div>
        </section>
      </div>

      <div className="partition h-1 opacity-20 bg-(--bg-gradient-start)"></div>
      {/* <div className="flex flex-col items-center py-15">
        <h2 className="text-3xl font-bold mb-15">Learn more about US</h2>
        <section className="flex w-3/4 justify-center">
          <div className="flex flex-col items-center gap-5 w-1/3">
            <img src="/man.gif" alt="" className="bg-(--bg-gradient-start) rounded-full w-1/4" />
            <p className="text-xl font-bold">Fund Yourself</p>
            <p>Your fans want to help you</p>
          </div>
          <div className="flex flex-col items-center gap-5 w-1/3">
            <img src="/coin.gif" alt="" className="bg-(--bg-gradient-start) rounded-full w-1/4" />
            <p className="text-xl font-bold">Fund Yourself</p>
            <p>Your fans want to help you</p>
          </div>
          <div className="flex flex-col items-center gap-5 w-1/3">
            <img src="/group.gif" alt="" className="bg-(--bg-gradient-start) rounded-full w-1/4" />
            <p className="text-xl font-bold">Fans want to help</p>
            <p>Your fans are available to help you</p>
          </div>
        </section>
      </div> */}
    </>
  );
}

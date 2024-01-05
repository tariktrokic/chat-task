import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Chat Task</title>
        <meta name="description" content="Chat task app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="from-teal-dark to-teal-light flex min-h-screen flex-col items-center justify-center bg-gradient-to-b text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Welcome to Chat Task!
          </h1>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs items-center justify-center rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/signup"
            >
              Sign up
            </Link>

            <button
              className="flex max-w-xs cursor-pointer items-center justify-center rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
              {sessionData ? "Log out" : "Log in"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

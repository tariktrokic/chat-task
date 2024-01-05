import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import router from "next/router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = async () => {
    await axios.post("/api/signup", {
      email,
      password,
    });
    router.push("/");
  };

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
            Sign up
          </h1>

          <form className="flex flex-col gap-4">
            <label>Email:</label>
            <input
              type="email"
              className="rounded-xl bg-white/10 p-4 "
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>

            <label>Password:</label>
            <input
              type="password"
              className="rounded-xl bg-white/10 p-4 "
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>

            <input
              type="submit"
              className="flex max-w-xs cursor-pointer items-center justify-center rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              onClick={(e) => {
                e.preventDefault();
                createUser();
              }}
            />
          </form>
        </div>
      </main>
    </>
  );
}

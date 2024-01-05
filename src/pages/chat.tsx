import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

let socket;

export default function Chat() {
  const { data: sessionData } = useSession();
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const socketInitializer = async () => {
    await fetch("/api/socket");

    socket = io();
    socket.emit("register", sessionData?.user.id);

    socket.on("receive-message", (data) => {
      setMessages((pre) => [...pre, data]);
    });
  };

  const getAllUsers = async () => {
    const allUsers = await axios.get("/api/users");
    setUsers(allUsers.data);
  };

  useEffect(() => {
    // Can run in parallel
    socketInitializer();
    getAllUsers();

    return () => {
      socket?.disconnect();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!selectedUser) {
      return;
    }

    socket.emit("send-message", {
      senderId: sessionData?.user.id,
      receiverId: selectedUser?.id,
      message: currentMessage,
    });

    setCurrentMessage("");
  };

  console.log(users);

  return (
    <>
      <Head>
        <title>Chat Task</title>
        <meta name="description" content="Chat task app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="from-teal-dark to-teal-light flex min-h-screen flex-col items-center bg-gradient-to-b text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Chat
          </h1>

          <div className="flex w-full flex-1 flex-row">
            <div className="basis-1/5 bg-white">
              {users?.map((user) => (
                <p
                  className="cursor-pointer border-b-2 border-solid border-black p-4 text-black"
                  onClick={() => setSelectedUser(user)}
                >
                  {user.email}
                </p>
              ))}
            </div>

            <div className="flex basis-4/5 flex-col border-2 border-solid border-black">
              <p className="text-center">{selectedUser?.email}</p>
              <div className="flex flex-col">
                {messages.map(({ senderId, message }, index) => (
                  <div key={index}>
                    {senderId}: {message}
                  </div>
                ))}
              </div>

              <form onSubmit={sendMessage} className="mt-auto">
                <input
                  name="message"
                  placeholder="enter your message"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  autoComplete={"off"}
                  className="w-full text-black"
                />
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

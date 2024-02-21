"use client";

import Link from "next/link";
import { FiLogOut, FiLoader, FiLock } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { status, data } = useSession();

  async function handleLogin() {
    await signIn();
  }

  async function handleLogout() {
    await signOut();
  }

  return (
    <header className="w-full mx-auto mt-[10px] flex items-center px-2 py-4 h-20 bg-inherit">
      <div className="w-11/12 flex items-center justify-between max-w-7x1 mx-auto bg-white p-5 shadow-sm rounded">
        <Link href={"/"}>
          <h1 className="font-bold text-2x1 hover:tracking-widest duration-300 text-zinc-900">
            Adress
            <span className="text-purple-700"> SignUp</span>
          </h1>
        </Link>

        {status === "loading" && (
          <button className="animate-spin">
            <FiLoader size={26} color="rgb(24,24,27)" />
          </button>
        )}

        {status === "unauthenticated" && (
          <button className="flex justify-center items-center" onClick={handleLogin}>
            <FiLock size={26} color="rgb(24,24,27)" />
            <h3 className="ml-1">Entrar</h3>
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex gap-x-4 items-baseline">
            <Link href={"/adresses"} className="flex justify-center items-center hover:scale-110 duration-300 cursor-pointer">
              <FaHome size={24} color="rgb(24,24,27)" />
              <h3 className="ml-1">Endereços</h3>
            </Link>

            <button className="flex justify-center items-center hover:scale-110 duration-300 cursor-pointer" onClick={handleLogout}>
              <FiLogOut size={24} color="#ff3a13" />
              <h3 className="ml-1">Sair</h3>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

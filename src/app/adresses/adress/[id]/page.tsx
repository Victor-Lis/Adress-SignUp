import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

type Params = {
  id: string | undefined;
};

export default async function Adress({ params }: { params: Params }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !params.id) {
    redirect("/");
  }

  const adress = await prisma.endereco.findFirst({
    where: {
        uid: params.id,
    }
  })
  .then((endereco) => { 
    endereco ? endereco : redirect("/adresses")
  })
  .catch((e) => {
    redirect("/adresses")
  })

  return (
    <main className="w-full flex flex-col justify-start min-h-[calc(100vh-90px)] bg-zinc-900">
      <div className="w-11/12 mx-auto p-5">
        <h2>{params.id}</h2>
      </div>
    </main>
  );
}

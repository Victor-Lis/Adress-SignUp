"use server"

import React from "react";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Button from "./components/Button";

type Params = {
  id: string | undefined;
};

export default async function Adress({ params }: { params: Params }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !params.id) {
    redirect("/");
  }

  const adress = await prisma.endereco
    .findFirst({
      where: {
        uid: params.id,
      },
    })
    .then((endereco) => {
      if (!endereco) redirect("/adresses");
      return endereco;
    })
    .catch((e) => {
      redirect("/adresses");
    });

  async function deleteAdress(id: string){
    await prisma.endereco.delete({
      where: {
        uid: id,
      }
    })
    .then(() => { 
      redirect("/adresses")
    })
    .catch((e) => console.log(e))
  }

  return (
    <main className="w-full flex flex-col justify-start min-h-[calc(100vh-90px)] bg-zinc-900">
      <div className="w-11/12 mx-auto p-5">
        <header className="w-full flex items-center justify-start">
          <h2 className="text-blue-600 text-3xl py-2 px-5 bg-white rounded">{adress.cep}</h2>
        </header>
        <div className="grid grid-cols-3 mt-5">
          <h3 className="bg-white m-2 text-center p-2 rounded"><strong>Logradouro </strong>{adress.logradouro}</h3>
          <h3 className="bg-white m-2 text-center p-2 rounded"><strong>Bairro </strong>{adress.bairro}</h3>
          <h3 className="bg-white m-2 text-center p-2 rounded"><strong>Localidade </strong>{adress.localidade}</h3>
          <h3 className="bg-white m-2 text-center p-2 rounded"><strong>Estado </strong>{adress.uf}</h3>
          <h3 className="bg-white m-2 text-center p-2 rounded"><strong>DDD </strong>{adress.ddd}</h3>
          <h3 className="bg-white m-2 text-center p-2 rounded"><strong>IBGE </strong>{adress.ibge}</h3>
          <h3 className="bg-white m-2 text-center p-2 rounded"><strong>SIAFI </strong>{adress.siafi}</h3>
        </div>
      </div>
    </main>
  );
}

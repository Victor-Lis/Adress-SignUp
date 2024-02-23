"use server"

import { AdressType } from "@/@types/AdressType";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function createAdress({
  cep,
  uf,
  localidade,
  logradouro, 
  bairro,
  ddd,
  ibge,
  siafi,
}: {
  cep: string,
  uf: string,
  localidade: string,
  logradouro: string, 
  bairro: string,
  ddd: string,
  ibge: string,
  siafi: string,
}): Promise<AdressType>{
  const session = await getServerSession(authOptions);

  const adress = await prisma.endereco.create({
    data: {
       cep,
       uf,
       localidade,
       logradouro, 
       bairro,
       ddd,
       ibge,
       siafi,
       user: {
        connect: {
          email: session?.user?.email as string
        }
       }
    },
  });

  return adress as AdressType;
}
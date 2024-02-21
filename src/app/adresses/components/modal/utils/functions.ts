"use server";

import prisma from "@/lib/prisma";
import { AccountProps } from "@/@types/account";

//
async function getEmailWithoutSignUp(): Promise<AccountProps[]> {
  try {
    const contas = await prisma.user.findMany();
    const professores = await prisma.professor.findMany({
      where: {
        deleted: false,
      },
    });
    const alunos = await prisma.aluno.findMany({
      where: {
        deleted: false,
      },
    });

    const filteredContas = contas.filter((conta) => {
      return (
        !professores.some((prof) => prof.email === conta.email) &&
        !alunos.some((aluno) => aluno.email === conta.email)
      );
    });

    console.log(filteredContas)
    return filteredContas;
  } catch (error) {
    console.error("Error fetching emails:", error);
    throw error; // Re-throw to allow proper error handling elsewhere
  }
}

async function createAluno({
  nome,
  email,
}: {
  nome: string;
  email: string;
}) {
  const aluno = await prisma.aluno.create({
    data: {
      nome,
      email,
    },
  });

  return aluno;
}

async function updateAluno({
    nome,
    email,
    rm,
  }: {
    nome: string | undefined;
    email: string | undefined;
    rm: number | undefined,
  }) {
    const aluno = await prisma.aluno.update({
      data: {
        nome,
        email: email,
      },
      where: {
        rm,
      }
    });
  
    return aluno;
  }

export { getEmailWithoutSignUp, createAluno, updateAluno };

"use client";
import { useEffect, useState, FormEvent } from "react";
import { createAluno, getEmailWithoutSignUp } from "../../utils/functions";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

export default function EditForm({
  toggleModal,
}: {
  toggleModal: () => void;
}) {
  const [email, setEmail] = useState<string>("");
  const [nome, setNome] = useState<string>("");

  const route = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleCreateAluno(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!!nome && !!email) {
      setLoading(true);
      let novoAluno = await createAluno({
        nome,
        email,
      });

      if (novoAluno) {
        route.refresh();
        toggleModal();
      }
    }
    setLoading(false);
  }

  return (
    <>
      <h2 className="text-green-500 text-2xl w-full">Cadastrar Endereço</h2>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={(e) => handleCreateAluno(e)}
      >
        
      </form>
    </>
  );
}

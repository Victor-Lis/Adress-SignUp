"use client";
import {
  useContext,
  useEffect,
  useState,
  FormEvent,
} from "react";
import { AccountProps } from "@/@types/account";
import { getEmailWithoutSignUp, updateAluno } from "../../utils/functions";
import { useRouter } from "next/navigation";
import { ModalContext } from "../../../../providers/modalProvider";
import { FaSpinner } from "react-icons/fa";

export default function EditForm({ toggleModal }: { toggleModal: () => void }) {
  const { aluno, clearStudent } = useContext(ModalContext);

  const [noSignedUser, setNoSignedUser] = useState<AccountProps[]>([]);
  const [email, setEmail] = useState<string | undefined>(aluno?.email);
  const [nome, setNome] = useState<string | undefined>(aluno?.nome);

  const route = useRouter();

  const [loading, setLoading] = useState(false)

  async function getNoSignedUsers() {
    let data = await getEmailWithoutSignUp();
    setNoSignedUser(data);
  }

  async function handleUpdateAluno(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true)
    let novoAluno = await updateAluno({
      nome,
      email: email,
      rm: aluno?.rm
    });

    if (novoAluno) {
      route.refresh();
      clearStudent();
      toggleModal();
    }
    setLoading(false)
  }

  useEffect(() => {
    getNoSignedUsers();
  }, []);

  return (
    <>
      <h2 className="text-green-500 text-2xl w-full">Atualizar Aluno</h2>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={(e) => handleUpdateAluno(e)}
      >
        <h2 className="mt-8 w-10/12 mx-auto font-bold">Emails disponíveis</h2>
        <select
          className="w-10/12 mx-auto border-b-2 border-b-gray-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        >
          {!!aluno?.email && (
            <option value={aluno?.email}>{aluno?.email}</option>
          )}
          {noSignedUser?.map((user) => {
            return (
              <option key={user.email} value={user.email as string}>
                {user.email}
              </option>
            );
          })}
          <option value=""></option>
        </select>
        <div className="mt-10 w-10/12 mx-auto flex flex-col sm:flex-row md:flex-col items-center justify-between">
          <div className="flex">
            <div className="flex items-center justify-center w-8/12 mt-10 sm:mt-0 md:mt-10">
              <h2 className="mr-2">Nome</h2>
              <input
                type="text"
                className="border-b-2 border-b-gray-300 px-1 w-6/12"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button
            disabled={loading}
            className={
              !loading
                ? "bg-green-500 mt-10 mx-auto py-1 px-5 hover:text-white hover:scale-105 duration-300 rounded"
                : "bg-gray-500 mt-10 mx-auto py-1 px-10 text-white rounded"
            }
          >
            {loading ? (
              <FaSpinner className="animate-spin" color="#fff" size={25} />
            ) : (
              "Atualizar!"
            )}
          </button>
      </form>
    </>
  );
}

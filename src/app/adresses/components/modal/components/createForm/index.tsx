"use client";
import {
  useEffect,
  useState,
  FormEvent,
} from "react";
import { AccountProps } from "@/@types/account";
import { createAluno, getEmailWithoutSignUp } from "../../utils/functions";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

export default function CreateForm(  
{ 
  toggleModal, 
}: 
{ 
  toggleModal: () => void 
}) {
  const [noSignedUser, setNoSignedUser] = useState<AccountProps[]>([]);
  const [email, setEmail] = useState<string>("");
  const [nome, setNome] = useState<string>("");

  const route = useRouter()

  const [loading, setLoading] = useState(false)

  async function getNoSignedUsers() {
    let data = await getEmailWithoutSignUp();
    setNoSignedUser(data);
  }

  async function handleCreateAluno(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!!nome && !!email) {
      setLoading(true)
      let novoAluno = await createAluno({
        nome,
        email,
      });

      if (novoAluno) {
        route.refresh();
        toggleModal()
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    getNoSignedUsers();
  }, []);

  return (
    <>
      <h2 className="text-green-500 text-2xl w-full">Cadastrar Aluno</h2>
      {!!noSignedUser.length && (
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={(e) => handleCreateAluno(e)}
        >
          <h2 className="mt-8 w-10/12 mx-auto font-bold">Emails disponíveis</h2>
          <select
            className="w-10/12 mx-auto border-b-2 border-b-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
            <option value={""}></option>
            {noSignedUser?.map((user) => {
              return (
                <option key={user.email} value={user.email as string}>
                  {user.email}
                </option>
              );
            })}
          </select>
          <div className="mt-10 w-10/12 mx-auto flex flex-col sm:flex-row md:flex-col items-center justify-between">
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
              "Cadastrar!"
            )}
          </button>
        </form>
      )}
      {!noSignedUser.length && (
        <h2 className="my-2 text-red-500">
          Você não tem emails disponíveis...
        </h2>
      )}
    </>
  );
}

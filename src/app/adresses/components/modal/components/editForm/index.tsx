"use client";
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

export default function EditForm({
  toggleModal,
}: {
  toggleModal: () => void;
}) {
  const estados = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  const route = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleEditAdress(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(false);
  }

  return (
    <>
      <h2 className="text-green-500 text-2xl w-full">Cadastrar Endereço</h2>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={(e) => handleEditAdress(e)}
      >
        <div className="flex justify-around items-center w-full flex-wrap my-2">
          <div className="flex justify-center items-center my-1 flex-wrap flex-1">
            <h2 className="text-2xl text-black mx-2">CEP</h2>
            <input
              type="text"
              className="outline-none bg-slate-100 rounded px-2 py-1"
              pattern="^[0-9]{5}-[0-9]{3}$"
              title="Deixe o formato assim: 00000-000"
              minLength={9}
              maxLength={9}
              required
            />
          </div>
          <div className="flex justify-center items-center my-1 flex-wrap flex-1">
            <h2 className="text-2xl text-black mx-2">Logradouro</h2>
            <input
              type="text"
              pattern="^[a-zA-Z]+$"
              title="Apenas letras"
              className="outline-none bg-slate-100 rounded px-2 py-1"
              required
            />
          </div>
          <div className="flex justify-center items-center my-1 flex-wrap flex-1">
            <h2 className="text-2xl text-black mx-2">Localidade</h2>
            <input
              type="text"
              pattern="^[a-zA-Z]+$"
              title="Apenas letras"
              className="outline-none bg-slate-100 rounded px-2 py-1"
              required
            />
          </div>
          <div className="flex flex-col justify-center items-center my-1 flex-wrap flex-1">
            <h2 className="text-2xl text-black mx-2">UF</h2>
            <select className="outline-none bg-slate-100 rounded px-2 py-1">
              {estados.map((uf) => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-around items-center w-full flex-wrap my-2">
          <h2 className="my-2 mx-3 text-center flex-1">
            <strong>Bairro:</strong>{" "}
          </h2>
          <h2 className="my-2 mx-3 text-center flex-1">
            <strong>IBGE:</strong>{" "}
          </h2>
          <h2 className="my-2 mx-3 text-center flex-1">
            <strong>SIAFI:</strong>{" "}
          </h2>
          <h2 className="my-2 mx-3 text-center flex-1">
            <strong>DDD:</strong>{" "}
          </h2>
        </div>
        <button
          className="
          my-2 px-5 py-2 bg-green-500 font-bold text-white rounded
          hover:scale-105 duration-300
          "
        >
          Editar
        </button>
      </form>
    </>
  );
}

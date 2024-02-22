"use client";
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

export default function UpdateForm({
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

  async function handleUpdateAluno(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(false);
  }

  return (
    <>
      <h2 className="text-green-500 text-2xl w-full">Cadastrar Endereço</h2>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={(e) => {}}
      >
        <div className="flex justify-center items-center my-5">
          <h2 className="text-2xl text-black mx-2">CEP</h2>
          <input
            type="text"
            className="outline-none bg-slate-100 rounded px-2 py-1"
          />
        </div>
        <div className="flex justify-center items-center my-5">
          <h2 className="text-2xl text-black mx-2">Logradouro</h2>
          <input
            type="text"
            className="outline-none bg-slate-100 rounded px-2 py-1"
          />
        </div>
        <div className="flex justify-center items-center my-5">
          <h2 className="text-2xl text-black mx-2">Complemento</h2>
          <input
            type="text"
            className="outline-none bg-slate-100 rounded px-2 py-1"
          />
        </div>
        <div className="flex justify-center items-center my-5">
          <h2 className="text-2xl text-black mx-2">Bairro</h2>
          <input
            type="text"
            className="outline-none bg-slate-100 rounded px-2 py-1"
          />
        </div>
        <div className="flex justify-center items-center my-5">
          <h2 className="text-2xl text-black mx-2">Localidade</h2>
          <input
            type="text"
            className="outline-none bg-slate-100 rounded px-2 py-1"
          />
        </div>
        <div className="flex justify-center items-center my-5">
          <h2 className="text-2xl text-black mx-2">UF</h2>
          <select className="outline-none bg-slate-100 rounded px-2 py-1">
            {estados.map((uf) => (
              <option value={uf}>{uf}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-center items-center my-5">
          <h2 className="text-2xl text-black mx-2">IBGE</h2>
          <input
            type="text"
            className="outline-none bg-slate-100 rounded px-2 py-1"
          />
        </div>
        <div className="flex justify-center items-center my-5">
          <h2 className="text-2xl text-black mx-2">GIA</h2>
          <input
            type="text"
            className="outline-none bg-slate-100 rounded px-2 py-1"
          />
        </div>
        <div className="flex justify-center items-center my-5">
          <h2 className="text-2xl text-black mx-2">DDD</h2>
          <input
            type="text"
            className="outline-none bg-slate-100 rounded px-2 py-1"
          />
        </div>
        <div className="flex justify-center items-center my-5">
          <h2 className="text-2xl text-black mx-2">Siafi</h2>
          <input
            type="text"
            className="outline-none bg-slate-100 rounded px-2 py-1"
          />
        </div>
      </form>
    </>
  );
}

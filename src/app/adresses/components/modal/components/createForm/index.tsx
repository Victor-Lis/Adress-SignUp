"use client";
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

export default function CreateForm({
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

  const [CEP, setCEP] = useState<string>("");

  const [logradouro, setLogradouro] = useState<string>("");
  const [localidade, setLocalidade] = useState<string>("");
  const [UF, setUF] = useState<string>("");

  const [bairro, setBairro] = useState<string>("");
  const [siafi, setSiafi] = useState<string>("");
  const [ibge, setIbge] = useState<string>("");
  const [DDD, setDDD] = useState<string>("");

  const route = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleCreateAdress(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(false);
  }

  async function getAPIDatasByCEP(cep: string) {
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const data: AdressType | null = await fetch(url)
    .then((res) => res.json())
    .catch(e => console.log(e))

    if(data){
      setCEP(data.cep as string)
      setLogradouro(data.logradouro)
      setLocalidade(data.localidade)
      setUF(data.uf)

      setBairro(data.bairro as string)
      setSiafi(data.siafi as string)
      setIbge(data.ibge as string)
      setDDD(data.ddd as string)
    }
  }

  const isEnabledToSearch = () => logradouro?.length && localidade?.length && UF?.length

  async function getAPICEPByAdress(){
    if(isEnabledToSearch()){
      const url = `https://viacep.com.br/ws/${UF}/${localidade}/${logradouro}/json/`
      const datas: AdressType[] | null = await fetch(url)
      .then((res) => res.json())
      .catch(e => console.log(e))
      
      
      if(datas?.length){
        setCEP(datas[0].cep as string)
        setLogradouro(datas[0].logradouro)
        setLocalidade(datas[0].localidade)
        setUF(datas[0].uf)
  
        setBairro(datas[0].bairro as string)
        setSiafi(datas[0].siafi as string)
        setIbge(datas[0].ibge as string)
        setDDD(datas[0].ddd as string)
      }
    }
  }

  useEffect(() => {
    if (CEP.length === 8 || CEP.length === 9) {
      getAPIDatasByCEP(CEP);
    }
  }, [CEP]);

  useEffect(() => {
    getAPICEPByAdress()
  }, [UF, logradouro, localidade]);

  return (
    <>
      <h2 className="text-green-500 text-2xl w-full">Cadastrar Endereço</h2>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={(e) => handleCreateAdress(e)}
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
              value={CEP}
              onChange={(e) => setCEP(e.target.value)}
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
              value={logradouro}
              onChange={(e) => {
                getAPICEPByAdress()
                setLogradouro(e.target.value)
              }}
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
              value={localidade}
              onChange={(e) => {
                getAPICEPByAdress()
                setLocalidade(e.target.value)
              }}
            />
          </div>
          <div className="flex flex-col justify-center items-center my-1 flex-wrap flex-1">
            <h2 className="text-2xl text-black mx-2">UF</h2>
            <select className="outline-none bg-slate-100 rounded px-2 py-1" onChange={(e) => {
              getAPICEPByAdress()
              setUF(e.target.value)
            }}>
              <option value={UF}>{UF}</option>
              {estados.map((uf) => {
                if(uf !== UF) return <option key={uf} value={uf}>{uf}</option>
              })}
            </select>
          </div>
        </div>
        <div className="flex justify-around items-center w-full flex-wrap my-2">
          <h2 className="my-2 mx-3 text-center flex-1">
            <strong>Bairro:</strong>{" "}<br/>{bairro}
          </h2>
          <h2 className="my-2 mx-3 text-center flex-1">
            <strong>IBGE:</strong>{" "}<br/>{ibge}
          </h2>
          <h2 className="my-2 mx-3 text-center flex-1">
            <strong>SIAFI:</strong>{" "}<br/>{siafi}
          </h2>
          <h2 className="my-2 mx-3 text-center flex-1">
            <strong>DDD:</strong>{" "}<br/>{DDD}
          </h2>
        </div>
        <button
          className="
          my-2 px-5 py-2 bg-green-500 font-bold text-white rounded
          hover:scale-105 duration-300
          "
        >
          Cadastrar
        </button>
      </form>
    </>
  );
}

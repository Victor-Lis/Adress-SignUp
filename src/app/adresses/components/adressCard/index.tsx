import { AdressType } from "@/@types/AdressType";

export default function adressCard({ adress }: { adress: AdressType }) {
  return (
    <div className="
        bg-slate-200 flex flex-col px-3 py-2 rounded
        hover:scale-105 duration-300 cursor-pointer
    ">
      <h2 className="flex text-3xl text-blue-600 mb-2">CEP {adress.cep}</h2>
      <div className="flex flex-row justify-around items-center">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl text-bold">Logradouro</h2> 
          <h4 className="text-center w-full">{adress.logradouro}</h4>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl text-bold">Localidade</h2> 
          <h4 className="text-center">{adress.localidade}</h4>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl text-bold">UF</h2> 
          <h4 className="text-center">{adress.uf}</h4>
        </div>
      </div>
    </div>
  );
}

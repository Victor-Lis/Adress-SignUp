import { AdressType } from "@/@types/AdressType";

export default function Header({adress}:{adress: AdressType}) {
  return (
    <header className="w-full flex items-center justify-start">
      <h2 className="text-blue-600 text-3xl py-2 px-5 bg-white rounded">
        {adress.cep}
      </h2>
    </header>
  );
}

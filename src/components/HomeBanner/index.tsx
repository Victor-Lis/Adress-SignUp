import Image from "next/image";
import Map from "../../assets/map.png";
import Link from "next/link";
import { authOptions } from '@/lib/auth'
import { getServerSession } from "next-auth";

export default async function HomeBanner() {

  const session = await getServerSession(authOptions)

  return (
    <Link
      className="
        min-w-[250px]
        flex items-center flex-col min-[1050px]:flex-row justify-center border-hite-50 bg-zinc-800 w-6/12 p-5 mt-5 mb-20 rounded
        hover:scale-[1.015] cursor-pointer duration-300
    "
      href={session?.user ? "/adresses" : `http://localhost:3000/api/auth/signin?callbackUrl=${process.env.HOST_URL}/adresses`}
    >
      <Image
        src={Map}
        alt="Ícone de Mapa"
        className="w-full min-w-[250px] max-w-[250px]"
        priority
      />
      <div className="text-center mx-6 max-[1050px]:w-full w-6/12 max-[1050px]:my-2">
        <h2 className="font-bold text-white max-[1050px]:my-2 mb-5 min-[400px]:text-2xl">
          Adress SignUp
        </h2>
        <p className="text-white">
          Cadastre seus endereços residenciais, comerciais, de trabalho ou
          qualquer outro lugar importante. Sendo possível guardar informações como CEP,
          logradouro, número, complemento, bairro, cidade, estado e país.
        </p>
      </div>
    </Link>
  );
}

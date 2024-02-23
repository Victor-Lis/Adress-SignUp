import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function contentContainer() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      redirect("/")
    }
  
    const enderecos = await prisma.endereco.findMany({
      where: {
        user: {
         email: session.user.email 
        }
      },
    })
 return (
   <div className="w-9/12 mx-auto mt-7 mb-5 grid grid-cols-2 gap-x-5 gap-y-2">
    {enderecos.map((adress) => {
        return <p key={adress.cep}>{adress.cep}</p>
    })}
   </div>
 );
}
"use server"

import prisma from "@/lib/prisma"

export async function deleteAdress(id: string){
    let data = await prisma.endereco.delete({
      where: {
        uid: id,
      }
    })
    .then(() => { 
        return true
    })
    .catch((e) => console.log(e))

    return !!data
    
  }
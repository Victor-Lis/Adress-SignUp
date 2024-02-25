"use client"
import { FiTrash2 } from "react-icons/fi";
import { deleteAdress } from "./deleteAdress";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
}

export default function Button({id}: Props) {

  const router = useRouter()

  async function handleDeleteAdress(){
    let data = await deleteAdress(id)
    if(data){
      router.refresh()
    }
  }

  return (
    <button className="mt-10 flex text-white mx-auto bg-red-600 px-5 py-2 rounded hover:scale-105 duration-300" onClick={handleDeleteAdress}>
      <FiTrash2 size={25} color="#fff" className="mr-2" />
      Apagar
    </button>
  );
}

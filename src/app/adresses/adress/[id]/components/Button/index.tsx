"use client"
import { FiTrash2 } from "react-icons/fi";

export default function Button() {
  return (
    <button className="flex text-white mx-auto">
      <FiTrash2 size={25} color="#fff" className="mr-2" />
      Apagar
    </button>
  );
}

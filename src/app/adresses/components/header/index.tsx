"use client";

import { FiPlusCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ModalContext } from "../../providers/modalProvider";

export default function Header() {
  const { handleModalVisible } = useContext(ModalContext)
  return (
    <header className="w-9/12 mx-auto flex justify-between items-center mt-7 mb-5">
      <h2 className="text-blue-600 text-3xl">Endereços</h2>
      <FiPlusCircle
        className="hover:scale-110 cursor-pointer duration-300"
        color="#00ff00"
        size={40}
        onClick={handleModalVisible}
      />
    </header>
  );
}

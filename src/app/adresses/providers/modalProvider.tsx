"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import Modal from "../components/modal";
import { AdressType } from "@/@types/AdressType";

interface ModalContextData {
  visible: boolean;
  handleModalVisible: () => void;
  adress: AdressType | null | undefined;
  handleSetAdress: (a: AdressType) => void;
  hasAdress: boolean;
}

export const ModalContext = createContext({} as ModalContextData);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [adress, setAdress] = useState<AdressType | null>()

  function handleModalVisible() {
    setVisible(!visible);
  }

  function handleSetAdress(a: AdressType){
    setAdress(a)
  }

  function handleClearAdress(){
    setAdress(null)
  }

  useEffect(() => {
    // document.body.style.overflow = visible ? "hidden" : "auto";
    if (visible) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [visible]);

  return (
    <ModalContext.Provider
      value={{
        visible,
        handleModalVisible,
        adress,
        handleSetAdress,
        hasAdress: !!adress,
      }}
    >
      {visible && <Modal toggleModal={handleModalVisible} />}
      {children}
    </ModalContext.Provider>
  );
};

"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import Modal from "../components/modal";

interface ModalContextData {
  visible: boolean;
  handleModalVisible: () => void;
}

export const ModalContext = createContext({} as ModalContextData);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);

  function handleModalVisible() {
    setVisible(!visible);
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
      }}
    >
      {visible && <Modal toggleModal={handleModalVisible} />}
      {children}
    </ModalContext.Provider>
  );
};

import { createContext, useContext, useState, type ReactNode } from "react";

interface ModalContextType {
  openModals: Record<string, boolean>;
  openModal: (modalName: string) => void;
  closeModal: (modalName: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [openModals, setOpenModals] = useState<Record<string, boolean>>({});

  const openModal = (modalName: string) => {
    setOpenModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: string) => {
    setOpenModals((prev) => ({ ...prev, [modalName]: false }));
  };

  return <ModalContext.Provider value={{ openModals, openModal, closeModal }}>{children}</ModalContext.Provider>;
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
}

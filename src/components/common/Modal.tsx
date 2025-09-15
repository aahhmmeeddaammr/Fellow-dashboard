"use client";
import React, { useEffect } from "react";
import { DashboardButton } from "./DashboardButton";
import { useModal } from "../../Hooks/useModal";

interface DashboardModalProps {
  icon: string;
  title: string;
  children?: React.ReactNode;
  buttonText: string;
  buttonIcon?: React.ReactNode;
  modalName: string;
  onConfirm?: () => void;
}

export default function DashboardModal({
  icon,
  title,
  buttonText,
  onConfirm,
  modalName,
  buttonIcon,
  children,
}: DashboardModalProps) {
  const { closeModal } = useModal();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  });

  return (
    <div className="fixed z-50 overflow-hidden top-0 bottom-0 left-0 right-0 bg-black/50 flex items-center justify-center">
      <div className="w-80 p-6 bg-white rounded-[20px] flex flex-col items-center gap-2">
        <img src={icon} alt="" width={28} height={28} />
        <h5 className="text-primaryDark font-extrabold text-xl tracking-[-2%] text-center">{title}</h5>
        <div className="w-full">{children}</div>
        <DashboardButton text={buttonText} icon={buttonIcon} onClick={onConfirm} />
        <button
          onClick={() => {
            closeModal(modalName);
          }}
          className="text-primary text-sm tracking-[-2%] font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

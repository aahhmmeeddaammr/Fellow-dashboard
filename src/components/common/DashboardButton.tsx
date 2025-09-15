"use client";
import React from "react";
import { Link } from "react-router-dom";

interface DashboardButtonProps {
  text: string;
  icon?: React.ReactNode;
  url?: string;
  target?: "_blank" | "_self";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

export const DashboardButton = ({ className, text, icon, url, target, onClick, type = "button" }: DashboardButtonProps) => {
  if (url) {
    return (
      <Link
        target={target}
        to={url}
        className={`px-16 py-[10px]  rounded-full text-white text-nowrap flex items-center gap-2 font-medium leading-6 tracking-[-0.02em] bg-gradient-to-l from-[#0097B2] from-[51%] to-[#78E6FA] to-100% ${className}`}
      >
        {text}
        {icon}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={` py-[10px] px-16  rounded-full text-white text-nowrap ${
        icon && "flex items-center gap-2"
      } font-medium leading-6 tracking-[-0.02em] bg-gradient-to-l from-[#0097B2] from-[51%] to-[#78E6FA] to-100% ${className}`}
    >
      {text}
      {icon}
    </button>
  );
};

"use client";
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarLinkProps {
  className?: string;
  icon: React.ReactNode;
  iconActive?: React.ReactNode;
  link?: string;
  name: string;
  showName?: boolean;
  isButton?: boolean;
  onClick?: () => void;
}

export default function SidebarLink({
  icon,
  iconActive,
  link,
  name,
  isButton,
  onClick,
  className = "",
  showName,
}: SidebarLinkProps) {
  const location = useLocation();
  const isActive = link ? (link === "/" ? location.pathname === "/" : location.pathname.startsWith(link)) : false;
  return (
    <div className={`relative group p-2.5 rounded-[10px] ${isActive && "bg-primarySubtle"} ${className}`}>
      {!isButton ? (
        <Link to={link as string} className="flex items-center gap-2.5  ">
          {isActive && iconActive ? iconActive : icon}
          <span
            className={`${showName ? "" : showName === false ? "hidden" : "max-lg:hidden"} text-nowrap ${
              isActive ? "text-primary  font-bold" : "text-primarySubtle font-semibold"
            }`}
          >
            {name}
          </span>
        </Link>
      ) : (
        <button onClick={onClick} className="flex items-center gap-2.5 w-min">
          {icon}
          <span
            className={`${
              showName ? "" : showName === false ? "hidden" : "max-lg:hidden"
            } text-nowrap text-primarySubtle font-semibold`}
          >
            {name}
          </span>
        </button>
      )}

      {/* Tooltip */}
      <div
        className={`${
          showName === false ? "block" : "hidden md:max-lg:block"
        } absolute top-1/2 -translate-y-1/2 left-full ms-2 opacity-0 scale-80 transition-all duration-200 
                        group-hover:opacity-100 group-hover:scale-100 bg-primaryDark text-white text-sm p-2 rounded-md pointer-events-none text-nowrap`}
      >
        {name}
      </div>
    </div>
  );
}

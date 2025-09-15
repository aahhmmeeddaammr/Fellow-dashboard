"use client";
import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import type { Option } from "./GroupStatusPill";

interface SelectFieldProps {
  label: React.ReactNode;
  name: string;
  options: Option[];
  isOpen: boolean;
  setIsOpen: (newState: boolean) => void;
  selected: string | null | number;
  setSelected: (newdata: number) => void;
}

const SelectDiv = ({ item, onClick }: { item: string; onClick: () => void }) => {
  return (
    <div
      onMouseDown={onClick}
      className="px-3 border-t-2 border-[#0097B259] bg-[#DDFAFF] text-primaryDark cursor-pointer hover:bg-cyan-500 hover:text-white transition-all duration-100"
    >
      {item}
    </div>
  );
};

export default function GroupDetailsSelector({
  label,
  selected,
  setSelected,
  options,
  name,
  isOpen,
  setIsOpen,
}: SelectFieldProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 0,
  });

  useLayoutEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);

  const toggleOpen = () => setIsOpen(!isOpen);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        !document.getElementById("dropdown-portal")?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div
        ref={triggerRef}
        id={name}
        tabIndex={0}
        onClick={toggleOpen}
        style={{ width: position.width || "auto" }}
        className={`group max-w-fit bg-[#E6EAEE] text-[13px] font-medium leading-6 rounded-3xl px-3 outline-none cursor-pointer hover:bg-primarySubtle hover:text-primaryDark
          ${selected ? "border-primary text-primaryDark" : "text-[#848484] border-[#979797]"}
          ${
            isOpen
              ? "border-primary bg-primarySubtle text-primaryDark rounded-t-xl rounded-b-none border-b-transparent"
              : "hover:border-primary"
          }`}
      >
        <div className="flex justify-between">
          <span className="text-nowrap pointer-events-none">{selected ? selected : label}</span>
          <svg
            className={`${selected ? "fill-primary" : "fill-[#979797]"} ${
              isOpen && "rotate-180 fill-primary"
            } transition-all group-hover:fill-primary`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.4"
              d="M15.4797 13.2302L11.6897 8.18018H6.07975C5.11975 8.18018 4.63975 9.34018 5.31975 10.0202L10.4997 15.2002C11.3297 16.0302 12.6797 16.0302 13.5097 15.2002L15.4797 13.2302Z"
            />
            <path d="M17.9204 8.18018H11.6904L15.4804 13.2302L18.6904 10.0202C19.3604 9.34018 18.8804 8.18018 17.9204 8.18018Z" />
          </svg>
        </div>
      </div>

      {isOpen &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              maxWidth: position.width,
              zIndex: 9999,
            }}
            className="max-h-[198px] rounded-b-lg overflow-y-auto shadow-lg text-sm"
          >
            {options.map((item, index) => (
              <SelectDiv
                key={index}
                item={String(item.label)}
                onClick={() => {
                  setSelected(item.value as number);
                  setIsOpen(false);
                }}
              />
            ))}
          </div>,
          document.body
        )}
    </>
  );
}

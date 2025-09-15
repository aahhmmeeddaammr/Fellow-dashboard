  "use client";
  import React, { useState } from "react";
  import Flag from "react-world-flags";
  import { Controller } from "react-hook-form";

  interface SelectType {
    item: React.ReactNode;
    value: string | number;
    data?: {
      countryCode?: string;
      countryCallingCode?: string;
    };
  }

  interface SelectFieldProps {
    label: React.ReactNode;
    name: string;
    options: SelectType[];
    fixed?: boolean;
    isCountrySelect?: boolean;
    isModal?: boolean;
    icon?: React.ReactNode;
    control: any; // react-hook-form control
  }

  const SelectDiv = ({ item, onClick, isModal }: { item: SelectType; onClick: () => void; isModal: boolean }) => {
    return (
      <div
        onMouseDown={onClick}
        className={`${
          isModal && "text-xs font-medium"
        } p-3 border-t-2 border-[#0097B259] bg-[#DDFAFF] text-primaryDark cursor-pointer hover:bg-cyan-500 hover:text-white transition-all duration-100`}
      >
        {item.item}
      </div>
    );
  };

  export default function SelectField({
    label,
    options,
    name,
    icon,
    control,
    fixed = false,
    isCountrySelect = false,
    isModal = false,
  }: SelectFieldProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selected = options.find((opt) => opt.value === field.value) || null;

          return (
            <div className="max-h-fit relative">
              <div
                id={name}
                tabIndex={0}
                onBlur={() => setIsOpen(false)}
                onClick={toggleOpen}
                className={
                  isModal
                    ? `group w-full p-3 rounded-lg cursor-pointer ${
                        isOpen && "rounded-b-none"
                      } bg-primarySubtle text-primaryDark text-xs leading-5 font-medium`
                    : `group w-full p-3 bg-white border-2 rounded-lg font-medium outline-none cursor-pointer hover:bg-primarySubtle hover:text-primaryDark
                  ${selected ? "border-primary text-primaryDark" : "text-[#848484] border-[#979797]"}
                  ${
                    isOpen
                      ? "border-primary bg-primarySubtle text-primaryDark rounded-b-none border-b-transparent"
                      : "hover:border-primary"
                  }`
                }
              >
                <div className="flex justify-between">
                  {isCountrySelect && selected ? (
                    <div className="flex items-center gap-1">
                      <Flag code={selected.data?.countryCode || ""} width={36} height={24} className="w-9 h-6" />
                      <span>+{selected.data?.countryCallingCode}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      {icon}
                      <span className="text-nowrap pointer-events-none">{selected ? selected.item : label}</span>
                    </div>
                  )}
                  <svg
                    className={
                      isModal
                        ? `fill-primary transition-all ${isOpen && "rotate-180"}`
                        : `${selected ? "fill-primary" : "fill-[#979797]"} ${
                            isOpen && "rotate-180 fill-primary"
                          } transition-all group-hover:fill-primary`
                    }
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

              <div
                hidden={!isOpen}
                className={`max-h-[198px] rounded-b-lg overflow-y-auto ${
                  fixed ? "absolute top-full left-0 z-50 min-w-full w-max" : "max-w-full"
                }`}
              >
                {options.map((item, index) => (
                  <SelectDiv
                    key={index}
                    item={item}
                    isModal={isModal}
                    onClick={() => {
                      field.onChange(item.value); // send value to react-hook-form
                      setIsOpen(false);
                    }}
                  />
                ))}
              </div>
            </div>
          );
        }}
      />
    );
  }

import React, { useState } from "react";

interface InputFieldProps {
  type: string;
  label?: string;
  placeholder?: string;
  name: string;
  hideStrength?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export default function InputField({ type, label, placeholder, name, hideStrength = false, className, icon }: InputFieldProps) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [strength, setStrength] = useState<"Weak" | "Medium" | "Strong" | "">("");
  const [text, setText] = useState("");

  const checkPasswordStrength = (pwd: string) => {
    if (pwd.length < 6) return "Weak";
    if (pwd.length < 10) return "Medium";
    return /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd) ? "Strong" : "Medium";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    if (type === "password") {
      setStrength(checkPasswordStrength(value));
    }
  };

  return (
    <div>
      {label && (
        <div className="flex items-center justify-between mb-1">
          <label className="text-primaryDark text-sm font-semibold leading-5">{label}</label>
          {type === "password" && !hideStrength && text.length > 0 && (
            <span
              className={`flex items-center gap-1 text-sm ${
                strength === "Weak" ? "text-[#FF002F]" : strength === "Medium" ? "text-[#FFC700]" : "text-[#04CD00]"
              }`}
            >
              {strength}
              <svg
                width={12}
                height={12}
                viewBox="0 0 12 12"
                className={`${
                  strength === "Weak" ? "fill-[#FF002F]" : strength === "Medium" ? "fill-[#FFC700]" : "fill-[#04CD00]"
                }`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M5.99859 8.675C6.44871 8.675 6.81359 8.31011 6.81359 7.86C6.81359 7.40989 6.44871 7.045 5.99859 7.045C5.54848 7.045 5.18359 7.40989 5.18359 7.86C5.18359 8.31011 5.54848 8.675 5.99859 8.675Z"
                />
                <path d="M8.325 4.72H3.675C1.625 4.72 1 5.345 1 7.395V8.325C1 10.375 1.625 11 3.675 11H8.325C10.375 11 11 10.375 11 8.325V7.395C11 5.345 10.375 4.72 8.325 4.72ZM6 9.37C5.165 9.37 4.49 8.69 4.49 7.86C4.49 7.03 5.165 6.35 6 6.35C6.835 6.35 7.51 7.03 7.51 7.86C7.51 8.69 6.835 9.37 6 9.37Z" />
                <path
                  opacity="0.4"
                  d="M3.55938 4.725V4.14C3.55938 2.675 3.97438 1.7 5.99938 1.7C8.02437 1.7 8.43937 2.675 8.43937 4.14V4.725C8.69438 4.73 8.92438 4.74 9.13938 4.77V4.14C9.13938 2.79 8.81437 1 5.99938 1C3.18438 1 2.85938 2.79 2.85938 4.14V4.765C3.06937 4.74 3.30438 4.725 3.55938 4.725Z"
                />
              </svg>
            </span>
          )}
        </div>
      )}
      <div className="relative">
        {icon && <div className="absolute top-1/2 left-3 -translate-y-1/2">{icon}</div>}
        <input
          className={`peer w-full p-3 ${type === "password" && "pe-10"} ${
            icon && "ps-11"
          } text-primaryDark bg-white border-2 border-gray-400 rounded-lg font-medium outline-none placeholder:text-[#979797] focus:border-primary focus:bg-primarySubtle hover:border-primary hover:bg-primarySubtle hover:placeholder:text-primaryDark focus:placeholder:text-primaryDark  ${className}`}
          type={type === "password" && !isPasswordVisible ? "password" : "text"}
          placeholder={placeholder}
          name={name}
          value={text}
          onChange={handleChange}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setPasswordVisible((prev) => !prev)}
            className="absolute top-1/2 right-3 -translate-y-1/2 focus:outline-none *:fill-[#979797] peer-focus:*:fill-primary peer-hover:*:fill-primary"
            aria-label="Toggle password visibility"
          >
            {/* <PasswordIcon fill="" visible={isPasswordVisible} /> */}
          </button>
        )}
      </div>
    </div>
  );
}

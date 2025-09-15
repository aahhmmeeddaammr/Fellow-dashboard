import { useState } from "react";
import InputField from "../common/InputField";

export default function AccountItem({ label, value }: { label: string; value?: string }) {
  const [field, setField] = useState<string | null>(null);
  if (value || field) {
    return (
      <div className="flex flex-col">
        <span className="text-[#848484] font-medium leading-6">{label}</span>
        <p className="text-[#065361] font-bold text-xl">{value || field}</p>
      </div>
    );
  } else {
    return (
      <form className="flex flex-col">
        <div className="flex items-center gap-1 mb-1">
          <span className="size-4 bg-red-200 text-red-500 text-sm flex items-center justify-center rounded-full">!</span>
          <span className="text-[#848484] font-medium leading-6">{label}</span>
        </div>
        <InputField name="schoolName" type="text" placeholder="Enter the student school name" />
      </form>
    );
  }
}

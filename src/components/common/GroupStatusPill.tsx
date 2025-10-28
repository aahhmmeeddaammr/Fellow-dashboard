import { Controller, type Control, type FieldValues, type Path, type PathValue } from "react-hook-form";
import { useState } from "react";
import StatusPill from "./StatusPill";
import GroupDetailsSelector from "./GroupDetailsSelector";
export type Option = { label: string; value: number | null };

type GroupStatusPillProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  defaultValue?: PathValue<T, Path<T>>;
  options: Option[];
};

export default function GroupStatusPill<T extends FieldValues>({
  control,
  name,
  defaultValue,
  options,
}: GroupStatusPillProps<T>) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => {
        const { value, onChange } = field;

        if (!isEditing) {
          if (value == 0 || value) {
            return (
              <div onClick={() => setIsEditing(true)} className="cursor-pointer">
                <StatusPill variant={(options.find((f) => f.value == value)?.label || value) as StatusPillProps["variant"]} />
              </div>
            );
          }
        }

        return (
          <GroupDetailsSelector
            setSelected={(val) => {
              onChange(val as PathValue<T, Path<T>>);
              setIsEditing(false); 
            }}
            selected={value}
            label="Select"
            name={name}
            isOpen={isEditing}
            setIsOpen={setIsEditing}
            options={options}
          />
        );
      }}
    />
  );
}

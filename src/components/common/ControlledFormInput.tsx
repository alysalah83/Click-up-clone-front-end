"use client";

import { Dispatch, SetStateAction, useState } from "react";

interface ControlledFormInputProps {
  type: HTMLInputElement["type"];
  disabled?: boolean;
  name: string;
  placeholder: string;
  setOutValue: Dispatch<SetStateAction<string>>;
}

function ControlledFormInput({
  type,
  name,
  disabled,
  placeholder,
  setOutValue,
}: ControlledFormInputProps) {
  const [value, setValue] = useState("");
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        setOutValue(e.target.value);
      }}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full rounded-lg border border-neutral-700 px-4 py-2 placeholder-neutral-500 ring-offset-1 ring-offset-neutral-500 transition duration-300 outline-none focus:ring disabled:cursor-not-allowed disabled:bg-neutral-500 disabled:text-neutral-800"
    />
  );
}

export default ControlledFormInput;

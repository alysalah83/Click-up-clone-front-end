import { ICONS_MAP } from "@/shared/icons/icons-map";
import { IconsMap } from "@/shared/icons/icons.type";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface FormInputWithLabelProps {
  icon: IconsMap;
  label: string;
  placeholder: string;
  inputType: HTMLInputElement["type"];
  errorMessage: string | undefined;
  disabled?: boolean;
  register?: any;
  autoComplete?: HTMLInputElement["autocomplete"];
}

function FormInputWithLabel({
  icon,
  label,
  placeholder,
  inputType,
  errorMessage,
  register,
  disabled = false,
  autoComplete = "",
}: FormInputWithLabelProps) {
  const Icon = ICONS_MAP[icon];
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          {...register}
          id={label}
          autoComplete={autoComplete}
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full rounded-lg border py-2 pr-4 pl-10 ring-gray-400 outline-0 transition duration-300 placeholder:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-200 ${errorMessage ? "border-red-500" : "border-gray-300 focus-within:ring hover:ring"}`}
        />
        <Icon
          className={`absolute top-1/2 left-3 size-5 -translate-y-1/2 ${errorMessage ? "text-red-500" : "text-gray-300"}`}
        />
      </div>
      {errorMessage && <ErrorMessage error={errorMessage} />}
    </div>
  );
}

export default FormInputWithLabel;

import { ICONS_MAP } from "@/shared/icons/icons-map";
import { memo } from "react";

interface CheckboxProps {
  checked: boolean;
  onCheckedChange: React.MouseEventHandler<HTMLDivElement>;
}

function Checkbox({ checked, onCheckedChange }: CheckboxProps) {
  const Icon = ICONS_MAP.checkMark;
  return (
    <div
      className={`flex h-4 w-4 cursor-pointer items-center justify-center rounded-sm border border-neutral-400 dark:border-neutral-600 ${checked ? "bg-violet-600" : "bg-neutral-50 dark:bg-neutral-900"} `}
      aria-label="checkbox"
      role="checkbox"
      aria-checked={checked}
      onClick={onCheckedChange}
    >
      {checked ? (
        <Icon className="h-3 w-3 text-neutral-100 dark:text-neutral-300" />
      ) : (
        ""
      )}
    </div>
  );
}

export default memo(Checkbox);

import { ICONS_MAP } from "@/constants/iconsMap";
import { memo } from "react";

interface CheckBoxProps {
  isChecked: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

function CheckBox({ isChecked, onClick }: CheckBoxProps) {
  const Icon = ICONS_MAP.checkMark;
  return (
    <div
      className={`flex h-4 w-4 cursor-pointer items-center justify-center rounded-sm border border-neutral-400 dark:border-neutral-600 ${isChecked ? "bg-violet-600" : "bg-neutral-50 dark:bg-neutral-900"} `}
      aria-label="checkbox"
      role="checkbox"
      aria-checked={isChecked}
      onClick={onClick}
    >
      {isChecked ? (
        <Icon className="h-3 w-3 text-neutral-100 dark:text-neutral-300" />
      ) : (
        ""
      )}
    </div>
  );
}

export default memo(CheckBox);

import { ICONS_MAP } from "@/constants/iconsMap";
import { StylesSizes } from "@/types/index.types";
import clsx from "clsx";
import { TaskStatus } from "../types/task.types";
import { TASK_STATUS } from "../consts/task.consts";
import { memo } from "react";

interface StatusCardProps {
  type: TaskStatus;
  size?: StylesSizes;
}

function StatusCard({ type, size = "medium" }: StatusCardProps) {
  const { name, icon, bgColor } = TASK_STATUS[type];
  const Icon = ICONS_MAP[icon];

  const containerClasses = clsx("flex items-center w-fit rounded-md", bgColor, {
    "px-1.5 py-1 gap-1": size === "small",
    "px-2 py-1 gap-1.5": size === "medium",
    "px-2.5 py-1.5 gap-2": size === "large",
  });

  const taskNameClasses = clsx("text-neutral-50 uppercase", {
    "text-xs font-semibold": size === "small",
    "text-sm font-medium": size === "medium",
    "text-base font-medium": size === "large",
  });

  return (
    <div className={containerClasses}>
      <span>
        <Icon className="h-4 w-4 fill-neutral-50" />
      </span>
      <span className={taskNameClasses}>{name}</span>
    </div>
  );
}

export default memo(StatusCard);

import { ICONS_MAP } from "@/constants/iconsMap";
import { useTaskContext } from "@/shared/tasks/components/TaskProvider";
import { TASK_STATUS } from "@/shared/tasks/consts/task.consts";
import { useUpdateTask } from "@/shared/tasks/hooks/useUpdateTask";
import { memo } from "react";
import {
  iconsSize,
  slotBorderClasses,
  slotHoverClasses,
  slotPaddingClasses,
} from "../styles/style";
import RenameForm from "@/shared/options-menu/components/RenameForm";

function TableSlotTaskName() {
  const {
    toggleIsRenameOpen,
    isRenameOpen,
    task: { listId, id, name, status },
  } = useTaskContext();
  const { updateTask } = useUpdateTask({ listId });

  const handleUpdateName = function (name: string) {
    updateTask({ taskId: id, updatedTaskFields: { name } });
    toggleIsRenameOpen();
  };

  const { icon, color } = TASK_STATUS[status];
  const Icon = ICONS_MAP[icon];

  return (
    <div
      className={`col-span-4 flex cursor-default items-center ${slotHoverClasses} ${slotBorderClasses} ${slotPaddingClasses}`}
      onClick={() => {
        if (!isRenameOpen) toggleIsRenameOpen();
      }}
    >
      {isRenameOpen ? (
        <RenameForm
          onSave={handleUpdateName}
          onClose={(e) => {
            e?.stopPropagation();
            toggleIsRenameOpen();
          }}
          initialName={name}
        />
      ) : (
        <div className="flex w-full items-center gap-1.5">
          <Icon className={`${color} ${iconsSize} shrink-0`} />
          <span className="line-clamp-1 truncate">{name}</span>
        </div>
      )}
    </div>
  );
}

export default memo(TableSlotTaskName);

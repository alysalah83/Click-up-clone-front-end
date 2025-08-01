import { Menu, MenuTrigger, MenuContent } from "@/components/ui/MenuCompound";
import StatusCard from "@/shared/tasks/components/StatusCard";
import TaskStatusUpdater from "@/shared/tasks/components/TaskStatusUpdater";
import {
  slotBorderClasses,
  slotHoverClasses,
  slotPaddingClasses,
} from "../styles/style";
import { useTaskContext } from "@/shared/tasks/components/TaskProvider";
import { memo } from "react";

function TableSlotTaskStatus() {
  const {
    task: { status },
  } = useTaskContext();
  return (
    <div
      className={`col-span-3 flex items-center ${slotBorderClasses} ${slotHoverClasses} ${slotPaddingClasses}`}
    >
      <Menu>
        <MenuTrigger>
          <StatusCard type={status} size="small" />
        </MenuTrigger>
        <MenuContent>
          <TaskStatusUpdater />
        </MenuContent>
      </Menu>
    </div>
  );
}

export default memo(TableSlotTaskStatus);

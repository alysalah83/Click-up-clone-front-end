import { useTaskContext } from "@/shared/tasks/components/TaskProvider";
import { memo } from "react";
import {
  slotBorderClasses,
  slotHoverClasses,
  slotPaddingClasses,
} from "../styles/style";
import { Menu, MenuTrigger, MenuContent } from "@/components/ui/MenuCompound";
import TaskDateUpdater from "@/shared/tasks/components/TaskDateUpdater";
import { getFormattedRangeDate } from "@/utils/helper";

function TableSlotTaskDate() {
  const {
    task: { endDate, startDate },
  } = useTaskContext();
  return (
    <div
      className={`col-span-3 cursor-pointer ${slotHoverClasses} ${slotBorderClasses}`}
    >
      <Menu>
        <MenuTrigger>
          <div
            className={`flex items-center justify-center ${slotPaddingClasses}`}
          >
            <span className="font-semibold tabular-nums">
              {getFormattedRangeDate({ startDate, endDate }, true)}
            </span>
          </div>
        </MenuTrigger>
        <MenuContent>
          <TaskDateUpdater />
        </MenuContent>
      </Menu>
    </div>
  );
}

export default memo(TableSlotTaskDate);

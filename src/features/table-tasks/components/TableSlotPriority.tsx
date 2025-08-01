import { Menu, MenuTrigger, MenuContent } from "@/components/ui/MenuCompound";
import { ICONS_MAP } from "@/constants/iconsMap";
import PriorityMenuList from "@/shared/tasks/components/TaskPriorityUpdater";
import { useTaskContext } from "@/shared/tasks/components/TaskProvider";
import { TASK_PRIORITIES_LIST } from "@/shared/tasks/consts/task.consts";
import { memo } from "react";
import {
  slotBorderClasses,
  slotHoverClasses,
  slotPaddingClasses,
  iconsSize,
} from "../styles/style";

function TableSlotPriority() {
  const {
    task: { priority },
  } = useTaskContext();
  const curPriority = TASK_PRIORITIES_LIST.find(
    (item) => item.label.toLowerCase() === priority,
  );
  const Icon = ICONS_MAP.flag;

  return (
    <div
      className={`col-span-3 cursor-pointer ${slotBorderClasses} ${slotHoverClasses} `}
    >
      <Menu>
        <MenuTrigger>
          <div className={`flex items-center ${slotPaddingClasses} px-2`}>
            {curPriority ? (
              <div className="flex items-center gap-2">
                <Icon className={`${curPriority.iconColor} ${iconsSize}`} />
                <span>{curPriority.label}</span>
              </div>
            ) : (
              ""
            )}
          </div>
        </MenuTrigger>
        <MenuContent>
          <PriorityMenuList />
        </MenuContent>
      </Menu>
    </div>
  );
}

export default memo(TableSlotPriority);

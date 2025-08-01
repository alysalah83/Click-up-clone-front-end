import ButtonIcon from "@/components/common/ButtonIcon";
import { Menu, MenuContent, MenuTrigger } from "@/components/ui/MenuCompound";
import {
  ToolTip,
  ToolTipMessage,
  ToolTipTrigger,
} from "@/components/ui/ToolTipCompound ";
import PriorityMenuList from "@/shared/tasks/components/TaskPriorityUpdater";
import { BOARD_TASK_ICON_SIZE } from "../consts/board";
import { useTaskContext } from "@/shared/tasks/components/TaskProvider";
import { IconsMap } from "@/types/index.types";
import { TASK_PRIORITIES_LIST } from "@/shared/tasks/consts/task.consts";

function BoardPriorityBtn({ label, icon }: { label: string; icon: IconsMap }) {
  const {
    task: { priority },
  } = useTaskContext();

  const priorityLabel = priority?.replace(
    priority[0],
    priority[0]?.toUpperCase(),
  );
  const getIconColor = TASK_PRIORITIES_LIST.find(
    (item) => item.label === priorityLabel,
  )?.iconColor;

  return (
    <span>
      <Menu>
        <MenuTrigger>
          <ToolTip>
            <ToolTipMessage>{label}</ToolTipMessage>
            <ToolTipTrigger>
              {priority === "none" ? (
                <ButtonIcon
                  icon={icon}
                  ariaLabel={`${label} button`}
                  withBg={true}
                  size={BOARD_TASK_ICON_SIZE}
                />
              ) : (
                <ButtonIcon
                  icon={icon}
                  iconColor={getIconColor}
                  label={priorityLabel}
                  ariaLabel={`${label} button`}
                  withBg={true}
                  padding="small"
                  size={BOARD_TASK_ICON_SIZE}
                />
              )}
            </ToolTipTrigger>
          </ToolTip>
        </MenuTrigger>
        <MenuContent>
          <PriorityMenuList />
        </MenuContent>
      </Menu>
    </span>
  );
}

export default BoardPriorityBtn;

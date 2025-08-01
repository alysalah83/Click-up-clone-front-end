import { IconsMap } from "@/types/index.types";
import { Menu, MenuContent, MenuTrigger } from "@/components/ui/MenuCompound";
import TaskDateUpdater from "@/shared/tasks/components/TaskDateUpdater";
import {
  ToolTip,
  ToolTipMessage,
  ToolTipTrigger,
} from "@/components/ui/ToolTipCompound ";
import { useTaskContext } from "@/shared/tasks/components/TaskProvider";
import ButtonIcon from "@/components/common/ButtonIcon";
import { BOARD_TASK_ICON_SIZE } from "../consts/board";
import { getFormattedRangeDate } from "@/utils/helper";

function BoardDateBtn({ icon, label }: { icon: IconsMap; label: string }) {
  const {
    task: { endDate, startDate },
  } = useTaskContext();

  const isDateExist = endDate && startDate;

  return (
    <span>
      <Menu>
        <MenuTrigger>
          <ToolTip>
            <ToolTipTrigger>
              {isDateExist ? (
                <ButtonIcon
                  icon="date"
                  label={getFormattedRangeDate({ endDate, startDate })}
                  ariaLabel={`open ${label} menu`}
                  withBg={true}
                  size={BOARD_TASK_ICON_SIZE}
                  padding="small"
                />
              ) : (
                <ButtonIcon
                  icon={icon}
                  withBg={true}
                  ariaLabel={`open ${label} menu`}
                  size={BOARD_TASK_ICON_SIZE}
                />
              )}
            </ToolTipTrigger>
            <ToolTipMessage>{label}</ToolTipMessage>
          </ToolTip>
        </MenuTrigger>
        <MenuContent>
          <TaskDateUpdater />
        </MenuContent>
      </Menu>
    </span>
  );
}

export default BoardDateBtn;

import ButtonIcon from "@/components/common/ButtonIcon";
import { TASK_OPTIONS_BTNS_SIZE } from "../consts/board";
import { Menu, MenuContent, MenuTrigger } from "@/components/ui/MenuCompound";
import {
  ToolTip,
  ToolTipMessage,
  ToolTipTrigger,
} from "@/components/ui/ToolTipCompound ";
import OptionsTaskMenuList from "@/shared/tasks/components/OptionsTaskMenuList";
import { useUpdateTask } from "@/shared/tasks/hooks/useUpdateTask";
import { useParams } from "next/navigation";
import { useTaskContext } from "@/shared/tasks/components/TaskProvider";
import { memo } from "react";

function TaskCardOptionsBtns() {
  const {
    task: { id, status },
    toggleIsRenameOpen,
  } = useTaskContext();
  const { listId } = useParams<{ listId: string }>();
  const { updateTask } = useUpdateTask({ listId });

  return (
    <div
      className="absolute top-0.5 right-0.5 z-10 flex rounded-lg border border-neutral-700 bg-neutral-900 p-0.5"
      onClick={(e) => e.stopPropagation()}
    >
      {status !== "complete" && (
        <ToolTip>
          <ToolTipTrigger>
            <ButtonIcon
              icon="checkMark"
              ariaLabel="task option menu"
              size={TASK_OPTIONS_BTNS_SIZE}
              onClick={() =>
                updateTask({
                  taskId: id,
                  updatedTaskFields: { status: "complete" },
                })
              }
            />
          </ToolTipTrigger>
          <ToolTipMessage>Mark complete</ToolTipMessage>
        </ToolTip>
      )}
      <ToolTip>
        <ToolTipTrigger>
          <ButtonIcon
            icon="pen"
            ariaLabel="task rename"
            size={TASK_OPTIONS_BTNS_SIZE}
            onClick={toggleIsRenameOpen}
          />
        </ToolTipTrigger>
        <ToolTipMessage>Rename</ToolTipMessage>
      </ToolTip>
      <Menu>
        <MenuTrigger>
          <ToolTip>
            <ToolTipTrigger>
              <ButtonIcon
                icon="dotsRow"
                ariaLabel="task option menu"
                size={TASK_OPTIONS_BTNS_SIZE}
              />
            </ToolTipTrigger>
            <ToolTipMessage>More actions</ToolTipMessage>
          </ToolTip>
        </MenuTrigger>
        <MenuContent>
          <OptionsTaskMenuList />
        </MenuContent>
      </Menu>
    </div>
  );
}

export default memo(TaskCardOptionsBtns);

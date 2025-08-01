"use client";

import ButtonIcon from "@/components/common/ButtonIcon";
import { ICONS_MAP } from "@/constants/iconsMap";
import { useCheckTask } from "@/features/table-tasks/context/CheckTaskProvider";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDeleteTasks } from "../hooks/useDeleteTasks";
import { useParams } from "next/navigation";
import {
  ToolTip,
  ToolTipMessage,
  ToolTipTrigger,
} from "@/components/ui/ToolTipCompound ";
import { Menu, MenuContent, MenuTrigger } from "@/components/ui/MenuCompound";
import TasksStatusUpdater from "./TasksStatusUpdater";
import TasksDateUpdater from "./TasksDateUpdater";
import TasksPriorityUpdater from "./TasksPriorityUpdater";

function TaskFeaturesRow() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const { checkedTasksIdSet, handleClearAllChecked } = useCheckTask();
  const { listId } = useParams<{ listId: string }>();
  const { deleteTasks } = useDeleteTasks({ listId });

  const handleDelete = useCallback(() => {
    deleteTasks(checkedTasksIdSet);
    handleClearAllChecked();
  }, [checkedTasksIdSet, handleClearAllChecked, deleteTasks]);

  const checkedTaskCount = checkedTasksIdSet.size;
  const isAnyTaskChecked = checkedTaskCount > 0;
  const CloseIcon = ICONS_MAP.close;

  return (
    isClient &&
    createPortal(
      <div
        className={`bg-neutral-750 ${isAnyTaskChecked ? "visible -translate-y-1/2 opacity-100" : "pointer-events-none invisible opacity-0"} absolute bottom-[5%] left-1/2 z-40 flex min-w-2xs -translate-x-1/2 items-center justify-between rounded-lg px-4 py-2 transition duration-200 lg:w-2xl`}
      >
        <div
          onClick={handleClearAllChecked}
          className="flex cursor-pointer items-center rounded-md border border-neutral-600 bg-neutral-900/10 px-2 py-1 text-sm font-medium text-neutral-100 transition duration-300 hover:bg-neutral-700 active:bg-neutral-700"
        >
          <span className="tabular-nums">{checkedTaskCount}</span>
          <span className="ml-1"> Task selected</span>
          <CloseIcon className="ml-2 size-4 fill-neutral-100 text-neutral-100" />
        </div>
        <div className="flex items-center">
          <div>
            <Menu>
              <MenuTrigger>
                <ButtonIcon
                  icon="bullEye"
                  label="Status"
                  size={4}
                  ariaLabel="update status button"
                />
              </MenuTrigger>
              <MenuContent>
                <TasksStatusUpdater tasksId={checkedTasksIdSet} />
              </MenuContent>
            </Menu>
          </div>
          <div>
            <Menu>
              <MenuTrigger>
                <ButtonIcon
                  icon="date"
                  label="Dates"
                  size={4}
                  ariaLabel="update due Date button"
                />
              </MenuTrigger>
              <MenuContent>
                <TasksDateUpdater tasksId={checkedTasksIdSet} />
              </MenuContent>
            </Menu>
          </div>
          <div>
            <Menu>
              <MenuTrigger>
                <ButtonIcon
                  icon="flag"
                  label="Priority"
                  size={4}
                  ariaLabel="update priority button"
                />
              </MenuTrigger>
              <MenuContent>
                <TasksPriorityUpdater tasksId={checkedTasksIdSet} />
              </MenuContent>
            </Menu>
          </div>
          <div onClick={handleDelete}>
            <ToolTip>
              <ToolTipTrigger>
                <ButtonIcon
                  icon="trash"
                  iconColor="text-red-400"
                  size={4}
                  ariaLabel="delete selected tasks button"
                />
              </ToolTipTrigger>
              <ToolTipMessage>Delete</ToolTipMessage>
            </ToolTip>
          </div>
        </div>
      </div>,
      document.body,
    )
  );
}

export default TaskFeaturesRow;

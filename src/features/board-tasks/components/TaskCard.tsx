import TaskCardOptionsBtns from "@/features/board-tasks/components/TaskCardOptionsBtns";
import FeatureBar from "./BoardTaskFeatureBar";
import RenameTaskForm from "@/shared/tasks/components/RenameTaskForm";
import { useTaskContext } from "@/shared/tasks/components/TaskProvider";
import { useDraggable } from "@dnd-kit/core";
import { memo, useCallback, useMemo } from "react";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
} from "@/components/ui/DropdownCompound";
import { Task } from "@/shared/tasks/types/task.types";

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
  const { isRenameOpen, taskContainerRef } = useTaskContext();
  const { name, id, status } = task;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { status },
  });

  const setRefs = useCallback(
    (element: HTMLDivElement) => {
      taskContainerRef.current = element;
      setNodeRef(element);
    },
    [setNodeRef, taskContainerRef],
  );

  const styles = useMemo(
    () =>
      transform
        ? { transform: `transform3d(${transform.x}px, ${transform.y}px, 0)` }
        : undefined,
    [transform],
  );

  return (
    <Dropdown isAbsolute={true}>
      <DropdownTrigger>
        <div
          ref={setRefs}
          {...listeners}
          {...attributes}
          style={styles}
          className={`group flex w-full cursor-pointer flex-col gap-3 rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 transition duration-300 hover:border-neutral-500 active:border-neutral-500`}
        >
          {isRenameOpen ? (
            <RenameTaskForm />
          ) : (
            <div className="flex justify-between">
              <span className="line-clamp-2 grow-0 text-sm font-medium text-neutral-50 transition duration-300 group-hover:text-neutral-300 group-active:text-neutral-300">
                {name}
              </span>
              <DropdownMenu>
                <TaskCardOptionsBtns />
              </DropdownMenu>
            </div>
          )}
          <div className="flex items-center gap-1">
            <FeatureBar shape="buttonIcon" />
          </div>
        </div>
      </DropdownTrigger>
    </Dropdown>
  );
}

export default memo(TaskCard);

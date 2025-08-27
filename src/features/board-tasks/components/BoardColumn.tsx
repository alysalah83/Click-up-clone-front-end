"use client";

import AddButton from "@/components/common/AddButton";
import RowAddNew from "@/components/common/RowAddNew";
import StatusCard from "@/shared/tasks/components/StatusCard";
import TaskCard from "./TaskCard";
import AddTaskCard from "./AddTaskCard";
import { useBoard } from "./BoardContext";
import { useTasksContext } from "../../../shared/tasks/components/TasksProvider";
import TaskProvider from "@/shared/tasks/components/TaskProvider";
import { useDroppable } from "@dnd-kit/core";
import { memo, useMemo } from "react";
import { TaskStatus } from "@/shared/tasks/types/task.types";
import SkeletonLoader from "@/components/ui/SkeletonLoader";

interface BoardColumnProps {
  column: { type: TaskStatus; bgColor: string };
}

function BoardColumn({ column }: BoardColumnProps) {
  const { type, bgColor } = column;
  const { activeAddTaskPanel, handleOpenAddTaskPanel } = useBoard();
  const { tasks, tasksIsPending } = useTasksContext();
  const onOpenAddTaskPanel = () => handleOpenAddTaskPanel(type);
  const isAddTaskPanelOpened = activeAddTaskPanel === type;
  const statusTypeTasks = tasks?.filter((task) => task.status === type);
  const tasksCount = useMemo(() => statusTypeTasks?.length, [statusTypeTasks]);

  const { isOver, setNodeRef } = useDroppable({ id: type });

  return (
    <div
      ref={setNodeRef}
      className={`flex h-fit max-h-full w-2xs flex-col gap-1 overflow-y-auto rounded-lg p-1 ${bgColor} ${isOver ? "ring-2 ring-neutral-300 outline-0 dark:ring-neutral-700" : ""} transition-all duration-200`}
    >
      <header className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <StatusCard type={type} />
          <span className="text-sm text-neutral-600/80 dark:text-neutral-400/80">
            {tasksCount}
          </span>
        </div>
        <AddButton
          onClick={onOpenAddTaskPanel}
          toolTipMessage="Add Task"
          ariaLabel="add task button"
        />
      </header>

      {tasksIsPending ? (
        <SkeletonLoader height="h-22" width="w-full" count={6} />
      ) : (
        statusTypeTasks?.map((task) => (
          <TaskProvider task={task} key={task.id}>
            <TaskCard task={task} />
          </TaskProvider>
        ))
      )}
      {isAddTaskPanelOpened && (
        <AddTaskCard
          taskStatus={type}
          isAddTaskPanelOpened={isAddTaskPanelOpened}
        />
      )}
      <RowAddNew onClick={onOpenAddTaskPanel} label="Add Task" />
    </div>
  );
}

export default memo(BoardColumn);

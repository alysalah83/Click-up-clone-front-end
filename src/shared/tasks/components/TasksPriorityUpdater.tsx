"use client";

import { useParams } from "next/navigation";
import { TaskPriority } from "../types/task.types";
import { useUpdateTasks } from "../hooks/useUpdateTasks";
import TaskPriorityMenuList from "./TaskPriorityMenuList";

function TasksPriorityUpdater({ tasksId }: { tasksId: Set<string> }) {
  const { listId } = useParams<{ listId: string }>();
  const { updateTasks } = useUpdateTasks({ listId });

  const updatePriorities = (priority: TaskPriority) =>
    updateTasks({
      tasksId,
      updatedTasksFields: {
        priority,
      },
    });

  return <TaskPriorityMenuList action={updatePriorities} />;
}

export default TasksPriorityUpdater;

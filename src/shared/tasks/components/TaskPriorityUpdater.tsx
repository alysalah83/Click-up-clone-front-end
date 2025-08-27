"use client";

import { useUpdateTask } from "../hooks/useUpdateTask";
import { useParams } from "next/navigation";
import { useTaskContext } from "./TaskProvider";
import { TaskPriority } from "../types/task.types";
import TaskPriorityMenuList from "./TaskPriorityMenuList";

function TaskPriorityUpdater() {
  const {
    task: { id },
  } = useTaskContext();
  const { listId } = useParams<{ listId: string }>();
  const { updateTask } = useUpdateTask({ listId });

  const updatePriority = (priority: TaskPriority) =>
    updateTask({
      taskId: id,
      updatedTaskFields: {
        priority,
      },
    });

  return <TaskPriorityMenuList action={updatePriority} />;
}

export default TaskPriorityUpdater;

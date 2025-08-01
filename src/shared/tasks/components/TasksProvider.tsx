"use client";

import { createContext, ReactNode, use } from "react";
import useTasks from "../hooks/useTasks";
import { useParams } from "next/navigation";
import { Task } from "../types/task.types";

interface TaskProviderProps {
  children: ReactNode;
  token: string;
}

interface TaskContextValues {
  tasks: Task[] | undefined;
  tasksIsPending: boolean;
}
const TaskContext = createContext<TaskContextValues | null>(null);

function TasksProvider({ children, token }: TaskProviderProps) {
  const { listId } = useParams<{ listId: string }>();
  const { tasks, isPending } = useTasks({ listId, token });

  return (
    <TaskContext
      value={{
        tasks,
        tasksIsPending: isPending,
      }}
    >
      {children}
    </TaskContext>
  );
}

export function useTasksContext() {
  const values = use(TaskContext);
  if (!values)
    throw new Error("tasks context is being used outside of his scope");

  return values;
}

export default TasksProvider;

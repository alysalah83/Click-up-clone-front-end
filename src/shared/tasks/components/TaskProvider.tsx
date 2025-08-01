"use client";

import { createContext, use, useCallback, useRef, useState } from "react";
import { Task } from "../types/task.types";

interface TaskProviderProps {
  children: React.ReactNode;
  task: Task;
}

interface TaskContextValues {
  task: Task;
  isRenameOpen: boolean;
  taskContainerRef: React.RefObject<HTMLDivElement | null>;
  toggleIsRenameOpen: () => void;
}

const TaskContext = createContext<TaskContextValues | null>(null);

function TaskProvider({ children, task }: TaskProviderProps) {
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const taskContainerRef = useRef<HTMLDivElement | null>(null);
  const toggleIsRenameOpen = useCallback(
    () => setIsRenameOpen((cur) => !cur),
    [],
  );
  return (
    <TaskContext
      value={{ task, isRenameOpen, taskContainerRef, toggleIsRenameOpen }}
    >
      {children}
    </TaskContext>
  );
}

export function useTaskContext() {
  const values = use(TaskContext);
  if (!values)
    throw new Error("task context is being used outside of his scope");
  return values;
}

export default TaskProvider;

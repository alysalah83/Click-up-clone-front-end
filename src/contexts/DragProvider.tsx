"use client";

import { useUpdateTask } from "@/shared/tasks/hooks/useUpdateTask";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import TaskProvider from "@/shared/tasks/components/TaskProvider";
import { useTasksContext } from "@/shared/tasks/components/TasksProvider";
import TaskCard from "@/features/board-tasks/components/TaskCard";
import { Task, TaskStatus } from "@/shared/tasks/types/task.types";

interface DragProviderProps {
  children: ReactNode;
}

function DragProvider({ children }: DragProviderProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { listId } = useParams<{ listId: string }>();
  const { updateTask } = useUpdateTask({ listId });
  const { tasks } = useTasksContext();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  if (!isMounted) return null;

  const handleDragStart = (e: DragStartEvent) => {
    const task = tasks?.find((task) => task.id === e.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    console.log(e);
    if (
      e.over &&
      e.active.data.current &&
      e.over.id !== e.active.data.current.status
    ) {
      updateTask({
        taskId: e.active.id as string,
        updatedTaskFields: { status: e.over.id as TaskStatus },
      });
    }
    setActiveTask(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragOverlay>
        {activeTask && (
          <TaskProvider task={activeTask}>
            <TaskCard task={activeTask} />
          </TaskProvider>
        )}
      </DragOverlay>
    </DndContext>
  );
}

export default DragProvider;

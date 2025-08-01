"use client";

import { RefObject, useCallback, useEffect, useState } from "react";
import { TaskPriority, TaskStatus } from "../types/task.types";
import { useParams } from "next/navigation";
import { useAddTask } from "./useAddTask";

interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface UseClientAddTaskProps {
  curStatus?: TaskStatus;
  isAddTaskOpen: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
}

const initPriority = "none";

export function useClientAddTask({
  curStatus = "toDo",
  isAddTaskOpen,
  containerRef,
  onClose,
}: UseClientAddTaskProps) {
  const [nameValue, setNameValue] = useState("");
  const [status, setStatus] = useState<TaskStatus>(curStatus);
  const [priority, setPriority] = useState<TaskPriority>(initPriority);
  const [{ startDate, endDate }, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const { listId } = useParams<{ listId: string }>();
  const { addTask } = useAddTask(listId);
  const isNameValid = nameValue.trim().length > 0;

  const handleRestAddTaskForm = useCallback(() => {
    setNameValue("");
    setStatus(curStatus);
    setPriority(initPriority);
    setDateRange({ startDate: new Date(), endDate: new Date() });
  }, [curStatus]);

  const handleAddTask: React.FormEventHandler<HTMLFormElement> = function (e) {
    e?.preventDefault();
    addTask({
      listId,
      name: nameValue,
      status,
      priority,
      startDate,
      endDate,
    });
    handleRestAddTaskForm();
  };

  const handleNameChange = (nameValue: string) => setNameValue(nameValue);
  const handleStatusChange = (status: TaskStatus) => setStatus(status);
  const handlePriorityChange = (priority: TaskPriority) =>
    setPriority(priority);
  const handleDateChange = (dateRange: DateRange) => setDateRange(dateRange);

  useEffect(() => {
    const handleClickOutSide = function (e: MouseEvent) {
      if (!isAddTaskOpen) return;
      if (
        e.target instanceof Node &&
        containerRef.current &&
        containerRef.current.contains(e.target)
      )
        return;
      else onClose();
    };
    document.addEventListener("click", handleClickOutSide);

    return () => document.removeEventListener("click", handleClickOutSide);
  }, [isAddTaskOpen, onClose, containerRef]);

  return {
    nameValue,
    isNameValid,
    handleNameChange,
    status,
    handleStatusChange,
    priority,
    handlePriorityChange,
    startDate,
    endDate,
    handleDateChange,
    handleAddTask,
  };
}

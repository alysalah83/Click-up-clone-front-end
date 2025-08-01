import z from "zod";
import { createTaskSchema, taskSchema } from "../validations/taskSchema";

type TaskStatus = "toDo" | "inProgress" | "complete";
type TaskPriority = "urgent" | "high" | "normal" | "low" | "none";
type StartDate = Date | null;
type EndDate = Date | null;

interface Task {
  id: string;
  name: string;
  status: TaskStatus;
  priority: TaskPriority;
  listId: string;
  startDate: StartDate;
  endDate: EndDate;
  createdAt: Date;
}

interface TasksCount {
  completeCount: number;
  inProgressCount: number;
  toDoCount: number;
  totalCount: number;
}

interface TasksPriorityCount {
  urgent: number;
  high: number;
  normal: number;
  low: number;
  none: number;
}

type ClientTask = z.infer<typeof taskSchema>;
type ClientCreatedTask = z.infer<typeof createTaskSchema>;

export type {
  Task,
  ClientTask,
  ClientCreatedTask,
  TaskPriority,
  TaskStatus,
  StartDate,
  EndDate,
  TasksCount,
  TasksPriorityCount,
};

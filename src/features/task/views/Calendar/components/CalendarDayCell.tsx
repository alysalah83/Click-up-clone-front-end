"use client";

import { Task } from "@/features/task/types";
import CalendarTaskRow from "./CalendarTaskRow";

import AddTaskButton from "./AddTaskButton";
import { format } from "date-fns";

interface CalendarDayCellProps {
  day: number | null;
  isToday: boolean;
  isCurrentMonth: boolean;
  cellDate: Date;
  tasks: Task[];
  isFirstweek: boolean;
}

function CalendarDayCell({
  day,
  isToday,
  isCurrentMonth,
  cellDate,
  isFirstweek,
  tasks,
}: CalendarDayCellProps) {
  if (day === null) {
    return (
      <div className="min-h-[120px] min-w-[120px] border-r border-b border-neutral-200 bg-neutral-50/50 sm:min-w-[140px] dark:border-neutral-700 dark:bg-neutral-900/30" />
    );
  }

  return (
    <div
      className={`flex h-full min-h-[120px] min-w-[120px] shrink-0 flex-col gap-1 border-r border-b border-neutral-200 p-1.5 sm:min-w-[140px] dark:border-neutral-700 ${
        isCurrentMonth
          ? "bg-neutral-50/50 dark:bg-neutral-900/30"
          : "bg-white dark:bg-neutral-900"
      }`}
    >
      <div className="flex w-full items-center gap-2">
        {isFirstweek && (
          <p className="truncate text-xs font-medium capitalize text-neutral-400 sm:text-sm">
            {format(cellDate, "EEEE")}
          </p>
        )}
        <span
          className={`ml-auto flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
            isToday
              ? "bg-indigo-600 text-white"
              : "text-neutral-500 dark:text-neutral-400"
          }`}
        >
          {day}
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-x-hidden overflow-y-auto">
        {tasks.map((task) => (
          <CalendarTaskRow key={task.id} task={task} />
        ))}
      </div>
      <div className="mt-auto flex w-full justify-end">
        <AddTaskButton cellDate={cellDate} />
      </div>
    </div>
  );
}

export default CalendarDayCell;

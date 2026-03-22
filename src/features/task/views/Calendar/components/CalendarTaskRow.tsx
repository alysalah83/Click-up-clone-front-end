"use client";

import { Task } from "@/features/task/types";
import { CALENDER_PRIORITY_COLORS } from "../calendar.consts";

function CalendarTaskRow({ task }: { task: Task }) {
  const colorClasses = CALENDER_PRIORITY_COLORS[task.priority];

  return (
    <div
      className={`shrink-0 truncate rounded-md border-l-2 px-2 py-1 text-sm font-medium ${colorClasses}`}
      title={task.name}
    >
      {task.name}
    </div>
  );
}

export default CalendarTaskRow;

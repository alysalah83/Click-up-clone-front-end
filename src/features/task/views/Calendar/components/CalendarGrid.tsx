import { Task } from "@/features/task/types";
import {
  lastDayOfMonth,
  getDate,
  isToday,
  isSameMonth,
  isSameDay,
} from "date-fns";
import CalendarDayCell from "./CalendarDayCell";

function CalendarGrid({
  currentDate,
  tasks,
}: {
  currentDate: Date;
  tasks: Task[];
}) {
  const endDayOfMonth = getDate(lastDayOfMonth(currentDate));
  const isCurMonth = isSameMonth(currentDate, new Date());

  return (
    <section className="min-h-0 flex-1 overflow-x-auto overflow-y-auto">
      <div className="grid min-h-full min-w-[840px] grid-cols-7 grid-rows-5">
        {Array.from({ length: endDayOfMonth }, (_v, i) => i + 1).map((day) => {
          const cellDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day,
          );
          const isDateToday = isToday(cellDate);
          const cellCurTasks = tasks.filter((task) =>
            isSameDay(cellDate, task.startDate!),
          );
          const isFirstweek = 7 >= day;
          return (
            <CalendarDayCell
              day={day}
              isToday={isDateToday}
              isCurrentMonth={isCurMonth}
              cellDate={cellDate}
              tasks={cellCurTasks}
              isFirstweek={isFirstweek}
              key={`${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`}
            />
          );
        })}
      </div>
    </section>
  );
}

export default CalendarGrid;

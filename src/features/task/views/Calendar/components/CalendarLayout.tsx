"use client";

import useTasks from "../../../hooks/useTasks";
import CalendarGrid from "./CalendarGrid";
import CalendarHeader from "./CalendarHeader";
import { useState } from "react";

function CalendarLayout() {
  const { tasks, isPending } = useTasks();
  const tasksHasDates = tasks?.filter((task) => task.startDate);
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  });

  const handlePrevMonth = () =>
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));

  const handleNextMonth = () =>
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));

  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      {!isPending && (
        <CalendarGrid currentDate={currentDate} tasks={tasksHasDates ?? []} />
      )}
    </section>
  );
}

export default CalendarLayout;

"use client";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useState } from "react";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { useMenu } from "@/shared/ui/Menu/MenuCompound";
import DatePicker from "./DatePicker";
import { useTask } from "../context/TaskProvider";

function DateUpdater() {
  const { updateTask } = useUpdateTask();
  const {
    task: { id, startDate, endDate },
  } = useTask();
  const { toggleMenu } = useMenu();
  const [date, setDate] = useState([
    {
      startDate: startDate || new Date(),
      endDate: endDate || new Date(),
      key: "selection",
    },
  ]);

  const handleUpdateDate = function (datesRange?: {
    startDate?: Date;
    endDate?: Date;
  }) {
    const newDates = datesRange ?? { startDate: null, endDate: null };

    updateTask({
      taskId: id,
      updateTaskInput: newDates,
    });
    toggleMenu();
  };

  return <DatePicker action={handleUpdateDate} date={date} setDate={setDate} />;
}
export default DateUpdater;

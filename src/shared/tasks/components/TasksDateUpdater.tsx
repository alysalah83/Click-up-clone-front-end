import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useMenu } from "@/components/ui/MenuCompound";
import { useUpdateTasks } from "../hooks/useUpdateTasks";
import DatePicker from "./DatePicker";

function TasksDateUpdater({ tasksId }: { tasksId: Set<string> }) {
  const { listId } = useParams<{ listId: string }>();
  const { updateTasks } = useUpdateTasks({ listId });
  const { toggleMenu } = useMenu();
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleUpdateDates = function (datesRange?: {
    startDate?: Date;
    endDate?: Date;
  }) {
    const newDates = datesRange ?? { startDate: null, endDate: null };

    updateTasks({
      tasksId,
      updatedTasksFields: newDates,
    });
    toggleMenu();
  };

  return (
    <DatePicker action={handleUpdateDates} date={date} setDate={setDate} />
  );
}
export default TasksDateUpdater;

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useState } from "react";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { useParams } from "next/navigation";
import { useMenu } from "@/components/ui/MenuCompound";
import { useTaskContext } from "./TaskProvider";
import DatePicker from "./DatePicker";

function TaskDateUpdater() {
  const { listId } = useParams<{ listId: string }>();
  const { updateTask } = useUpdateTask({ listId });
  const {
    task: { id, startDate, endDate },
  } = useTaskContext();
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
      updatedTaskFields: newDates,
    });
    toggleMenu();
  };

  return <DatePicker action={handleUpdateDate} date={date} setDate={setDate} />;
}
export default TaskDateUpdater;

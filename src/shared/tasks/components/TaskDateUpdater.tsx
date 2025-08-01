import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useState } from "react";
import { DateRange } from "react-date-range";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { useParams } from "next/navigation";
import { useMenu } from "@/components/ui/MenuCompound";
import { useTaskContext } from "./TaskProvider";
import Button from "@/components/common/Button";

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

  const handleUpdateDates = function (datesRange?: {
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

  return (
    <div className="flex flex-col">
      <DateRange
        editableDateInputs={true}
        onChange={(item) => {
          const { startDate, endDate, key } = item.selection;
          setDate([
            {
              startDate: startDate || new Date(),
              endDate: endDate || new Date(),
              key: key || "selection",
            },
          ]);
        }}
        moveRangeOnFirstSelection={false}
        ranges={date}
        rangeColors={["#525252"]}
      />
      <div className="flex gap-2 rounded-b-xl border-t border-neutral-400 bg-neutral-800 px-4 py-4">
        <Button
          size="large"
          ariaLabel="clear task date"
          stretch={true}
          onClick={() => handleUpdateDates()}
          type="secondary"
        >
          Clear
        </Button>
        <Button
          size="large"
          ariaLabel="confirm task date"
          stretch={true}
          onClick={() =>
            handleUpdateDates({
              startDate: date[0].startDate,
              endDate: date[0].endDate,
            })
          }
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
export default TaskDateUpdater;

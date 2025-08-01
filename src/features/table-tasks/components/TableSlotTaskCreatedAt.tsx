import { useTaskContext } from "@/shared/tasks/components/TaskProvider";
import { getformatDate } from "@/utils/helper";
import { slotPaddingClasses } from "../styles/style";
import { memo } from "react";

function TableSlotTaskCreatedAt() {
  const {
    task: { createdAt },
  } = useTaskContext();

  return (
    <div
      className={`col-span-5 flex cursor-default items-center text-neutral-400 tabular-nums ${slotPaddingClasses}`}
    >
      <p>{getformatDate(createdAt)}</p>
    </div>
  );
}

export default memo(TableSlotTaskCreatedAt);

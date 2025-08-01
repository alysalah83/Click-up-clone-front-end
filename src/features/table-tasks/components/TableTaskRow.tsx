import { Task } from "@/shared/tasks/types/task.types";
import { memo, useState } from "react";
import { useCheckTask } from "../context/CheckTaskProvider";
import TableSlotTaskName from "./TableSlotTaskName";
import TableSlotTaskDate from "./TableSlotTaskDate";
import TableSlotPriority from "./TableSlotPriority";
import TableSlotCheckBox from "./TableSlotCheckBox";
import TableSlotTaskStatus from "./TableSlotTaskStatus";
import TableSlotTaskCreatedAt from "./TableSlotTaskCreatedAt";
import { tableGrid } from "../styles/style";

function TableTaskRow({ task, sortNum }: { task: Task; sortNum: number }) {
  const { id } = task;
  const { checkedTasksIdSet } = useCheckTask();
  const isTaskChecked = checkedTasksIdSet.has(id);

  const [isTaskRowHovered, setIsTaskRowHovered] = useState(false);
  const handleTaskRowHovered = () => setIsTaskRowHovered(true);
  const handleTaskRowNotHovered = () => setIsTaskRowHovered(false);

  return (
    <main
      onMouseEnter={handleTaskRowHovered}
      onTouchStart={handleTaskRowHovered}
      onMouseLeave={handleTaskRowNotHovered}
      onTouchEnd={handleTaskRowNotHovered}
      className={`${tableGrid} border-b border-neutral-700 ${isTaskChecked ? "bg-neutral-500/30" : "bg-neutral-900/50 hover:bg-neutral-500/20 active:bg-neutral-500/20"} text-sm font-medium text-neutral-300 transition duration-300`}
    >
      <TableSlotCheckBox
        isTaskRowHovered={isTaskRowHovered}
        sortNum={sortNum}
      />
      <TableSlotTaskName />
      <TableSlotTaskStatus />
      <TableSlotTaskDate />
      <TableSlotPriority />
      <TableSlotTaskCreatedAt />
    </main>
  );
}

export default memo(TableTaskRow);

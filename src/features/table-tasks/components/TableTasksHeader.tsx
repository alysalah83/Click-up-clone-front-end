"use client";

import CheckBox from "@/components/ui/CheckBox";
import { useCheckTask } from "../context/CheckTaskProvider";
import {
  tableHoverClasses,
  slotBorderClasses,
  slotPaddingClasses,
  tableGrid,
} from "../styles/style";
import TableSortButton from "../../../shared/tasks/components/TaskSortButton";

function TableTasksHeader() {
  const { handleCheckAll, isAllChecked } = useCheckTask();

  if (isAllChecked === undefined) return;

  return (
    <header
      className={`${tableGrid} bg-neutral-800/50 text-sm font-semibold text-neutral-500`}
    >
      <div className="col-span-1 flex items-center justify-center border-r border-neutral-600">
        <CheckBox isChecked={isAllChecked} onClick={handleCheckAll} />
      </div>
      <div
        className={`col-span-4 ${slotBorderClasses} ${slotPaddingClasses} ${tableHoverClasses}`}
      >
        Name
      </div>
      <div
        className={`col-span-3 flex items-center gap-2 ${slotBorderClasses} ${slotPaddingClasses} ${tableHoverClasses}`}
      >
        <span>Status</span>
        <TableSortButton sortingFor="status" />
      </div>
      <div
        className={`col-span-3 flex items-center gap-2 ${slotBorderClasses} ${slotPaddingClasses} ${tableHoverClasses}`}
      >
        <span>Due date</span>
        <TableSortButton sortingFor="dueDate" />
      </div>
      <div
        className={`col-span-3 flex items-center gap-2 ${slotBorderClasses} ${slotPaddingClasses} ${tableHoverClasses}`}
      >
        <span>Priority</span>
        <TableSortButton sortingFor="priority" />
      </div>
      <div
        className={`col-span-5 flex items-center gap-2 ${slotPaddingClasses} ${tableHoverClasses}`}
      >
        <span>Created at</span>
        <TableSortButton sortingFor="createdAt" />
      </div>
    </header>
  );
}

export default TableTasksHeader;

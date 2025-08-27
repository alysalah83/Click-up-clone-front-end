import CheckBox from "@/components/ui/CheckBox";
import { useCheckTask } from "../context/CheckTaskProvider";
import { useTaskContext } from "@/shared/tasks/components/TaskProvider";
import { memo } from "react";

function TableSlotCheckBox({
  isTaskRowHovered,
  sortNum,
}: {
  isTaskRowHovered: boolean;
  sortNum: number;
}) {
  const { checkedTasksIdSet, handleCheckTask } = useCheckTask();
  const {
    task: { id },
  } = useTaskContext();

  const isTaskChecked = checkedTasksIdSet.has(id);

  return (
    <div className="col-span-1 flex items-center justify-center border-r border-neutral-300 dark:border-neutral-700">
      {isTaskChecked || isTaskRowHovered ? (
        <CheckBox
          isChecked={isTaskChecked}
          onClick={handleCheckTask.bind(null, id)}
        />
      ) : (
        <span className="tabular-nums">{sortNum}</span>
      )}
    </div>
  );
}

export default memo(TableSlotCheckBox);

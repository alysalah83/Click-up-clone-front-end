import { ICONS_MAP } from "@/constants/iconsMap";
import { TASK_STATUS } from "../consts/task.consts";
import { hoverElementClasses } from "@/constants/styles";
import { useTaskContext } from "./TaskProvider";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { useParams } from "next/navigation";
import { TaskStatus } from "../types/task.types";
import { useMenu } from "@/components/ui/MenuCompound";

function TaskStatusUpdater() {
  const { toDo, inProgress, complete } = TASK_STATUS;
  const {
    task: { id },
  } = useTaskContext();
  const { listId } = useParams<{ listId: string }>();
  const { updateTask } = useUpdateTask({ listId });
  const { toggleMenu } = useMenu();

  const handleUpdateTask = (status: TaskStatus) => {
    updateTask({ taskId: id, updatedTaskFields: { status } });
    toggleMenu();
  };

  return (
    <ul className="min-w-56">
      <li className="flex w-full flex-col gap-2 border-b border-neutral-700 px-3 py-3">
        <h4 className="ml-2 text-sm font-medium text-neutral-500">
          Not started
        </h4>
        <div
          className={`flex w-full items-center gap-1.5 rounded-lg p-2 transition duration-300 ${hoverElementClasses}`}
          onClick={() => handleUpdateTask("toDo")}
        >
          <ICONS_MAP.circleDotted className={`${toDo.color} size-4`} />
          <span className="font-medium uppercase">{toDo.name}</span>
        </div>
      </li>
      <li className="flex w-full flex-col gap-2 border-b border-neutral-700 px-3 py-3">
        <h4 className="ml-2 text-sm font-medium text-neutral-500">Active</h4>
        <div
          className={`flex w-full items-center gap-1.5 rounded-lg p-2 transition duration-300 ${hoverElementClasses}`}
          onClick={() => handleUpdateTask("inProgress")}
        >
          <ICONS_MAP.inProgress className={`${inProgress.color} size-4`} />
          <span className="font-medium uppercase">{inProgress.name}</span>
        </div>
      </li>
      <li className="w-full px-3 py-3">
        <div
          className={`flex w-full items-center gap-1.5 rounded-lg p-2 transition duration-300 ${hoverElementClasses}`}
          onClick={() => handleUpdateTask("complete")}
        >
          <ICONS_MAP.complete className={`${complete.color} size-4`} />
          <span className="font-medium uppercase">{complete.name}</span>
        </div>
      </li>
    </ul>
  );
}

export default TaskStatusUpdater;

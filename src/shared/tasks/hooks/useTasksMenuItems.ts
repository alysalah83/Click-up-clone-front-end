import { IconsMap } from "@/types/index.types";
import { useTaskContext } from "../components/TaskProvider";
import { useDeleteTask } from "./useDeleteTask";
import { useParams } from "next/navigation";

export function useTasksMenuItems() {
  const {
    toggleIsRenameOpen,
    task: { id },
  } = useTaskContext();
  const { listId } = useParams<{ listId: string }>();
  const { deleteTask } = useDeleteTask({ listId });
  const deletedTaskWithId = deleteTask.bind(null, { taskId: id });

  const TASK_SHOW_MORE_MENU_ITEMS = [
    {
      icon: "pen" as IconsMap,
      label: "Rename",
      color: null,
      display: null,
      action: toggleIsRenameOpen,
    },
    {
      icon: "trash" as IconsMap,
      label: "Delete",
      color: "text-red-400/80",
      display: null,
      action: deletedTaskWithId,
    },
  ] as const;

  return TASK_SHOW_MORE_MENU_ITEMS;
}

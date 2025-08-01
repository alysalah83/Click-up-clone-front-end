import Button from "@/components/common/Button";
import { useBoard } from "./BoardContext";
import BoardTaskFeatureBar from "./BoardTaskFeatureBar";
import { ICONS_MAP } from "@/constants/iconsMap";
import { FormEventHandler, useState } from "react";
import { useParams } from "next/navigation";
import { useAddTask } from "@/shared/tasks/hooks/useAddTask";
import { TaskStatus } from "@/shared/tasks/types/task.types";

interface AddTaskProps {
  taskStatus: TaskStatus;
}

function AddTaskCard({ taskStatus }: AddTaskProps) {
  const { listId } = useParams<{ listId: string }>();
  const { taskPanelRef, handleCloseAddTaskPanel } = useBoard();
  const [nameValue, setNameValue] = useState("");
  const { addTask } = useAddTask(listId);
  const isVialed = nameValue.trim().length > 0;

  const handleAddTask: FormEventHandler<HTMLFormElement> = function (e) {
    e.preventDefault();
    if (!isVialed) return;

    addTask(
      { listId, name: nameValue, status: taskStatus },

      {
        onError(error, erroredTask) {
          setNameValue(erroredTask.name);
        },
      },
    );
    setNameValue("");
  };

  return (
    <form
      className="flex flex-col gap-3 rounded-lg border border-neutral-500 bg-neutral-900 p-2 text-neutral-400/80"
      ref={taskPanelRef}
      onKeyDown={(e) => {
        if (e.key === "Escape") return handleCloseAddTaskPanel();
        if (e.key === "enter") return handleAddTask(e);
      }}
      onSubmit={handleAddTask}
    >
      <div className="flex items-center gap-2">
        <input
          autoFocus
          name="name"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
          type="text"
          placeholder="Task Name..."
          className="w-full px-1 py-1 text-sm text-neutral-100 outline-0"
        />
        <Button
          ariaLabel="save new task button"
          size="small"
          disabled={!isVialed}
        >
          <span className="flex items-center gap-1">
            <span>Save</span>
            <ICONS_MAP.leftArrow className="size-3 fill-neutral-900 text-neutral-900" />
          </span>
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <BoardTaskFeatureBar shape="buttonIconWithLabel" />
      </div>
    </form>
  );
}

export default AddTaskCard;

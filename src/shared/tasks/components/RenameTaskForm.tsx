"use client";

import RenameForm from "@/shared/options-menu/components/RenameForm";
import { useTaskContext } from "./TaskProvider";
import { useParams } from "next/navigation";
import { useUpdateTask } from "../hooks/useUpdateTask";

function TaskName() {
  const {
    task: { name, id },
    toggleIsRenameOpen,
  } = useTaskContext();
  const { listId } = useParams<{ listId: string }>();
  const { updateTask } = useUpdateTask({ listId });

  const handleRenameList = (newName: string) => {
    updateTask({ taskId: id, updatedTaskFields: { name: newName } });

    toggleIsRenameOpen();
  };

  return (
    <RenameForm
      initialName={name}
      onClose={toggleIsRenameOpen}
      onSave={handleRenameList}
    />
  );
}

export default TaskName;

"use client";

import { updateWorkspace } from "@/features/workspace/actions/workspace.actions";
import { useWorkspace } from "./WorkspaceContext";
import RenameForm from "@/shared/options-menu/components/RenameForm";
import { memo, startTransition, useOptimistic } from "react";

function WorkspaceName() {
  const {
    workspace: { id, name },
    isRenameOpen,
    handleToggleIsRenameOpen,
  } = useWorkspace();

  const [optimisticName, setOptimisticName] = useOptimistic(name);

  const handleRenameWorkspace = (newName: string) => {
    handleToggleIsRenameOpen();

    startTransition(async () => {
      setOptimisticName(newName);
      const state = await updateWorkspace(id, { name: newName });

      if (state.status === "error") {
        setOptimisticName(name);
        window.toast?.error(state.error as string, 7);
        handleToggleIsRenameOpen();
      }
    });
  };

  return isRenameOpen ? (
    <RenameForm
      initialName={optimisticName}
      onClose={handleToggleIsRenameOpen}
      onSave={handleRenameWorkspace}
    />
  ) : (
    <span className="grow-0 truncate text-sm font-medium">
      {optimisticName}
    </span>
  );
}

export default memo(WorkspaceName);

"use client";

import { deleteWorkspace } from "@/features/workspace/actions/workspace.actions";
import OptionsDeleteConfirm from "@/shared/options-menu/components/OptionsDeleteConfirm";
import { useWorkspace } from "../contexts/WorkspaceProvider";

function DeleteWorkspaceConfirm() {
  const { id, name } = useWorkspace();
  const deleteWorkspaceWithId = deleteWorkspace.bind(null, id);

  return (
    <OptionsDeleteConfirm
      deleteAction={deleteWorkspaceWithId}
      deletedName={name}
    />
  );
}

export default DeleteWorkspaceConfirm;

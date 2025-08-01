"use client";

import { deleteWorkspace } from "@/features/workspace/actions/workspace.actions";
import { useWorkspace } from "./WorkspaceContext";
import OptionsDeleteConfirm from "@/shared/options-menu/components/OptionsDeleteConfirm";

function DeleteWorkspaceConfirm() {
  const {
    workspace: { id, name },
  } = useWorkspace();
  const deleteWorkspaceWithId = deleteWorkspace.bind(null, id);

  return (
    <OptionsDeleteConfirm
      deleteAction={deleteWorkspaceWithId}
      deletedName={name}
    />
  );
}

export default DeleteWorkspaceConfirm;

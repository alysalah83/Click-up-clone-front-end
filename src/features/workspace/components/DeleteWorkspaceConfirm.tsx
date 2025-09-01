"use client";

import { deleteWorkspace } from "@/features/workspace/actions/workspace.actions";
import OptionsDeleteConfirm from "@/shared/options-menu/components/OptionsDeleteConfirm";
import { useWorkspace } from "../contexts/WorkspaceProvider";
import { useParams } from "next/navigation";
import { LIST_ID_RESERVED_ROUTES } from "@/config/config";

function DeleteWorkspaceConfirm() {
  const { id, name } = useWorkspace();

  const { listId } = useParams<{ listId?: string }>();
  let activeListId: string | undefined | null = listId;
  if (LIST_ID_RESERVED_ROUTES.has(listId)) activeListId = null;

  const deleteWorkspaceWithId = deleteWorkspace.bind(null, {
    workspaceId: id,
    activeListId,
  });

  return (
    <OptionsDeleteConfirm
      deleteAction={deleteWorkspaceWithId}
      deletedName={name}
    />
  );
}

export default DeleteWorkspaceConfirm;

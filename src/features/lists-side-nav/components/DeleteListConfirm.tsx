"use client";

import { deleteList } from "../actions/list.actions";
import { useList } from "./ListContext";
import OptionsDeleteConfirm from "@/shared/options-menu/components/OptionsDeleteConfirm";

function DeleteListConfirm() {
  const {
    workspaceId,
    list: { id: listId, name },
  } = useList();
  const deleteListWithIds = deleteList.bind(null, workspaceId, listId);

  return (
    <OptionsDeleteConfirm deleteAction={deleteListWithIds} deletedName={name} />
  );
}

export default DeleteListConfirm;

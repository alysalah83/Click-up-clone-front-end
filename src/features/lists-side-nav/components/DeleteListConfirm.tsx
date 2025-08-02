"use client";

import { useParams } from "next/navigation";
import { deleteList } from "../actions/list.actions";
import { useList } from "./ListContext";
import OptionsDeleteConfirm from "@/shared/options-menu/components/OptionsDeleteConfirm";

function DeleteListConfirm() {
  const {
    workspaceId,
    list: { id: listId, name },
  } = useList();
  const { listId: ListIdParam } = useParams<{ listId: string }>();
  const isCurrentListIdDeleted = listId === ListIdParam;

  const deleteListWithIds = deleteList.bind(
    null,
    workspaceId,
    listId,
    isCurrentListIdDeleted,
  );

  return (
    <OptionsDeleteConfirm deleteAction={deleteListWithIds} deletedName={name} />
  );
}

export default DeleteListConfirm;

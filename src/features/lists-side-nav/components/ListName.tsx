"use client";

import RenameForm from "@/shared/options-menu/components/RenameForm";
import { startTransition, useOptimistic } from "react";
import { useList } from "./ListContext";
import Link from "next/link";
import { updateList } from "../actions/list.actions";

function ListName() {
  const {
    workspaceId,
    list: { name, id },
    isRenameOpen,
    handleToggleIsRenameOpen,
  } = useList();

  const [optimisticName, setOptimisticName] = useOptimistic(name);

  const handleRenameList = (newName: string) => {
    handleToggleIsRenameOpen();

    startTransition(async () => {
      setOptimisticName(newName);

      const state = await updateList(workspaceId, id, { name: newName });
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
      onSave={handleRenameList}
    />
  ) : (
    <Link href={`/home/${id}/board`} className="w-full">
      <span className="grow-0 truncate text-sm font-medium">
        {optimisticName}
      </span>
    </Link>
  );
}

export default ListName;

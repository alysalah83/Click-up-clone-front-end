"use client";

import CreateForm from "@/components/common/CreateForm";
import { useState } from "react";
import { createList } from "../actions/list.actions";

function CreateListForm({ workspaceId }: { workspaceId: string }) {
  const [nameValue, setNameValue] = useState("");

  const createListWithWorkspaceId = createList.bind(null, workspaceId);

  return (
    <CreateForm
      theAction={createListWithWorkspaceId}
      actionFor="list"
      headerTitle="Create List"
      headerText="All Lists are located within a Space. Lists can house any type of task."
      inputLabel="Name"
      inputPlaceholder="e.g. Project, List of items, Campaign"
      setInputValue={setNameValue}
      inputValue={nameValue}
    />
  );
}

export default CreateListForm;

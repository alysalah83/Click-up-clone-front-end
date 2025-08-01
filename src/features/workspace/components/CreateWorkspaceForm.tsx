"use client";

import { useState } from "react";
import WorkspaceAvatar from "./WorkspaceAvatar";
import { createWorkspace } from "@/features/workspace/actions/workspace.actions";
import { getRandomColor, getRandomLetter } from "../utils/helper";
import CreateForm from "@/components/common/CreateForm";
import { WorkspaceAvatarColors } from "../types/workspace.types";

function CreateWorkspaceForm() {
  const randomColor = getRandomColor();
  const randomLetter = getRandomLetter();
  const [selectedColor, setSelectedColor] =
    useState<WorkspaceAvatarColors>(randomColor);
  const [nameValue, setNameValue] = useState("");

  const workspaceLetter = nameValue.trim().at(0)?.toUpperCase() || randomLetter;

  const createWorkspaceWithAvatar = createWorkspace.bind(null, {
    letter: workspaceLetter,
    color: selectedColor,
  });

  const handleSelectColor = (color: WorkspaceAvatarColors) =>
    setSelectedColor(color);

  return (
    <CreateForm
      theAction={createWorkspaceWithAvatar}
      actionFor="workspace"
      headerTitle="Create a Space"
      headerText="A Space represents teams, departments, or groups, each with its own
        Lists, workflows, and settings."
      inputLabel="icon & name"
      inputPlaceholder="e.g. Marketing, Engineering, HR"
      setInputValue={setNameValue}
      inputValue={nameValue}
    >
      <WorkspaceAvatar
        avatarLetter={workspaceLetter}
        selectedColor={selectedColor}
        onSelectColor={handleSelectColor}
      />
    </CreateForm>
  );
}

export default CreateWorkspaceForm;

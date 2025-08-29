"use client";

import { useState } from "react";
import { createWorkspace } from "@/features/workspace/actions/workspace.actions";
import CreateForm from "@/components/common/CreateForm";
import AvatarPickerMenu from "@/shared/avatar-picker/components/AvatarPickerMenu";
import ColorsPicker from "@/shared/avatar-picker/components/ColorsPicker";
import IconPicker from "@/shared/avatar-picker/components/IconsPicker";
import { useAvatarPicker } from "@/shared/avatar-picker/hooks/useAvatarPicker";

function CreateWorkspaceForm() {
  const [nameValue, setNameValue] = useState("");
  const {
    avatarLetter,
    selectedColor,
    selectedIcon,
    setSelectedColor,
    setSelectedIcon,
  } = useAvatarPicker({ label: nameValue });

  const createWorkspaceWithAvatar = createWorkspace.bind(null, {
    icon: selectedIcon || avatarLetter,
    color: selectedColor,
  });

  console.log(selectedColor, selectedIcon);

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
      <AvatarPickerMenu
        selectedIcon={selectedIcon}
        selectedColor={selectedColor}
        avatarIcon={selectedIcon || avatarLetter}
      >
        <ColorsPicker
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />
        <IconPicker
          selectedIcon={selectedIcon}
          onSelectIcon={setSelectedIcon}
        />
      </AvatarPickerMenu>
    </CreateForm>
  );
}

export default CreateWorkspaceForm;

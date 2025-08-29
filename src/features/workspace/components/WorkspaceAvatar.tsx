"use client";

import { Menu, MenuTrigger, MenuContent } from "@/components/ui/MenuCompound";
import Avatar from "@/shared/avatar-picker/components/Avatar";
import { memo, useEffect, useState } from "react";
import WorkspaceEditAvatarMenu from "./WorkspaceEditAvatarMenu";
import {
  AvatarColors,
  AvatarIcons,
  AvatarLetters,
} from "@/shared/avatar-picker/types/avatarPicker.types";
import { updateWorkspace } from "../actions/workspace.actions";

function WorkspaceAvatar({
  currentColor,
  currentIcon,
  workspaceId,
}: {
  currentColor: AvatarColors;
  currentIcon: AvatarIcons | AvatarLetters;
  workspaceId: string;
}) {
  const [color, setColor] = useState(currentColor);
  const [icon, setIcon] = useState(currentIcon);

  useEffect(() => {
    updateWorkspace(workspaceId, {
      avatar: { color, icon },
    });
  }, [color, icon, workspaceId]);

  return (
    <Menu>
      <span>
        <MenuTrigger>
          <Avatar selectedColor={color} avatarContent={icon} />
        </MenuTrigger>
      </span>
      <MenuContent>
        <WorkspaceEditAvatarMenu
          currentColor={color}
          currentIcon={icon}
          onSelectColor={setColor}
          onSelectIcon={
            setIcon as React.Dispatch<React.SetStateAction<AvatarIcons | null>>
          }
        />
      </MenuContent>
    </Menu>
  );
}

export default memo(WorkspaceAvatar);

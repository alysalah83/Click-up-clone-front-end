"use client";

import { Menu, MenuTrigger, MenuContent } from "@/components/ui/MenuCompound";
import Avatar from "@/shared/avatar-picker/components/Avatar";
import { memo } from "react";
import WorkspaceEditAvatarMenu from "./WorkspaceEditAvatarMenu";
import { useWorkspaceAvatar } from "../contexts/WorkspaceAvatarProvider";

function WorkspaceAvatar() {
  const { icon, color, handleSelectIcon, handleSelectColor } =
    useWorkspaceAvatar();

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
          onSelectColor={handleSelectColor}
          onSelectIcon={handleSelectIcon}
        />
      </MenuContent>
    </Menu>
  );
}

export default memo(WorkspaceAvatar);

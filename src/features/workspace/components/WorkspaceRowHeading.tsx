"use client";

import { hoverElementClasses } from "@/constants/styles";
import { Menu, MenuContent, MenuTrigger } from "@/components/ui/MenuCompound";
import ButtonIcon from "@/components/common/ButtonIcon";
import { ICONS_SIZE } from "@/shared/options-menu/consts/consts";
import Modal, {
  ModalContent,
  ModalTrigger,
} from "@/components/ui/ModalCompound";
import AddButton from "@/components/common/AddButton";
import CreateListForm from "@/features/lists-side-nav/components/CreateListForm";
import {
  ToolTip,
  ToolTipMessage,
  ToolTipTrigger,
} from "@/components/ui/ToolTipCompound ";
import OptionsWorkspaceMenuItems from "./OptionsWorkspaceMenuItems";
import WorkspaceName from "./WorkspaceName";
import { useWorkspace } from "./WorkspaceContext";
import { Workspace } from "../types/workspace.types";
import Avatar from "@/shared/avatar-picker/components/Avatar";

function WorkspaceRowHeading({ workspace }: { workspace: Workspace }) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg px-2 py-1 transition duration-300 ${hoverElementClasses.replace("cursor-pointer", "cursor-default")}`}
    >
      <WorkspaceRowHeadingTitle workspace={workspace} />

      <WorkspaceRowHeadingButtons workspaceId={workspace.id} />
    </div>
  );
}

function WorkspaceRowHeadingTitle({ workspace }: { workspace: Workspace }) {
  const {
    avatar: { color, icon },
  } = workspace;
  const { isRenameOpen } = useWorkspace();

  return (
    <div
      className={`flex ${isRenameOpen ? "w-full" : "max-w-3/4"} items-center gap-2`}
    >
      <Avatar selectedColor={color} avatarContent={icon} />
      <WorkspaceName />
    </div>
  );
}

function WorkspaceRowHeadingButtons({ workspaceId }: { workspaceId: string }) {
  const { isRenameOpen } = useWorkspace();
  return (
    !isRenameOpen && (
      <div className="flex items-center gap-1">
        <Menu>
          <MenuTrigger>
            <ToolTip>
              <ToolTipTrigger>
                <ButtonIcon
                  icon="dotsRow"
                  ariaLabel="workspace show more button"
                  size={ICONS_SIZE}
                />
              </ToolTipTrigger>
              <ToolTipMessage>Space settings</ToolTipMessage>
            </ToolTip>
          </MenuTrigger>
          <MenuContent>
            <OptionsWorkspaceMenuItems />
          </MenuContent>
        </Menu>

        <Modal>
          <ModalTrigger>
            <AddButton
              toolTipMessage="Create list"
              ariaLabel="Create list button"
            />
          </ModalTrigger>
          <ModalContent contentYPosition="withTopMargin">
            <CreateListForm workspaceId={workspaceId} />
          </ModalContent>
        </Modal>
      </div>
    )
  );
}

export default WorkspaceRowHeading;

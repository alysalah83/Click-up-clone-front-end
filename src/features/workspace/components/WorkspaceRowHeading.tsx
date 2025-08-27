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
import { WORKSPACE_AVATAR_COLORS } from "../consts/workspace.consts";
import WorkspaceName from "./WorkspaceName";
import { useWorkspace } from "./WorkspaceContext";
import { Workspace } from "../types/workspace.types";

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
    avatar: { color, letter },
  } = workspace;
  const { isRenameOpen } = useWorkspace();

  return (
    <div
      className={`flex ${isRenameOpen ? "w-full" : "max-w-3/4"} items-center gap-2`}
    >
      <button
        type="button"
        className={`${WORKSPACE_AVATAR_COLORS[color].bg} shrink-0 cursor-pointer rounded-lg border border-neutral-300 px-2 py-1.5 text-lg leading-3.5 font-semibold text-neutral-100 transition duration-300 disabled:cursor-not-allowed disabled:opacity-70 dark:border-neutral-700`}
      >
        {letter.toUpperCase()}
      </button>

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

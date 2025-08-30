import { IconsMap } from "@/types/index.types";
import { UiForAction } from "@/shared/options-menu/types/types";
import DeleteWorkspaceConfirm from "../components/DeleteWorkspaceConfirm";
import WorkspaceEditAvatarOptions from "../components/WorkspaceEditAvatarOptions";
import { useRename } from "../contexts/RenameProvider";

export function useWorkspaceMenuItems() {
  const { handleToggleIsRenameOpen } = useRename();

  const WORKSPACE_SHOW_MORE_MENU_ITEMS = [
    {
      icon: "water" as IconsMap,
      label: "Icon & Color",
      color: null,
      display: {
        uiForAction: "menu" as UiForAction,
        ActionComponent: WorkspaceEditAvatarOptions,
      },
      action: null,
    },
    {
      icon: "pen" as IconsMap,
      label: "Rename",
      color: null,
      display: null,
      action: handleToggleIsRenameOpen,
    },
    {
      icon: "trash" as IconsMap,
      label: "Delete",
      color: "text-red-400/80",
      display: {
        uiForAction: "modal" as UiForAction,
        ActionComponent: DeleteWorkspaceConfirm,
      },
      action: null,
    },
  ] as const;

  return WORKSPACE_SHOW_MORE_MENU_ITEMS;
}

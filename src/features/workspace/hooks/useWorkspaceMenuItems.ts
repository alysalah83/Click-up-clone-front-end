import { IconsMap } from "@/types/index.types";
import { useWorkspace } from "../components/WorkspaceContext";
import { UiForAction } from "@/shared/options-menu/types/types";
import DeleteWorkspaceConfirm from "../components/DeleteWorkspaceConfirm";

export function useWorkspaceMenuItems() {
  const { handleToggleIsRenameOpen } = useWorkspace();

  const WORKSPACE_SHOW_MORE_MENU_ITEMS = [
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

import { UiForAction } from "@/shared/options-menu/types/types";
import { IconsMap } from "@/types/index.types";
import DeleteWorkspaceConfirm from "../components/DeleteWorkspaceConfirm";

export const WORKSPACE_ICONS_SIZE = 4;

export const WORKSPACE_SHOW_MORE_MENU_ITEMS = [
  {
    icon: "pen" as IconsMap,
    label: "Rename",
    color: null,
    display: null,
    action: null,
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

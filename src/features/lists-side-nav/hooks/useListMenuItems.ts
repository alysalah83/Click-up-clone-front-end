import { IconsMap } from "@/types/index.types";
import { useList } from "../components/ListContext";
import { UiForAction } from "@/shared/options-menu/types/types";
import DeleteListConfirm from "../components/DeleteListConfirm";

export function useListMenuItems() {
  const { handleToggleIsRenameOpen } = useList();

  const LIST_SHOW_MORE_MENU_ITEMS = [
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
        ActionComponent: DeleteListConfirm,
      },
      action: null,
    },
  ] as const;
  return LIST_SHOW_MORE_MENU_ITEMS;
}

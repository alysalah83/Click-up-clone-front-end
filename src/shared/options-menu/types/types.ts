import type { IconsMap } from "@/types/index.types";

type UiForAction = "modal" | "menu";

interface OptionsMenuItemProps {
  item: {
    icon: IconsMap;
    label: string;
    color: string | null;
    display: {
      uiForAction: string;
      ActionComponent: React.ComponentType;
    } | null;
    action: (() => void) | null;
  };
}

export type { UiForAction, OptionsMenuItemProps };

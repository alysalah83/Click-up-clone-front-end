import { ICONS_MAP } from "@/shared/icons/icons-map";
import * as ICONS from "react-icons/ti";

export const ICONS_LIBRARY = "Ti";

export const ICON_PICKER_LOAD_COUNT = 50;

export const ICONS_REGISTRY = {
  ...ICONS,
  circleDotted: ICONS_MAP.circleDotted,
  inProgress: ICONS_MAP.inProgress,
  complete: ICONS_MAP.complete,
} as const;

import { ICONS_MAP } from "@/constants/iconsMap";

type IconsMap = keyof typeof ICONS_MAP;
type StylesSizes = "small" | "medium" | "large";

type ActionStatus =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; error: string | undefined };

export type { IconsMap, StylesSizes, ActionStatus };

export const BOARD_TASK_ICON_SIZE = 3;

export const SKELTON_TASK_COUNT = 3;

export const TASK_OPTIONS_BTNS_SIZE = 3.5;

export const BOARD_COLUMNS = [
  { type: "toDo", bgColor: "bg-neutral-900" },
  { type: "inProgress", bgColor: "bg-violet-950/20" },
  { type: "complete", bgColor: "bg-emerald-900/20" },
] as const;

export const FEATURES = [
  { icon: "date", label: "Add date" },
  { icon: "flag", label: "Add priority" },
] as const;

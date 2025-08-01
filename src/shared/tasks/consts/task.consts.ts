const TASK_RENAME_FORM_ICON_SIZE = 3.5;

const TASK_PRIORITIES_LIST = [
  {
    iconColor: "fill-pink-500",
    label: "Urgent",
    colorHex: "#f6339a",
  },
  {
    iconColor: "fill-amber-500",
    label: "High",
    colorHex: "#fd9a00",
  },
  {
    iconColor: "fill-blue-500",
    label: "Normal",
    colorHex: "#2b7fff",
  },
  {
    iconColor: "fill-stone-500",
    label: "Low",
    colorHex: "#79716b",
  },
];

const TASK_STATUS = {
  toDo: {
    name: "to do",
    icon: "circleDotted",
    bgColor: "bg-neutral-700",
    color: "fill-neutral-600",
    status: "toDo",
    colorHex: "#525252",
  },
  inProgress: {
    name: "in progress",
    icon: "inProgress",
    bgColor: "bg-violet-700",
    color: "fill-violet-600",
    status: "inProgress",
    colorHex: "#7f22fe",
  },
  complete: {
    name: "complete",
    icon: "complete",
    bgColor: "bg-emerald-700",
    color: "fill-emerald-600",
    status: "complete",
    colorHex: "#009966",
  },
} as const;

export const FEATURES = [
  { icon: "date", label: "Add date" },
  { icon: "flag", label: "Add priority" },
] as const;

export { TASK_RENAME_FORM_ICON_SIZE, TASK_PRIORITIES_LIST, TASK_STATUS };

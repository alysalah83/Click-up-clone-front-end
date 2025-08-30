import { IconsMap } from "@/types/index.types";

export const MENU_ITEMS = [
  {
    icon: "home" as IconsMap,
    label: "Home",
    href: "/home",
    includedRoutes: ["/board", "/table", "/list", "/home/overview"],
  },
  {
    icon: "dashboard" as IconsMap,
    label: "DashBoard",
    href: "/home/dashboard",
  },
  {
    icon: "paintBrush" as IconsMap,
    label: "Whiteboard",
    href: "/home/whiteboard",
  },
];

export const HEADER_MENU = [
  {
    icon: "board",
    iconBgColor: "bg-blue-500",
    href: "/board",
    label: "Board",
  },
  {
    icon: "list",
    iconBgColor: "bg-emerald-500",
    href: "/table",
    label: "Table",
  },
  {
    icon: "list",
    iconBgColor: "bg-gray-500",
    href: "/list",
    label: "List",
  },
  {
    icon: "exclamationMark",
    iconBgColor: "bg-gray-500",
    href: "/overview",
    label: "Overview",
  },
] as const;

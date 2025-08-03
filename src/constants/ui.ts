export const MENU_ITEMS = [
  { icon: "home", label: "Home", href: "/home" },
  {
    icon: "dashboard",
    label: "DashBoard",
    href: "/home/dashboard",
  },
] as const;

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

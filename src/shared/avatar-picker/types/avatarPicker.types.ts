import { AVATAR_ICONS } from "../consts/avatar.consts";
import { avatarLetters } from "../utils/helper";

type AvatarColors = keyof typeof AVATAR_COLORS;
type AvatarIcons = keyof typeof AVATAR_ICONS;
type AvatarLetters = (typeof avatarLetters)[number];

const AVATAR_COLORS = {
  red: { bg: "bg-red-500", ring: "ring-red-500" },
  amber: { bg: "bg-amber-500", ring: "ring-amber-500" },
  lime: { bg: "bg-lime-500", ring: "ring-lime-500" },
  green: { bg: "bg-green-500", ring: "ring-green-500" },
  emerald: { bg: "bg-emerald-500", ring: "ring-emerald-500" },
  teal: { bg: "bg-teal-500", ring: "ring-teal-500" },
  cyan: { bg: "bg-cyan-500", ring: "ring-cyan-500" },
  blue: { bg: "bg-blue-500", ring: "ring-blue-500" },
  indigo: { bg: "bg-indigo-500", ring: "ring-indigo-500" },
  violet: { bg: "bg-violet-500", ring: "ring-violet-500" },
  purple: { bg: "bg-purple-500", ring: "ring-purple-500" },
  gray: { bg: "bg-gray-500", ring: "ring-gray-500" },
  stone: { bg: "bg-stone-500", ring: "ring-stone-500" },
} as const;

interface Avatar {
  color: AvatarColors;
  icon: AvatarIcons | AvatarLetters;
}

export { AVATAR_COLORS };
export type { AvatarColors, Avatar, AvatarIcons, AvatarLetters };

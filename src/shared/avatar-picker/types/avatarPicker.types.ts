import { AVATAR_ICONS } from "../consts/avatar.consts";
import { avatarLetters } from "../utils/helper";

type AvatarColors = keyof typeof AVATAR_COLORS;
type AvatarIcons = keyof typeof AVATAR_ICONS;
type AvatarLetters = (typeof avatarLetters)[number];

const AVATAR_COLORS = {
  red: { bg: "bg-red-600", ring: "ring-red-600" },
  amber: { bg: "bg-amber-600", ring: "ring-amber-600" },
  lime: { bg: "bg-lime-700", ring: "ring-lime-700" },
  green: { bg: "bg-green-700", ring: "ring-green-700" },
  emerald: { bg: "bg-emerald-600", ring: "ring-emerald-600" },
  teal: { bg: "bg-teal-600", ring: "ring-teal-600" },
  cyan: { bg: "bg-cyan-600", ring: "ring-cyan-600" },
  blue: { bg: "bg-blue-500", ring: "ring-blue-600" },
  indigo: { bg: "bg-indigo-600", ring: "ring-indigo-600" },
  violet: { bg: "bg-violet-600", ring: "ring-violet-600" },
  purple: { bg: "bg-purple-600", ring: "ring-purple-600" },
  gray: { bg: "bg-gray-500", ring: "ring-gray-500" },
  stone: { bg: "bg-stone-500", ring: "ring-stone-500" },
} as const;

interface Avatar {
  color: AvatarColors;
  icon: AvatarIcons | AvatarLetters;
}

export { AVATAR_COLORS };
export type { AvatarColors, Avatar, AvatarIcons, AvatarLetters };

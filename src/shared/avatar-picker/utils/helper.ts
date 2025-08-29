import { AVATAR_LIBRARY } from "../consts/avatar.consts";
import { AvatarIcons, AvatarLetters } from "../types/avatarPicker.types";

const avatarLetters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
] as const;

const isAvatarIcon = (label: AvatarIcons | AvatarLetters) => {
  return label?.startsWith(AVATAR_LIBRARY);
};

export { isAvatarIcon, avatarLetters };

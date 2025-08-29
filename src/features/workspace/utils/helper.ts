import {
  AVATAR_COLORS,
  AvatarColors,
} from "@/shared/avatar-picker/types/avatarPicker.types";
import { avatarLetters } from "@/shared/avatar-picker/utils/helper";

const getRandomColor = () => {
  const colorsArr = Object.entries(AVATAR_COLORS);
  const randomIndex = Math.floor(Math.random() * colorsArr.length);
  return colorsArr[randomIndex][0] as AvatarColors;
};

const getRandomLetter = () => {
  const randomIndex = Math.floor(Math.random() * avatarLetters.length);
  return avatarLetters[randomIndex];
};

export { getRandomColor, getRandomLetter };

import { WORKSPACE_AVATAR_COLORS } from "@/features/workspace/consts/workspace.consts";
import { WorkspaceAvatarColors } from "../types/workspace.types";

const letters = [
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

const getRandomColor = () => {
  const colorsArr = Object.entries(WORKSPACE_AVATAR_COLORS);
  const randomIndex = Math.floor(Math.random() * colorsArr.length);
  return colorsArr[randomIndex][0] as WorkspaceAvatarColors;
};

const getRandomLetter = () => {
  const randomIndex = Math.floor(Math.random() * letters.length);
  return letters[randomIndex];
};

export { getRandomColor, getRandomLetter };

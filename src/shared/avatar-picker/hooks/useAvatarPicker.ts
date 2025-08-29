"use client";

import {
  getRandomColor,
  getRandomLetter,
} from "@/features/workspace/utils/helper";
import { useState } from "react";
import {
  AvatarColors,
  AvatarIcons,
  AvatarLetters,
} from "../types/avatarPicker.types";

export function useAvatarPicker({ label }: { label: string }) {
  const randomColor = getRandomColor();
  const randomLetter = getRandomLetter();
  const [selectedColor, setSelectedColor] = useState<AvatarColors>(randomColor);
  const [selectedIcon, setSelectedIcon] = useState<AvatarIcons | null>(null);
  const avatarLetter = (label.trim().at(0)?.toUpperCase() ||
    randomLetter) as AvatarLetters;

  return {
    selectedColor,
    selectedIcon,
    setSelectedColor,
    setSelectedIcon,
    avatarLetter,
  };
}

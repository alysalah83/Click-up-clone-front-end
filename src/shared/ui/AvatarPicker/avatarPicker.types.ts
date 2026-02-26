import { ALPHABET_LETTERS } from "@/shared/constants/ui";
import Avatar from "./Avatar";
import {
  Avatar as AvatarModel,
  Prisma,
} from "@/../../Back-end/src/generated/prisma/client";
import { IconsRegistry } from "../IconPicker/types";
import { ColorsToken } from "../ColorPicker/types";

type AvatarLetters = (typeof ALPHABET_LETTERS)[number];

type Avatar = Omit<AvatarModel, "icon" | "color"> & {
  icon: IconsRegistry | AvatarLetters;
  color: ColorsToken;
};

type CreateAvatar = Prisma.AvatarCreateInput;

export type { Avatar, AvatarLetters, CreateAvatar };

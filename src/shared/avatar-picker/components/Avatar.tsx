import { memo } from "react";
import {
  AVATAR_COLORS,
  AvatarColors,
  AvatarIcons,
  AvatarLetters,
} from "../types/avatarPicker.types";
import { isAvatarIcon } from "../utils/helper";
import { AVATAR_ICONS as icons } from "../consts/avatar.consts";

interface AvatarProps {
  avatarContent: AvatarIcons | AvatarLetters;
  selectedColor: AvatarColors;
  disabled?: boolean;
}

function Avatar({ avatarContent, disabled, selectedColor }: AvatarProps) {
  const bgColor = AVATAR_COLORS[selectedColor].bg;
  const isIcon = isAvatarIcon(avatarContent);

  const Icon = isIcon ? icons[avatarContent as keyof typeof icons] : null;

  return (
    <button
      disabled={disabled}
      type="button"
      className={`${bgColor} shrink-0 cursor-pointer rounded-lg border border-neutral-300 p-1 text-lg leading-3.5 font-semibold text-neutral-100 transition duration-300 disabled:cursor-not-allowed disabled:opacity-70 dark:border-neutral-700`}
    >
      {isIcon ? (
        Icon && <Icon className="size-6 fill-neutral-300 text-neutral-300" />
      ) : (
        <p className="h-5 w-5 leading-5">{avatarContent}</p>
      )}
    </button>
  );
}

export default memo(Avatar);

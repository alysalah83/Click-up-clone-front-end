import ColorsPicker from "@/shared/avatar-picker/components/ColorsPicker";
import IconsPicker from "@/shared/avatar-picker/components/IconsPicker";
import {
  AvatarColors,
  AvatarIcons,
  AvatarLetters,
} from "@/shared/avatar-picker/types/avatarPicker.types";
import { isAvatarIcon } from "@/shared/avatar-picker/utils/helper";

function WorkspaceEditAvatarMenu({
  currentColor,
  currentIcon,
  onSelectColor,
  onSelectIcon,
}: {
  currentColor: AvatarColors;
  currentIcon: AvatarIcons | AvatarLetters;
  onSelectColor: (color: AvatarColors) => void;
  onSelectIcon: (icon: AvatarIcons) => void;
}) {
  return (
    <div className="max-w-2xs">
      <ColorsPicker
        selectedColor={currentColor}
        onSelectColor={onSelectColor}
      />
      <IconsPicker
        selectedIcon={
          (isAvatarIcon(currentIcon) ? currentIcon : null) as AvatarIcons | null
        }
        onSelectIcon={onSelectIcon}
      />
    </div>
  );
}

export default WorkspaceEditAvatarMenu;

import { Menu, MenuContent, MenuTrigger } from "@/components/ui/MenuCompound";
import {
  AvatarColors,
  AvatarIcons,
  AvatarLetters,
} from "../types/avatarPicker.types";
import Avatar from "./Avatar";

interface AvatarPickerMenuProps {
  children: React.ReactNode;
  disabled?: boolean;
  avatarIcon: AvatarIcons | AvatarLetters;
  selectedColor: AvatarColors;
  selectedIcon: AvatarIcons | null;
}

function AvatarPickerMenu({
  children,
  disabled,
  avatarIcon,
  selectedColor,
}: AvatarPickerMenuProps) {
  return (
    <span>
      <Menu>
        <MenuTrigger>
          <Avatar selectedColor={selectedColor} avatarContent={avatarIcon} />
        </MenuTrigger>
        {!disabled && (
          <MenuContent>
            <section className="max-w-56">{children}</section>
          </MenuContent>
        )}
      </Menu>
    </span>
  );
}

export default AvatarPickerMenu;

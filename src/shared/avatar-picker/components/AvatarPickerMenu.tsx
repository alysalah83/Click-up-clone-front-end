import { Menu, MenuContent, MenuTrigger } from "@/components/ui/MenuCompound";
import { AvatarColors, AvatarIcons } from "../types/avatarPicker.types";
import Avatar from "./Avatar";

interface AvatarPickerMenuProps {
  children: React.ReactNode;
  disabled?: boolean;
  avatarIcon: AvatarIcons;
  selectedColor: AvatarColors;
  selectedIcon: string;
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

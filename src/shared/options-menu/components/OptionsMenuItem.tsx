import {
  Modal,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/ModalCompound";
import { ICONS_MAP } from "@/constants/iconsMap";
import { OptionsMenuItemProps } from "../types/types";
import {
  Menu,
  MenuContent,
  MenuTrigger,
  useMenu,
} from "@/components/ui/MenuCompound";

function OptionsMenuItem({ item }: OptionsMenuItemProps) {
  const { icon, label, color, display, action } = item;
  const { toggleMenu } = useMenu();
  const Icon = ICONS_MAP[icon];

  if (action) {
    return (
      <li
        className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1 transition duration-300 hover:bg-neutral-600/20 dark:hover:bg-neutral-500/20"
        onClick={() => {
          action();
          toggleMenu();
        }}
      >
        <span>
          <Icon
            className={`text-base ${color ? color : "text-neutral-600 dark:text-neutral-400"}`}
          />
        </span>
        <span
          className={`text-sm font-medium ${color ? color : "text-neutral-800 dark:text-neutral-200"}`}
        >
          {label}
        </span>
      </li>
    );
  }

  if (display && display.uiForAction === "modal") {
    const { ActionComponent } = display;
    return (
      <Modal>
        <ModalTrigger>
          <li className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1 transition duration-300 hover:bg-neutral-600/20 dark:hover:bg-neutral-500/20">
            <span>
              <Icon
                className={`size-4 ${color ? color : "text-neutral-600 dark:text-neutral-400"}`}
              />
            </span>
            <span
              className={`text-sm font-medium ${color ? color : "text-neutral-800 dark:text-neutral-200"}`}
            >
              {label}
            </span>
          </li>
        </ModalTrigger>
        <ModalContent contentYPosition="withTopMargin">
          <ActionComponent />
        </ModalContent>
      </Modal>
    );
  } else if (display && display.uiForAction === "menu") {
    const { ActionComponent } = display;
    return (
      <Menu>
        <MenuTrigger>
          <div className="w-full">
            <li className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1 transition duration-300 hover:bg-neutral-600/20 dark:hover:bg-neutral-500/20">
              <span>
                <Icon
                  className={`size-4 ${color ? color : "text-neutral-600 dark:text-neutral-400"}`}
                />
              </span>
              <span
                className={`text-sm font-medium ${color ? color : "text-neutral-800 dark:text-neutral-200"}`}
              >
                {label}
              </span>
            </li>
          </div>
        </MenuTrigger>
        <MenuContent>
          <ActionComponent />
        </MenuContent>
      </Menu>
    );
  }
}

export default OptionsMenuItem;

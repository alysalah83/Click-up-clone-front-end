"use client";

import { MENU_MARGIN } from "@/config/config";
import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  use,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

interface MenuContextValues {
  menuMargin: number;
  positionCords: PositionCords;
  setPositionCords: Dispatch<SetStateAction<PositionCords>>;
  isOpened: boolean;
  mounted: boolean;
  triggerRef: RefObject<HTMLDivElement | null>;
  menuRef: RefObject<HTMLDivElement | null>;
  toggleMenu: () => void;
  handleMounted: () => void;
}

interface PositionCords {
  top: number | null;
  left: number | null;
}

interface MenuProps {
  children: ReactNode;
  menuMargin?: number;
}

const MenuContext = createContext<MenuContextValues | null>(null);

function Menu({ children, menuMargin = MENU_MARGIN ?? 6 }: MenuProps) {
  const [positionCords, setPositionCords] = useState<PositionCords>({
    top: null,
    left: null,
  });
  const [isOpened, setIsOpened] = useState(false);
  const [mounted, setMounted] = useState(false);

  const triggerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => setIsOpened((cur) => !cur);
  const handleMounted = () => setMounted(true);

  return (
    <MenuContext
      value={{
        menuMargin,
        positionCords,
        setPositionCords,
        isOpened,
        toggleMenu,
        mounted,
        triggerRef,
        menuRef,
        handleMounted,
      }}
    >
      {children}
    </MenuContext>
  );
}

function useMenu() {
  const values = use(MenuContext);
  if (!values)
    throw new Error("the menu context is being used out side of his scope");
  return values;
}

function Overlay({ children }: { children: ReactNode }) {
  const { toggleMenu } = useMenu();
  return (
    <div
      className="absolute inset-0 z-40 overflow-x-hidden overflow-y-hidden"
      onClick={(e) => {
        e.stopPropagation();
        if (e.target !== e.currentTarget) return;
        toggleMenu();
      }}
    >
      {children}
    </div>
  );
}

function MenuContent({ children }: { children: ReactNode }) {
  const {
    positionCords,
    setPositionCords,
    isOpened,
    mounted,
    triggerRef,
    menuRef,
    handleMounted,
    menuMargin,
  } = useMenu();

  useEffect(() => handleMounted(), [handleMounted]);

  useEffect(() => {
    if (!triggerRef?.current || !menuRef?.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const menuRect = menuRef.current.getBoundingClientRect();

    const pageHight = window.innerHeight + window.scrollY;
    const pageWidth = window.innerWidth + window.scrollX;
    // default position is bottom the trigger ele
    let top = triggerRect.bottom + window.scrollY + menuMargin;
    let left = triggerRect.left + window.scrollX;

    if (pageHight - Math.abs(top) < menuRect.height)
      top = triggerRect.top + window.scrollY - menuRect.height - menuMargin; //making menu top

    if (pageHight - Math.abs(top) < menuRect.height)
      top = pageHight - menuRect.height + window.scrollY - menuMargin; //making menu sticky to the top of viewport

    if (pageWidth - left < menuRect.width)
      left = pageWidth - menuRect.width + window.scrollX - menuMargin; //making menu sticky to the left of viewport

    // switch (menuPosition) {
    //   case "top":
    //     top = triggerRect.top + window.scrollY - menuRect.height - menuMargin;
    //     left = triggerRect.left + window.scrollX;
    //     break;
    //   case "bottom":
    //     top = triggerRect.bottom + window.scrollY + menuMargin;
    //     left = triggerRect.left + window.scrollX;
    //     if (pageHight - top < menuRect.height)
    //       top = triggerRect.top + window.scrollY - menuRect.height - menuMargin;
    //     if (pageWidth - left < menuRect.width)
    //       left = pageWidth - menuRect.width + window.scrollX - menuMargin;
    //     break;
    //   case "left":
    //     top = triggerRect.top + window.scrollY;
    //     left = triggerRect.left + window.scrollX - menuRect.width - menuMargin;
    //     break;
    //   case "right":
    //     top = triggerRect.top + window.scrollY;
    //     left = triggerRect.right + window.scrollX + menuMargin;
    //     break;
    // }

    setPositionCords({ top, left });
  }, [triggerRef, menuRef, setPositionCords, isOpened, menuMargin]);

  if (!mounted || !isOpened) return null;

  const hasPosition = !!positionCords.top && !!positionCords.left;

  return createPortal(
    <Overlay>
      <div
        style={{
          top: positionCords.top ?? 0,
          left: positionCords.left ?? 0,
          visibility: hasPosition ? "visible" : "hidden",
        }}
        className="absolute z-50 rounded-lg bg-neutral-300 text-sm text-neutral-800 shadow-md shadow-neutral-900/10 dark:bg-neutral-800 dark:text-neutral-200"
        ref={menuRef}
      >
        {children}
      </div>
    </Overlay>,
    document.body,
  );
}

function MenuTrigger({ children }: { children: ReactNode }) {
  const { toggleMenu, triggerRef } = useMenu();

  return (
    <div
      className="flex h-full w-full items-center"
      onClick={toggleMenu}
      ref={triggerRef}
    >
      {children}
    </div>
  );
}

export { Menu, MenuTrigger, MenuContent, useMenu };

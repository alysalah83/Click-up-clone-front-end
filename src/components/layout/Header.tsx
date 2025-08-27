"use client";

import { useSideNavStore } from "@/stores/useSideNavStore";
import ButtonIcon from "../common/ButtonIcon";
import {
  ToolTip,
  ToolTipMessage,
  ToolTipTrigger,
} from "../ui/ToolTipCompound ";
import ButtonWithIconLabel from "../common/ButtonWithIconLabel";
import { usePathname } from "next/navigation";
import { HEADER_MENU } from "@/constants/ui";
import BoardSortBtn from "@/features/board-tasks/components/BoardSortBtn";
import UserLogo from "@/features/auth/components/UserLogo";
import { ClientUser } from "@/features/auth/types/auth.types";
import { ICONS_MAP } from "@/constants/iconsMap";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SkeletonLoader from "../ui/SkeletonLoader";

function Header({
  userPromise,
  latestListIdPromise,
}: {
  userPromise: Promise<ClientUser | undefined>;
  latestListIdPromise: Promise<string>;
}) {
  const { isSideNavOpened, toggleNav } = useSideNavStore();
  const pathname = usePathname();

  return (
    <header
      className={`flex flex-col gap-3 border-b px-2 pt-4 sm:px-4 ${
        !isSideNavOpened && "rounded-tl-xl"
      } border-neutral-300 dark:border-neutral-700`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {!isSideNavOpened && (
            <ToolTip>
              <ToolTipMessage messagePosition="right">
                Open sidebar
              </ToolTipMessage>
              <ToolTipTrigger>
                <ButtonIcon
                  icon="sideBarRightCollapse"
                  onClick={toggleNav}
                  ariaLabel="open side nav button"
                  withBg={true}
                />
              </ToolTipTrigger>
            </ToolTip>
          )}
          <ButtonIcon
            icon="list"
            ariaLabel="project list item"
            size={4.5}
            withBg={true}
            padding="large"
          />
          <h4 className="text-sm font-bold capitalize">Workload</h4>
        </div>
        <div className="flex items-center gap-1">
          <ThemeButton />
          <UserLogo userPromise={userPromise} />
        </div>
      </div>
      <div className="flex justify-between">
        <menu className="flex sm:gap-2">
          {HEADER_MENU.map((item) => (
            <ButtonWithIconLabel
              item={item}
              key={item.href}
              latestListIdPromise={latestListIdPromise}
              isActive={pathname.includes(item.href)}
            />
          ))}
        </menu>
        <HeaderFeatures />
      </div>
    </header>
  );
}

function HeaderFeatures() {
  const pathname = usePathname();
  const isInBoardPage = pathname.includes("/board");

  return (
    <div className="flex items-center gap-4">
      {isInBoardPage && <BoardSortBtn />}
    </div>
  );
}

function ThemeButton() {
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted)
    return <SkeletonLoader rounded="rounded-full" width="w-6" height="h-6" />;

  return (
    <button
      type="button"
      aria-label="toggle theme button"
      className="cursor-pointer p-1"
    >
      {resolvedTheme === "light" ? (
        <ICONS_MAP.sun
          className="size-6 fill-amber-500 transition duration-200 hover:fill-amber-600"
          onClick={() => setTheme("dark")}
        />
      ) : (
        <ICONS_MAP.moon
          className="size-6 fill-neutral-500 transition duration-200 hover:fill-neutral-600"
          onClick={() => setTheme("light")}
        />
      )}
    </button>
  );
}

export default Header;

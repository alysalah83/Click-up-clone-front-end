"use client";

import ButtonIcon from "../../ui/Button/ButtonIcon";
import {
  ToolTip,
  ToolTipMessage,
  ToolTipTrigger,
} from "../../ui/ToolTip/ToolTipCompound ";
import ButtonWithIconLabel from "../../ui/Button/ButtonWithIconLabel";
import { usePathname } from "next/navigation";
import { HEADER_MENU } from "./Header.const";
import UserLogo from "@/features/auth/components/UserLogo";
import { useSideBarStore } from "../SideBar/useSideNavStore";
import { UserWithoutPassword } from "@/features/auth/types";
import { List } from "@/features/list/types";
import ThemeButton from "./ThemeButton";
import HeaderFeatures from "./HeaderFeatures";
import NavButtons from "./NavButtons";

function Header({
  userPromise,
  latestListIdPromise,
}: {
  userPromise: Promise<UserWithoutPassword | undefined>;
  latestListIdPromise: Promise<{ id: List["id"] } | undefined>;
}) {
  const { isSideBarOpened, setOpenSideBar } = useSideBarStore();

  return (
    <header
      className={`flex flex-col gap-3 border-b px-2 pt-4 sm:px-4 ${
        !isSideBarOpened ? "rounded-tl-xl" : ""
      } border-neutral-300 dark:border-neutral-700`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {!isSideBarOpened && (
            <ToolTip>
              <ToolTipMessage messagePosition="right">
                Open sidebar
              </ToolTipMessage>
              <ToolTipTrigger>
                <ButtonIcon
                  icon="sideBarRightCollapse"
                  onClick={setOpenSideBar}
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
          <NavButtons latestListIdPromise={latestListIdPromise} />
        </menu>
        <HeaderFeatures />
      </div>
    </header>
  );
}

export default Header;

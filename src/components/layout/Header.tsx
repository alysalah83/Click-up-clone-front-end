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
      } border-neutral-700`}
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
          <h4 className="text-sm font-semibold capitalize">Workload</h4>
        </div>
        <UserLogo userPromise={userPromise} />
      </div>
      <div className="flex justify-between">
        <menu className="flex items-center sm:gap-2">
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

export default Header;

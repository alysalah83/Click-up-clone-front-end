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
      className={`flex flex-col gap-3 border-b px-4 pt-4 ${
        !isSideNavOpened && "rounded-tl-xl"
      } border-neutral-700`}
    >
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
        <h4 className="text-sm font-semibold capitalize">project 1</h4>
      </div>
      <div className="flex justify-between">
        <menu className="flex items-center gap-2">
          {HEADER_MENU.map((item) => (
            <ButtonWithIconLabel
              item={item}
              key={item.href}
              latestListIdPromise={latestListIdPromise}
              isActive={pathname.includes(item.href)}
            />
          ))}
        </menu>
        <HeaderFeatures userPromise={userPromise} />
      </div>
    </header>
  );
}

function HeaderFeatures({
  userPromise,
}: {
  userPromise: Promise<ClientUser | undefined>;
}) {
  const pathname = usePathname();
  const isInTablePage = pathname.includes("/table");

  return (
    <div className="flex items-center gap-4">
      {!isInTablePage && <BoardSortBtn />}
      <UserLogo userPromise={userPromise} />
    </div>
  );
}

export default Header;

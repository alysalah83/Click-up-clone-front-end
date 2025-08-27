"use client";

import ButtonIcon from "@/components/common/ButtonIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { MENU_ITEMS } from "@/constants/ui";
import { signOutUser } from "@/features/auth/actions/auth.actions.ts";
import {
  ToolTip,
  ToolTipMessage,
  ToolTipTrigger,
} from "../ui/ToolTipCompound ";

function SideBarMenu() {
  const [isPending, setIsPending] = useState(false);
  const [homeObject, dashboardObj] = MENU_ITEMS;
  const pathname = usePathname();

  return (
    <menu className="mr-2 flex w-fit flex-col items-center gap-6 rounded-xl bg-neutral-200 px-2 py-4 dark:bg-neutral-900">
      <Link href={homeObject.href}>
        <li className="flex flex-col items-center gap-1">
          <ButtonIcon
            icon={homeObject.icon}
            size={6}
            type="primary"
            isActive={
              pathname.includes(homeObject.href) &&
              !pathname.includes(dashboardObj.href)
            }
            ariaLabel={`${homeObject.label} button`}
          />
          <span className="text-xs font-bold capitalize">
            {homeObject.label}
          </span>
        </li>
      </Link>
      <Link href={dashboardObj.href}>
        <li className="flex flex-col items-center gap-1">
          <ButtonIcon
            icon={dashboardObj.icon}
            size={6}
            type="primary"
            isActive={pathname.includes(dashboardObj.href)}
            ariaLabel={`${dashboardObj.label} button`}
          />
          <span className="text-xs font-bold capitalize">
            {dashboardObj.label}
          </span>
        </li>
      </Link>

      <form
        className={`mt-auto flex ${isPending ? "cursor-not-allowed" : "cursor-pointer"} flex-col items-center gap-1`}
        onSubmit={async (e) => {
          e.preventDefault();
          setIsPending(true);
          await signOutUser();
          setIsPending(false);
        }}
      >
        <ToolTip>
          <ToolTipTrigger>
            <ButtonIcon
              icon="signOut"
              iconColor="fill-red-500 text-red-500"
              bgHoverColor="hover:bg-red-500/20 active:bg-red-500/20"
              padding="large"
              size={6}
              type="primary"
              ariaLabel={`sign out button`}
              disabled={isPending}
              btnType="submit"
              disabledIconColor="filled-red-700 text-red-700"
            />
          </ToolTipTrigger>
          <ToolTipMessage>Sign out</ToolTipMessage>
        </ToolTip>
      </form>
    </menu>
  );
}

export default SideBarMenu;

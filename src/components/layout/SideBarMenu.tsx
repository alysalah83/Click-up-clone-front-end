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
import { IconsMap } from "@/types/index.types";

interface MenuItem {
  icon: IconsMap;
  label: string;
  href: string;
  includedRoutes?: string[];
}

function SideBarMenu() {
  const [isPending, setIsPending] = useState(false);
  return (
    <menu className="mr-2 flex w-fit flex-col items-center gap-6 rounded-xl bg-neutral-200 px-2 py-4 dark:bg-neutral-900">
      {MENU_ITEMS.map((item) => (
        <SideMenuLink menuItem={item} key={item.href} />
      ))}

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

function SideMenuLink({ menuItem }: { menuItem: MenuItem }) {
  const { icon, label, href, includedRoutes } = menuItem;
  const pathname = usePathname();
  let isActive = false;

  if (pathname === href) isActive = true;
  else if (includedRoutes)
    isActive = includedRoutes.some((path) => pathname.includes(path));

  return (
    <Link href={href}>
      <li className="flex flex-col items-center gap-1">
        <ButtonIcon
          icon={icon}
          size={6}
          type="primary"
          isActive={isActive}
          ariaLabel={`${label} button`}
        />
        <span className="text-xs font-bold capitalize">{label}</span>
      </li>
    </Link>
  );
}

export default SideBarMenu;

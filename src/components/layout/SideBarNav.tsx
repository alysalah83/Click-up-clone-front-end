"use client";

import ButtonIcon from "@/components/common/ButtonIcon";
import { useSideNavStore } from "@/stores/useSideNavStore";
import { ReactNode, useEffect } from "react";

function SideBarNav({ children }: { children: ReactNode }) {
  const { isSideNavOpened, toggleNav, setNavOpen } = useSideNavStore();

  useEffect(() => {
    const mediaQuery: MediaQueryList = window.matchMedia("(min-width: 1024px)");
    setNavOpen(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => setNavOpen(e.matches);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, [setNavOpen]);

  return (
    <aside
      className={`flex h-full flex-col gap-4 overflow-x-hidden overflow-y-auto rounded-tl-xl rounded-bl-xl border-r border-neutral-300 bg-neutral-200 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 ${
        isSideNavOpened ? "w-xs p-4" : "w-0 border-r-0 p-0"
      }`}
    >
      <header className="flex items-center justify-between border-b border-neutral-300 pb-4 dark:border-neutral-700">
        <h3 className="text-xl font-semibold tracking-wider text-neutral-800 dark:text-neutral-200">
          Home
        </h3>
        <div className="flex items-center gap-2">
          <ButtonIcon icon="search" ariaLabel="search project button" />
          <ButtonIcon
            icon="sideBarLeftCollapse"
            onClick={toggleNav}
            ariaLabel="close side nav button"
          />
        </div>
      </header>
      <section className="flex flex-col gap-2">{children}</section>
    </aside>
  );
}

export default SideBarNav;

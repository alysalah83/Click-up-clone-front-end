"use client";

import { ReactNode } from "react";
import { useSideBarStore } from "./SideBar/useSideNavStore";

function MainContent({ children }: { children: ReactNode }) {
  const { isSideBarOpened } = useSideBarStore();
  return (
    <section
      className={`flex h-full w-full min-w-0 flex-1 ${
        !isSideBarOpened ? "rounded-tl-xl rounded-bl-xl" : ""
      } dark:bg-neutral-925 flex-col overflow-hidden rounded-tr-xl rounded-br-xl bg-neutral-100`}
    >
      {children}
    </section>
  );
}

export default MainContent;

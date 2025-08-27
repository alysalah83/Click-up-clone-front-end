"use client";

import { useSideNavStore } from "@/stores/useSideNavStore";
import { ReactNode } from "react";

function MainContent({ children }: { children: ReactNode }) {
  const { isSideNavOpened } = useSideNavStore();
  return (
    <section
      className={`flex h-full w-full flex-auto ${
        !isSideNavOpened && "rounded-tl-xl rounded-bl-xl"
      } dark:bg-neutral-925 flex-col overflow-hidden rounded-tr-xl rounded-br-xl bg-neutral-100`}
    >
      {children}
    </section>
  );
}

export default MainContent;

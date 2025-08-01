import { INITIAL_SIDE_BAR_NAV_OPEN } from "@/config/config";
import { create } from "zustand";

interface SideNavState {
  isSideNavOpened: boolean;
  toggleNav: () => void;
  setNavOpen: (isOpened: boolean) => void;
}

export const useSideNavStore = create<SideNavState>((set) => ({
  isSideNavOpened: INITIAL_SIDE_BAR_NAV_OPEN,
  toggleNav: () =>
    set((state) => ({ isSideNavOpened: !state.isSideNavOpened })),
  setNavOpen: (isOpened) => set({ isSideNavOpened: isOpened }),
}));

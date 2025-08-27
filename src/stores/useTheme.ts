"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { create } from "zustand";

type Theme = "dark" | "light";

interface UseTheme {
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
}

export function useTheme() {
  const [isMounted, setIsMounted] = useState(false);
  const { localStorageState, handleChangeLocalStorage, isInitialized } =
    useLocalStorage("theme");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getSystemTheme = () => {
    if (typeof window === "undefined") return "dark";
    return window?.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const themeStore = create<UseTheme>((set) => ({
    theme: (() => {
      if (isInitialized && localStorageState) return localStorageState as Theme;

      return getSystemTheme();
    })(),

    setTheme: (newTheme: Theme) => {
      handleChangeLocalStorage(newTheme);
      set({ theme: newTheme });

      if (isMounted && typeof document !== "undefined")
        document.body.classList.toggle("dark", newTheme === "dark");
    },
  }));

  useEffect(() => {
    if (isInitialized) {
      const store = themeStore.getState();
      const currentTheme = localStorageState
        ? (localStorageState as Theme)
        : getSystemTheme();

      if (store.theme !== currentTheme) store.setTheme(currentTheme);

      if (typeof document !== "undefined")
        document.body.classList.toggle("dark", currentTheme === "dark");
    }
  }, [isInitialized, localStorageState, themeStore]);

  return {
    ...themeStore(),
  };
}

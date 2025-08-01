"use client";

import { createContext, ReactNode, use, useState } from "react";

interface DropdownContextValues {
  showDropdown: boolean;
  handleShowDropdown: () => void;
  handleHideDropdown: () => void;
  handleToggleShowDropdown: () => void;
  isAbsolute: boolean;
}

const DropdownContext = createContext<DropdownContextValues | null>(null);

function Dropdown({
  children,
  isAbsolute = false,
}: {
  children: ReactNode;
  isAbsolute?: boolean;
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const handleShowDropdown = () => setShowDropdown(true);
  const handleHideDropdown = () => setShowDropdown(false);
  const handleToggleShowDropdown = () => setShowDropdown((cur) => !cur);

  return (
    <DropdownContext
      value={{
        showDropdown,
        handleShowDropdown,
        handleHideDropdown,
        handleToggleShowDropdown,
        isAbsolute,
      }}
    >
      {children}
    </DropdownContext>
  );
}

function DropdownTrigger({ children }: { children: ReactNode }) {
  const {
    handleShowDropdown,
    handleHideDropdown,
    handleToggleShowDropdown,
    isAbsolute,
  } = useDropdown();
  return (
    <div
      onMouseEnter={handleShowDropdown}
      onMouseLeave={handleHideDropdown}
      onClick={(e) => {
        if (!isAbsolute && e.target !== e.currentTarget) return;
        handleToggleShowDropdown();
      }}
      className="relative"
    >
      {children}
    </div>
  );
}

function DropdownMenu({ children }: { children: ReactNode }) {
  const { showDropdown } = useDropdown();

  if (!showDropdown) return null;

  return children;
}

function useDropdown() {
  const values = use(DropdownContext);
  if (!values)
    throw new Error("dropdown context is being used outside of his scope");
  return values;
}

export { Dropdown, DropdownTrigger, DropdownMenu };

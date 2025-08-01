"use client";

import OptionsMenuItem from "@/shared/options-menu/components/OptionsMenuItem";
import { useWorkspaceMenuItems } from "../hooks/useWorkspaceMenuItems";

function OptionsWorkspaceMenuItems() {
  const workspaceMenuItems = useWorkspaceMenuItems();
  return (
    <menu className="min-w-3xs p-2">
      {workspaceMenuItems.map((item) => (
        <OptionsMenuItem item={item} key={item.label} />
      ))}
    </menu>
  );
}

export default OptionsWorkspaceMenuItems;

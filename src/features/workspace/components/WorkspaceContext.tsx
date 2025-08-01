"use client";

import { createContext, ReactNode, use, useCallback, useState } from "react";
import { Workspace } from "../types/workspace.types";

interface WorkspaceProviderProps {
  children: ReactNode;
  workspace: Workspace;
}

interface WorkspaceContextValue {
  workspace: Workspace;
  isRenameOpen: boolean;
  handleToggleIsRenameOpen: () => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

function WorkspaceProvider({ children, workspace }: WorkspaceProviderProps) {
  const [isRenameOpen, setIsRenameOpen] = useState(false);

  const handleToggleIsRenameOpen = useCallback(
    () => setIsRenameOpen((cur) => !cur),
    [],
  );

  return (
    <WorkspaceContext
      value={{
        workspace,
        isRenameOpen,
        handleToggleIsRenameOpen,
      }}
    >
      {children}
    </WorkspaceContext>
  );
}

export function useWorkspace() {
  const values = use(WorkspaceContext);
  if (!values)
    throw new Error("workspace context is being used outside of his scope");
  return values;
}

export default WorkspaceProvider;

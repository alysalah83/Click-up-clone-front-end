"use client";

import {
  AvatarColors,
  AvatarIcons,
  AvatarLetters,
} from "@/shared/avatar-picker/types/avatarPicker.types";
import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useWorkspace } from "./WorkspaceProvider";
import { updateWorkspace } from "../actions/workspace.actions";

interface WorkspaceAvatarContextValue {
  color: AvatarColors;
  icon: AvatarIcons | AvatarLetters;
  handleSelectColor: (color: AvatarColors) => void;
  handleSelectIcon: (icon: AvatarIcons) => void;
}

const WorkspaceAvatarContext =
  createContext<WorkspaceAvatarContextValue | null>(null);

function WorkspaceAvatarProvider({ children }: { children: React.ReactNode }) {
  const {
    id,
    avatar: { color: currentColor, icon: currentIcon },
  } = useWorkspace();

  const [color, setColor] = useState(currentColor);
  const [icon, setIcon] = useState(currentIcon);

  useEffect(() => {
    updateWorkspace(id, {
      avatar: { color, icon },
    });
  }, [color, icon, id]);

  const handleSelectColor = useCallback(
    (color: AvatarColors) => setColor(color),
    [],
  );
  const handleSelectIcon = useCallback(
    (icon: AvatarIcons) => setIcon(icon),
    [],
  );

  const values = useMemo(
    () => ({ color, icon, handleSelectColor, handleSelectIcon }),
    [color, icon, handleSelectColor, handleSelectIcon],
  );
  return (
    <WorkspaceAvatarContext value={values}>{children}</WorkspaceAvatarContext>
  );
}

export function useWorkspaceAvatar() {
  const values = use(WorkspaceAvatarContext);
  if (!values)
    throw new Error(
      "workspaceAvatar context is being used outside of his scope",
    );
  return values;
}

export default WorkspaceAvatarProvider;

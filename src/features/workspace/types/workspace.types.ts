import z from "zod";
import { workspaceSchema } from "../validations/workspaceSchema";
import { WORKSPACE_AVATAR_COLORS } from "../consts/workspace.consts";

interface Avatar {
  letter: string;
  color: WorkspaceAvatarColors;
}

interface Workspace {
  id: string;
  name: string;
  avatar: Avatar;
  createdAt: string;
}

type WorkspaceAvatarColors = keyof typeof WORKSPACE_AVATAR_COLORS;

type ClientWorkspace = z.infer<typeof workspaceSchema>;

export type { Workspace, WorkspaceAvatarColors, ClientWorkspace, Avatar };

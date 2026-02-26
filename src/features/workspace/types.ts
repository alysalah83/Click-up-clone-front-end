import z from "zod";

import { Workspace as WorkspaceWithoutAvatar } from "@/../../../Back-end/src/generated/prisma/client";
import { Avatar } from "@/shared/ui/AvatarPicker/avatarPicker.types";
import {
  createAvatarSchema,
  createWorkspaceSchema,
  updateWorkSpaceSchema,
} from "./schema/workspace-actions.schema";

type Workspace = WorkspaceWithoutAvatar & { avatar: Avatar };

type CreateWorkspaceInputs = z.infer<typeof createWorkspaceSchema>;
type CreateAvatarInput = z.infer<typeof createAvatarSchema>;
type UpdateWorkspaceInput = z.infer<typeof updateWorkSpaceSchema>;

export type {
  Workspace,
  CreateWorkspaceInputs,
  UpdateWorkspaceInput,
  CreateAvatarInput,
};

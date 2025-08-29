import z from "zod";
import { workspaceSchema } from "../validations/workspaceSchema";
import { Avatar } from "@/shared/avatar-picker/types/avatarPicker.types";

interface Workspace {
  id: string;
  name: string;
  avatar: Avatar;
  createdAt: string;
}

type ClientWorkspace = z.infer<typeof workspaceSchema>;

export type { Workspace, ClientWorkspace };

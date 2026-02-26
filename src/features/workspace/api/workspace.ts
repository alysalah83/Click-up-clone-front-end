import { createServerAxios } from "@/shared/lib/axios/server";
import {
  CreateWorkspaceInputs,
  UpdateWorkspaceInput,
  Workspace,
} from "../types";

export async function createWorkspace(
  createWorkspaceInputs: CreateWorkspaceInputs,
) {
  const serverAxios = await createServerAxios();
  return await serverAxios.post("/workspaces", createWorkspaceInputs);
}

export const getWorkspaces = async () => {
  const serverAxios = await createServerAxios();
  return await serverAxios.get<Workspace[]>("/workspaces");
};

export async function getWorkspacesCount() {
  const serverAxios = await createServerAxios();
  return await serverAxios.get<number>(`/workspaces?count=${true}`);
}

export async function updateWorkspace(
  workspaceId: Workspace["id"],
  updateWorkspaceInput: UpdateWorkspaceInput,
) {
  const serverAxios = await createServerAxios();
  return await serverAxios.patch<Workspace>(
    `/workspaces/${workspaceId}`,
    updateWorkspaceInput,
  );
}

export async function deleteWorkspace(workspaceId: Workspace["id"]) {
  const serverAxios = await createServerAxios();
  return await serverAxios.delete(`/workspaces/${workspaceId}`);
}

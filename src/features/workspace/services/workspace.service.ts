import { cacheLife, cacheTag } from "next/cache";
import {
  createWorkspace,
  deleteWorkspace,
  getWorkspaces,
  getWorkspacesCount,
  updateWorkspace,
} from "../api/workspace";

export const workspaceServices = {
  createWorkspace,
  async getWorkspaces() {
    "use cache: private";
    cacheTag("workspaces");
    cacheLife("max");
    return await getWorkspaces();
  },
  async getWorkspacesCount() {
    "use cache: private";
    cacheTag("workspaces");
    cacheLife("max");
    return await getWorkspacesCount();
  },
  updateWorkspace,
  deleteWorkspace,
};

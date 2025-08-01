/* eslint-disable @typescript-eslint/no-explicit-any */
import { createHash } from "crypto";
import { unstable_cache } from "next/cache";
import { getToken } from "../../utils/helper";
import { Workspace } from "@/features/workspace/types/workspace.types";

import { cookies } from "next/headers";
import { apiTakeToken } from "../../axios/instanceServer";

const apiWithToken = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("auth-token")?.value;
  if (!token) throw new Error("User is not Authenticated");
  return apiTakeToken(token);
};

const revalidateTime = 3600;

const getCashedWorkspaces = async (token: string) => {
  const tokenHash = createHash("sha256")
    .update(token)
    .digest("hex")
    .substring(0, 16);

  return unstable_cache(
    async () => {
      try {
        const api = apiTakeToken(token);
        const workspaces = await api.get<Workspace[]>("/workspaces");
        return workspaces.data;
      } catch (err) {
        console.error("Error fetching workspaces:", err);
        return null;
      }
    },
    [`user-workspaces-${tokenHash}`],
    {
      tags: ["workspaces"],
      revalidate: revalidateTime,
    },
  )();
};

export const getWorkspaces = async () => {
  const token = await getToken();
  const data = await getCashedWorkspaces(token);
  return data;
};

export async function getWorkspacesCount() {
  try {
    const authedApi = await apiWithToken();
    const res = await authedApi.get<number>("/workspaces/count");
    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

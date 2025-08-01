import { ClientWorkspace } from "@/features/workspace/types/workspace.types";

import { cookies } from "next/headers";
import { apiTakeToken } from "../../axios/instanceServer";

const apiWithToken = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("auth-token")?.value;
  if (!token) throw new Error("User is not Authenticated");
  return apiTakeToken(token);
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function createWorkspaceApi(workspace: ClientWorkspace) {
  try {
    const authedApi = await apiWithToken();
    const res = await authedApi.post("/workspaces", workspace);
    return res.data;
  } catch (err: any) {
    console.error(err);
    throw new Error(
      err.response?.data?.message || "Could'n upload workspace to our database",
    );
  }
}

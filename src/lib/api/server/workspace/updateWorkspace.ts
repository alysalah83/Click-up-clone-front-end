/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ClientWorkspace,
  Workspace,
} from "@/features/workspace/types/workspace.types";
import { cookies } from "next/headers";
import { apiTakeToken } from "../../axios/instanceServer";

const apiWithToken = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("auth-token")?.value;
  if (!token) throw new Error("User is not Authenticated");
  return apiTakeToken(token);
};

export async function updateWorkspaceApi(
  workspaceId: string,
  updatedFields: Partial<ClientWorkspace>,
) {
  try {
    const authedApi = await apiWithToken();
    const res = await authedApi.patch<Workspace>(
      `/workspaces/${workspaceId}`,
      updatedFields,
    );
    return res.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.response?.data?.message || error.message || "something went wring",
    );
  }
}

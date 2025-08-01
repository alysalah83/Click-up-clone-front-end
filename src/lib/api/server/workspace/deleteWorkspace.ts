/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { apiTakeToken } from "../../axios/instanceServer";

const apiWithToken = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("auth-token")?.value;
  if (!token) throw new Error("User is not Authenticated");
  return apiTakeToken(token);
};
export async function deleteWorkspaceApi(id: string) {
  try {
    const authedApi = await apiWithToken();
    await authedApi.delete(`/workspaces/${id}`);
  } catch (err: any) {
    console.error(err);
    throw new Error(err.response?.data?.message || "Could'nt delete workspace");
  }
}

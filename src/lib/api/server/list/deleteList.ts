/* eslint-disable @typescript-eslint/no-explicit-any */

import { cookies } from "next/headers";
import { apiTakeToken } from "../../axios/instanceServer";

const apiWithToken = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("auth-token")?.value;
  if (!token) throw new Error("User is not Authenticated");
  return apiTakeToken(token);
};

export async function deleteListApi(listId: string) {
  try {
    const authedApi = await apiWithToken();
    const res = await authedApi.delete(`/lists/${listId}`);
    return res.data;
  } catch (err: any) {
    console.log(err);
    console.error(err);
    throw new Error(err.response?.data?.message || "Could'nt delete list");
  }
}

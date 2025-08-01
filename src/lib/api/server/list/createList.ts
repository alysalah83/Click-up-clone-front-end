/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClientList, List } from "@/features/lists-side-nav/types/list.types";
import { cookies } from "next/headers";
import { apiTakeToken } from "../../axios/instanceServer";

const apiWithToken = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("auth-token")?.value;
  if (!token) throw new Error("User is not Authenticated");
  return apiTakeToken(token);
};

export async function createListApi(newList: ClientList) {
  try {
    const authedApi = await apiWithToken();
    const res = await authedApi.post<List>("/lists", newList);
    return res.data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err.response?.data?.message || "Couldn't create list");
  }
}

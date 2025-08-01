/* eslint-disable @typescript-eslint/no-explicit-any */
import { List } from "@/features/lists-side-nav/types/list.types";
import { cookies } from "next/headers";
import { apiTakeToken } from "../../axios/instanceServer";

const apiWithToken = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("auth-token")?.value;
  if (!token) throw new Error("User is not Authenticated");
  return apiTakeToken(token);
};

export async function updateListApi(
  listId: string,
  updatedFields: Partial<List>,
) {
  try {
    const authedApi = await apiWithToken();
    const res = await authedApi.patch<List>(`/lists/${listId}`, updatedFields);
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "something went wrong",
    );
  }
}

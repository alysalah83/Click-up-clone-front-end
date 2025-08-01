/* eslint-disable @typescript-eslint/no-explicit-any */
import { createHash } from "crypto";
import { unstable_cache } from "next/cache";
import { getToken } from "../../utils/helper";
import { List } from "@/features/lists-side-nav/types/list.types";
import { cookies } from "next/headers";
import { apiTakeToken } from "../../axios/instanceServer";

const apiWithToken = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("auth-token")?.value;
  if (!token) throw new Error("User is not Authenticated");
  return apiTakeToken(token);
};

const revalidateTime = 3600;

function getCashedListsByWorkspaceId(token: string, workspaceId: string) {
  const tokenHash = createHash("sha256")
    .update(token)
    .digest("hex")
    .substring(0, 16);

  return unstable_cache(
    async () => {
      try {
        const apiWithToken = apiTakeToken(token);
        const lists = await apiWithToken.get<List[]>(`/lists/${workspaceId}`);
        return lists.data;
      } catch (err: any) {
        console.error(err);
        throw new Error(
          err.response?.data?.message || "couldn't get your workspace lists",
        );
      }
    },
    [`lists-user-${tokenHash}-${workspaceId}`],
    {
      tags: [`lists-${workspaceId}`],
      revalidate: revalidateTime,
    },
  )();
}

export async function getListsByWorkspaceId(workspaceId: string) {
  const token = await getToken();
  const lists = await getCashedListsByWorkspaceId(token, workspaceId);
  return lists;
}

function getCashedLists(token: string) {
  const tokenHash = createHash("sha256")
    .update(token)
    .digest("hex")
    .substring(0, 16);

  return unstable_cache(
    async () => {
      try {
        const apiWithToken = apiTakeToken(token);
        const lists = await apiWithToken.get<List[]>(`/lists/`);
        return lists.data;
      } catch (err: any) {
        console.error(err);
        throw new Error(
          err.response?.data?.message || "couldn't get your lists",
        );
      }
    },
    [`lists-user-${tokenHash}`],
    {
      tags: [`lists`],
      revalidate: revalidateTime,
    },
  )();
}

export async function getLists() {
  const token = await getToken();
  const lists = await getCashedLists(token);
  return lists;
}

export async function getLatestCreatedList() {
  try {
    const authedApi = await apiWithToken();
    const res = await authedApi.get<string>("/lists/latest");

    return res.data || "undefined";
  } catch (error: any) {
    throw new Error(error.message);
  }
}

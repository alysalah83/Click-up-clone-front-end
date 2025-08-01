/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { apiTakeToken } from "../../axios/instanceServer";

const apiWithToken = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("auth-token")?.value;
  if (!token) throw new Error("User is not Authenticated");
  return apiTakeToken(token);
};

export async function deleteTaskApi(taskId: string) {
  try {
    const authedApi = await apiWithToken();
    const res = await authedApi.delete(`/tasks/${taskId}`);
    return res.data;
  } catch (err: any) {
    console.error("delete Error :" + err);
    throw new Error(err.response?.data?.message || "Could'nt delete task");
  }
}

export async function deleteTasksApi(listId: string, deletedTasksId: string[]) {
  try {
    const authedApi = await apiWithToken();
    const res = await authedApi.delete(`/tasks/${listId}/bulk`, {
      data: deletedTasksId,
    });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError)
      throw new Error(error.response?.data?.message || "Couldn't delete tasks");
    if (error instanceof Error) throw new Error(error.message);
  }
}

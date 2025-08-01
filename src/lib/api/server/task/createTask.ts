/* eslint-disable @typescript-eslint/no-explicit-any */
import { Task, ClientCreatedTask } from "@/shared/tasks/types/task.types";

import { cookies } from "next/headers";
import { apiTakeToken } from "../../axios/instanceServer";

const apiWithToken = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("auth-token")?.value;
  if (!token) throw new Error("User is not Authenticated");
  return apiTakeToken(token);
};

export async function createTaskApi(createdTaskFields: ClientCreatedTask) {
  try {
    const authedApi = await apiWithToken();
    const res = await authedApi.post<Task>(`/tasks`, createdTaskFields);
    return res.data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err.response?.data?.message || "Something went wrong");
  }
}

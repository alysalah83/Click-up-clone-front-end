/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Task,
  TasksCount,
  TasksPriorityCount,
} from "@/shared/tasks/types/task.types";
import { apiTakeToken } from "../../axios/instanceServer";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const apiWithToken = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("auth-token")?.value;
  if (!token) throw new Error("User is not Authenticated");
  return apiTakeToken(token);
};

export async function getTasks(listId: string | undefined) {
  if (!listId) throw new Error("ListId is required");

  try {
    const authedApi = await apiWithToken();
    const res = await authedApi.get<Task[]>(`/tasks/${listId}`);
    return res.data;
  } catch (err: any) {
    if (err.response?.status === 400) notFound();

    if (err.response?.status === 401)
      throw new Error("Authentication failed - please login again");

    throw new Error(err.response?.data?.message || "Failed to fetch tasks");
  }
}

export async function getListTasksCounts(listId: string) {
  try {
    const authedApi = await apiWithToken();
    const res = await authedApi.get<TasksCount>(`/tasks/${listId}/count`);
    return res.data;
  } catch (err: any) {
    throw new Error(err?.message);
  }
}

export async function getTasksCounts() {
  try {
    const authedApi = await apiWithToken();
    const res = await authedApi.get<TasksCount>(`/tasks/count`);
    return res.data;
  } catch (err: any) {
    throw new Error(err?.message);
  }
}

export async function getTasksPriorityCount() {
  try {
    const authedApi = await apiWithToken();
    const res = await authedApi.get<TasksPriorityCount>(`/tasks/priority`);
    return res.data;
  } catch (err: any) {
    throw new Error(err?.message);
  }
}

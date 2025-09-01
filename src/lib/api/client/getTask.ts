import { Task } from "@/shared/tasks/types/task.types";
import { apiClient } from "../axios/instanceClient";
import { notFound } from "next/navigation";

export async function getTasksClient(
  listId: string | undefined,
  token: string | undefined,
  filters: string,
) {
  if (!listId) {
    throw new Error("ListId is required");
  }

  if (!token) {
    throw new Error("Token is required");
  }

  try {
    const authedApi = apiClient(token);
    const res = await authedApi.get<Task[]>(
      filters ? `/tasks/${listId}?${filters}` : `/tasks/${listId}`,
    );
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.response?.status === 400) notFound();

    if (err.response?.status === 401)
      throw new Error("Authentication failed - please login again");

    throw new Error(err.response?.data?.message || "Failed to fetch tasks");
  }
}

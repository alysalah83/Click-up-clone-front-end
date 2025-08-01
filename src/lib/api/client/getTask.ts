import { Task } from "@/shared/tasks/types/task.types";
import { apiClient } from "../axios/instanceClient";

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
    console.error("API Error:", {
      status: err.response?.status,
      message: err.response?.data?.message,
      url: err.config?.url,
    });

    if (err.response?.status === 401) {
      throw new Error("Authentication failed - please login again");
    }

    if (err.response?.status === 404) {
      throw new Error("Tasks not found for this list");
    }

    throw new Error(err.response?.data?.message || "Failed to fetch tasks");
  }
}

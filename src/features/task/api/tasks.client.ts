import { axiosClient } from "@/shared/lib/axios/client";
import { Task } from "../types";

export async function getTasksClient(listId: Task["id"], filters: string) {
  return await axiosClient.get<Task[]>(
    filters
      ? `api/tasks?listId=${listId}&${filters}`
      : `api/tasks?listId=${listId}&createdAt=desc`,
  );
}

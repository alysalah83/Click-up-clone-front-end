import { axiosClient } from "@/shared/lib/axios/client";
import { Task } from "../types";

export async function getTasksClient(listId: Task["id"], filters: string) {
  return await axiosClient.get<Task[]>(
    filters
      ? `/tasks?${listId}&${filters}`
      : `/tasks?listId=${listId}&createdAt=desc`,
  );
}

import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { getSortedParamString } from "../../../shared/lib/utils/getSortedParamString";
import { Task } from "../types";
import { getTasksClient } from "../api/tasks.client";

export default function useTasks() {
  const params = useSearchParams();
  const { listId } = useParams<{ listId: Task["listId"] }>();
  const sortedFilters = getSortedParamString(params);

  const {
    data: tasks,
    isPending,
    error,
  } = useQuery({
    queryKey: sortedFilters
      ? ["tasks", listId, sortedFilters]
      : ["tasks", listId],
    queryFn: () => getTasksClient(listId, sortedFilters),
    enabled: !!listId,
    staleTime: 3600,
  });

  if (error) window.toast?.error(error.message);

  return { tasks, isPending };
}

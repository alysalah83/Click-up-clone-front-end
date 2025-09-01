import { getTasksClient } from "@/lib/api/client/getTask";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { convertParamsToString } from "../utils/helper";

export default function useTasks({
  listId,
  token,
}: {
  listId: string | undefined;
  token: string | undefined;
}) {
  const params = useSearchParams();
  const sortedFilters = convertParamsToString(params);

  const {
    data: tasks,
    isPending,
    error,
  } = useQuery({
    queryKey: sortedFilters
      ? ["tasks", listId, sortedFilters]
      : ["tasks", listId],
    queryFn: () => getTasksClient(listId, token, sortedFilters),
    enabled: !!listId && !!token,
    staleTime: 3600,
  });

  return { tasks, isPending, error };
}

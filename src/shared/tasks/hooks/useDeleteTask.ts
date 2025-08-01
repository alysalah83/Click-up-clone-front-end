import { Task } from "../types/task.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask as deleteTaskAction } from "@/shared/tasks/actions/task.actions";
import { useSearchParams } from "next/navigation";
import { convertParamsToString } from "../utils/helper";

export function useDeleteTask({ listId }: { listId: string }) {
  const params = useSearchParams();
  const sortedFilters = convertParamsToString(params);
  const queryKey = sortedFilters
    ? ["tasks", listId, sortedFilters]
    : ["tasks", listId];

  const queryClient = useQueryClient();
  const {
    mutate: deleteTask,
    status,
    error,
  } = useMutation({
    mutationFn: ({ taskId }: { taskId: string }) => deleteTaskAction(taskId),

    async onMutate({ taskId }: { taskId: string }) {
      await queryClient.cancelQueries({ queryKey: ["tasks", listId] });

      const previousTasks = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldTasks: Task[]) => {
        if (!oldTasks) return [];
        return oldTasks.filter((task) => task.id !== taskId);
      });

      return { previousTasks };
    },

    onError(error, variables, context) {
      console.log(error);
      if (context?.previousTasks)
        queryClient.setQueryData(queryKey, context.previousTasks);
      window.toast?.error(error.message, 7);
    },

    onSuccess(data) {
      window.toast?.success(`Task (${data.name}) has been deleted`);
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: ["tasks", listId] });
    },
  });
  return { deleteTask, status, error };
}

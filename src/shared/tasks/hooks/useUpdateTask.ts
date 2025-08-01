import { updateTask as updateTaskAction } from "@/shared/tasks/actions/task.actions";
import { ClientTask, Task } from "../types/task.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { convertParamsToString } from "../utils/helper";
import { useSearchParams } from "next/navigation";

export function useUpdateTask({ listId }: { listId: string }) {
  const params = useSearchParams();
  const sortedFilters = convertParamsToString(params);
  const queryKey = sortedFilters
    ? ["tasks", listId, sortedFilters]
    : ["tasks", listId];

  const queryClient = useQueryClient();
  const {
    mutate: updateTask,
    status,
    error,
  } = useMutation({
    mutationFn: ({
      taskId,
      updatedTaskFields,
    }: {
      taskId: string;
      updatedTaskFields: Partial<ClientTask>;
    }) => updateTaskAction(taskId, updatedTaskFields),

    async onMutate({
      taskId,
      updatedTaskFields,
    }: {
      taskId: string;
      updatedTaskFields: Partial<ClientTask>;
    }) {
      await queryClient.cancelQueries({ queryKey: ["tasks", listId] });

      const previousTasks = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldTasks: Task[]) => {
        const updatedTaskIndex = oldTasks.findIndex(
          (task) => task.id === taskId,
        );
        if (updatedTaskIndex === -1) return oldTasks;
        return oldTasks.with(updatedTaskIndex, {
          ...oldTasks[updatedTaskIndex],
          ...updatedTaskFields,
        });
      });

      return { previousTasks };
    },

    onError(error, updatedTaskFields, context) {
      console.log(error);
      if (context?.previousTasks)
        queryClient.setQueryData(queryKey, context.previousTasks);
      window.toast?.error(error.message, 7);
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: ["tasks", listId] });
    },
  });
  return { updateTask, status, error };
}

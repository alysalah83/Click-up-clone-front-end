import { updateTasks as updateTasksAction } from "@/shared/tasks/actions/task.actions";
import { ClientTask, Task } from "../types/task.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { convertParamsToString } from "../utils/helper";
import { useSearchParams } from "next/navigation";

export function useUpdateTasks({ listId }: { listId: string }) {
  const params = useSearchParams();
  const sortedFilters = convertParamsToString(params);
  const queryKey = sortedFilters
    ? ["tasks", listId, sortedFilters]
    : ["tasks", listId];

  const queryClient = useQueryClient();
  const {
    mutate: updateTasks,
    status,
    error,
  } = useMutation({
    mutationFn: ({
      tasksId,
      updatedTasksFields,
    }: {
      tasksId: Set<string>;
      updatedTasksFields: Partial<ClientTask>;
    }) => updateTasksAction(tasksId, updatedTasksFields),

    async onMutate({
      tasksId,
      updatedTasksFields,
    }: {
      tasksId: Set<string>;
      updatedTasksFields: Partial<ClientTask>;
    }) {
      await queryClient.cancelQueries({ queryKey: ["tasks", listId] });

      const previousTasks = queryClient.getQueryData(queryKey);
      console.log(tasksId, updatedTasksFields);

      queryClient.setQueryData(queryKey, (oldTasks: Task[]) => {
        const newUpdatedTasks = oldTasks.map((task) =>
          tasksId.has(task.id) ? { ...task, ...updatedTasksFields } : task,
        );
        return newUpdatedTasks;
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
  return { updateTasks, status, error };
}

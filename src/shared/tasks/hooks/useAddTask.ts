import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "@/shared/tasks/actions/task.actions";
import { ClientCreatedTask, Task } from "../types/task.types";
import { useSearchParams } from "next/navigation";
import { convertParamsToString } from "../utils/helper";

export function useAddTask(listId: string) {
  const params = useSearchParams();
  const sortedFilters = convertParamsToString(params);
  const queryKey = sortedFilters
    ? ["tasks", listId, sortedFilters]
    : ["tasks", listId];

  const queryClient = useQueryClient();
  const {
    mutate: addTask,
    error,
    status,
  } = useMutation({
    mutationFn: createTask,
    async onMutate(clientCreatedTask: ClientCreatedTask) {
      await queryClient.cancelQueries({ queryKey: ["tasks", listId] });
      const previousTasks = queryClient.getQueryData(queryKey);

      const tempId = `temp-${Date.now()}-${Math.random()}`;
      queryClient.setQueryData(queryKey, (oldTasks: Task[]) => [
        ...oldTasks,
        { ...clientCreatedTask, id: tempId, createdAt: new Date() },
      ]);

      return { previousTasks, tempId };
    },

    onError(err, newTask, context) {
      if (context?.previousTasks)
        queryClient.setQueryData(queryKey, context.previousTasks);
      window.toast?.error(err.message, 7);
    },

    onSuccess(newTask, clientCreatedTask, context) {
      queryClient.setQueryData(
        ["tasks", listId],
        (oldOptimisticTasks: Task[] = []) => {
          const newTaskIndex = oldOptimisticTasks.findIndex(
            (task) => task.id === context.tempId,
          );
          return newTaskIndex === -1
            ? [...oldOptimisticTasks, newTask]
            : oldOptimisticTasks.with(newTaskIndex, newTask);
        },
      );
      window.toast?.success(`Task (${newTask.name}) has been add`);
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: ["tasks", listId] });
    },
  });
  return { addTask, error, status };
}

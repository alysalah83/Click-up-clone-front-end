"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTasks as deleteTasksAction } from "../actions/task.actions";
import { Task } from "../types/task.types";
import { convertParamsToString } from "../utils/helper";
import { useSearchParams } from "next/navigation";

export function useDeleteTasks({ listId }: { listId: string }) {
  const params = useSearchParams();
  const sortedFilters = convertParamsToString(params);
  const queryKey = sortedFilters
    ? ["tasks", listId, sortedFilters]
    : ["tasks", listId];

  const queryClient = useQueryClient();
  const { mutate: deleteTasks, status } = useMutation({
    mutationFn: (tasksIdSet: Set<string>) =>
      deleteTasksAction({ listId, tasksIdSet }),

    onMutate(tasksIdSet: Set<string>) {
      queryClient.cancelQueries({ queryKey: ["tasks", listId] });

      const prevTasks = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldTasks: Task[]) =>
        oldTasks.filter((task) => !tasksIdSet.has(task.id)),
      );

      return { prevTasks };
    },

    onError(error, variables, context) {
      if (context?.prevTasks)
        queryClient.setQueryData(queryKey, context.prevTasks);
      window.toast?.error(error.message, 7);
    },

    onSettled() {
      queryClient.invalidateQueries({
        queryKey: ["tasks", listId],
      });
    },
  });

  return { deleteTasks, status };
}

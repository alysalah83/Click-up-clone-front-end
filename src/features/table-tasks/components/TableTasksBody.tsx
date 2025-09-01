"use client";

import useTasks from "@/shared/tasks/hooks/useTasks";
import TableTaskRow from "./TableTaskRow";
import TaskProvider from "@/shared/tasks/components/TaskProvider";
import NoWorkspace from "@/components/layout/NoWorkspace";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import { notFound } from "next/navigation";

function TableTasksBody({ token, listId }: { token: string; listId: string }) {
  const { tasks, isPending, error } = useTasks({ listId, token });

  if (!tasks && !isPending) return <NoWorkspace />;

  if (error) notFound();

  return (
    <>
      {isPending ? (
        <div className="flex flex-col gap-2 px-6 pt-2">
          <SkeletonLoader
            height="h-6"
            width="w-full"
            rounded="rounded-sm"
            count={20}
          />
        </div>
      ) : (
        tasks?.map((task, i) => (
          <TaskProvider task={task} key={task.id}>
            <TableTaskRow task={task} sortNum={i + 1} />
          </TaskProvider>
        ))
      )}
    </>
  );
}

export default TableTasksBody;

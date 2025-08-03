"use client";

import ListLoader from "./ListLoader";
import ListSlide from "./ListSlide";
import useTasks from "@/shared/tasks/hooks/useTasks";

function ListSlides({ listId, token }: { listId: string; token: string }) {
  const { tasks, isPending } = useTasks({ listId, token });
  const statesArr = new Set(tasks?.map((task) => task.status));

  if (isPending) return <ListLoader />;

  return (
    <section className="flex h-fit flex-col gap-10">
      {[...statesArr].reverse().map((status) => (
        <ListSlide
          status={status}
          tasks={tasks?.filter((task) => task.status === status)}
          key={status}
        />
      ))}
    </section>
  );
}

export default ListSlides;

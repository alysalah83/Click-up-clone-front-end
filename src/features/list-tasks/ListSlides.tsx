"use client";

import ListSlide from "./ListSlide";
import useTasks from "@/shared/tasks/hooks/useTasks";

function ListSlides({ listId, token }: { listId: string; token: string }) {
  const { tasks } = useTasks({ listId, token });
  if (!tasks) return;
  const statesArr = new Set(tasks?.map((task) => task.status));

  return (
    <section className="flex h-fit flex-col gap-10">
      {[...statesArr].reverse().map((status) => (
        <ListSlide
          status={status}
          tasks={tasks.filter((task) => task.status === status)}
          key={status}
        />
      ))}
    </section>
  );
}

export default ListSlides;

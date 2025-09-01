"use client";

import { notFound } from "next/navigation";
import ListLoader from "./ListLoader";
import ListSlide from "./ListSlide";
import useTasks from "@/shared/tasks/hooks/useTasks";

function ListSlides({ listId, token }: { listId: string; token: string }) {
  const { tasks, isPending, error } = useTasks({ listId, token });
  const statesArr = new Set(tasks?.map((task) => task.status));

  if (isPending) return <ListLoader />;

  if (error) notFound();

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

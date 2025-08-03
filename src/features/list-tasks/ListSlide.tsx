import StatusCard from "@/shared/tasks/components/StatusCard";
import { Task, TaskStatus } from "@/shared/tasks/types/task.types";
import TaskProvider from "@/shared/tasks/components/TaskProvider";
import ListSlideRow from "./ListSlideRow";
import { listBgHoverGradient, listRowBorder } from "./styles/style";
import TaskSortButton from "@/shared/tasks/components/TaskSortButton";

function ListSlide({
  status,
  tasks,
}: {
  status: TaskStatus;
  tasks: Task[] | undefined;
}) {
  const tasksCount = tasks?.length;

  return (
    <div className="flex flex-col gap-3">
      <header className="flex items-center gap-2">
        <StatusCard type={status} />
        <span className="font-medium text-neutral-600 tabular-nums">
          {tasksCount}
        </span>
      </header>
      <main className="flex flex-col">
        <header
          className={`grid cursor-default grid-cols-21 ${listRowBorder} text-sm font-medium text-neutral-600`}
        >
          <div className={`col-span-10 p-2 ${listBgHoverGradient}`}>
            <span>Name</span>
          </div>
          <div
            className={`col-span-3 flex items-center gap-2 p-2 ${listBgHoverGradient}`}
          >
            <span>Due date</span>
            <TaskSortButton sortingFor="dueDate" usedFor="list" />
          </div>
          <div
            className={`col-span-3 flex items-center gap-2 p-2 ${listBgHoverGradient}`}
          >
            <span>Priority</span>
            <TaskSortButton sortingFor="priority" usedFor="list" />
          </div>
          <div className={`col-span-3 p-2 ${listBgHoverGradient}`}>
            <span>Status</span>
          </div>
        </header>
        <section>
          {tasks?.map((task) => (
            <TaskProvider task={task} key={task.id}>
              <ListSlideRow />
            </TaskProvider>
          ))}
        </section>
      </main>
    </div>
  );
}

export default ListSlide;

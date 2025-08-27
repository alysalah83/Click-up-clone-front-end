import { getTasksCounts } from "@/lib/api/server/task/getTask";

async function DashboardStatusCards() {
  const { completeCount, inProgressCount, toDoCount } = await getTasksCounts();

  return (
    <>
      <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-neutral-200 p-4 pt-2 dark:border-neutral-600 dark:bg-neutral-900">
        <h3 className="text-xl font-semibold tracking-wide">ToDo</h3>
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <span className="text-4xl font-bold text-neutral-500 tabular-nums dark:text-neutral-300">
            {toDoCount}
          </span>
          <span className="text-base font-medium text-neutral-700 dark:text-neutral-500">
            Tasks
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-neutral-200 p-4 pt-2 dark:border-neutral-600 dark:bg-neutral-900">
        <h3 className="text-xl font-semibold tracking-wide">InProgress</h3>
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <span className="text-4xl font-bold text-neutral-500 tabular-nums dark:text-neutral-300">
            {inProgressCount}
          </span>
          <span className="text-base font-medium text-neutral-500">Tasks</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-neutral-200 p-4 pt-2 sm:col-span-2 dark:border-neutral-600 dark:bg-neutral-900">
        <h3 className="text-xl font-semibold tracking-wide">Completed</h3>
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <span className="text-4xl font-bold text-neutral-500 tabular-nums dark:text-neutral-300">
            {completeCount}
          </span>
          <span className="text-base font-medium text-neutral-700 dark:text-neutral-500">
            Tasks
          </span>
        </div>
      </div>
    </>
  );
}

export default DashboardStatusCards;

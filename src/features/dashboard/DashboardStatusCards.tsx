import { getTasksCounts } from "@/lib/api/server/task/getTask";

async function DashboardStatusCards() {
  const { completeCount, inProgressCount, toDoCount } = await getTasksCounts();

  return (
    <>
      <div className="flex flex-col gap-4 rounded-xl border border-neutral-600 bg-neutral-900 p-4 pt-2">
        <h3 className="text-xl font-semibold tracking-wide">ToDo</h3>
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <span className="text-4xl font-bold text-neutral-300 tabular-nums">
            {toDoCount}
          </span>
          <span className="text-base font-medium text-neutral-500">Tasks</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded-xl border border-neutral-600 bg-neutral-900 p-4 pt-2">
        <h3 className="text-xl font-semibold tracking-wide">InProgress</h3>
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <span className="text-4xl font-bold text-neutral-300 tabular-nums">
            {inProgressCount}
          </span>
          <span className="text-base font-medium text-neutral-500">Tasks</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded-xl border border-neutral-600 bg-neutral-900 p-4 pt-2 sm:col-span-2">
        <h3 className="text-xl font-semibold tracking-wide">Completed</h3>
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <span className="text-4xl font-bold text-neutral-300 tabular-nums">
            {completeCount}
          </span>
          <span className="text-base font-medium text-neutral-500">Tasks</span>
        </div>
      </div>
    </>
  );
}

export default DashboardStatusCards;

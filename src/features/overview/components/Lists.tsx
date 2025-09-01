import { getLists } from "@/lib/api/server/list/getList";
import { List } from "../../lists-side-nav/types/list.types";
import { ICONS_MAP } from "@/constants/iconsMap";
import Link from "next/link";
import { getListTasksCounts } from "@/lib/api/server/task/getTask";
import { getWorkspacesCount } from "@/lib/api/server/workspace/getWorkspace";
import NoWorkspace from "@/components/layout/NoWorkspace";

async function Lists() {
  const [workspacesCount, lists] = await Promise.all([
    getWorkspacesCount(),
    getLists(),
  ]);

  if (workspacesCount <= 0) return <NoWorkspace />;

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-neutral-300 bg-neutral-200 px-6 py-4 text-neutral-600 md:px-8 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400">
      <h2 className="mb-4 flex items-end gap-4">
        <span className="text-2xl font-semibold tracking-wide text-neutral-900 dark:text-neutral-100">
          Lists
        </span>
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-500">
          Select a list
        </span>
      </h2>
      <div className="flex flex-col gap-4">
        {lists.map((list) => (
          <ListItem list={list} key={list.id} />
        ))}
      </div>
    </div>
  );
}

async function ListItem({ list }: { list: List }) {
  const { name, id } = list;
  const count = await getListTasksCounts(id);
  const { totalCount, completeCount } = count;
  return (
    <div className="flex items-center justify-between gap-4">
      <Link href={`/home/${id}/table`}>
        <div className="group flex cursor-pointer items-center gap-3">
          <ICONS_MAP.list className="size-4 fill-neutral-500 transition duration-200 group-hover:fill-neutral-600 dark:fill-neutral-400 dark:group-hover:fill-neutral-500" />
          <span className="text-base font-medium underline underline-offset-2 transition duration-200 group-hover:text-neutral-700 group-hover:no-underline group-active:text-neutral-700 group-active:no-underline dark:group-hover:text-neutral-500 dark:group-active:text-neutral-500">
            {name}
          </span>
        </div>
      </Link>
      {totalCount ? (
        <div className={`flex items-center gap-4`}>
          <div className="relative h-2 w-32 rounded-lg bg-neutral-300 sm:w-52 dark:bg-neutral-800">
            <div
              style={{
                width: `${(completeCount / totalCount) * 100}%`,
              }}
              className="absolute inset-0 rounded-lg bg-neutral-600 dark:bg-neutral-500"
            />
          </div>
          <p className="text-sm font-semibold text-neutral-500 tabular-nums dark:text-neutral-300">
            {completeCount}/{totalCount}
          </p>
        </div>
      ) : (
        <p className="font-semibold">No Tasks to display</p>
      )}
    </div>
  );
}

export default Lists;

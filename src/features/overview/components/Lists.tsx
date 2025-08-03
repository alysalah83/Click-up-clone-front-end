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
    <div className="flex flex-col gap-2 rounded-xl border border-neutral-700 bg-neutral-900 px-6 py-4 text-neutral-400 md:px-8">
      <h2 className="mb-4 flex items-end gap-4">
        <span className="text-2xl font-semibold tracking-wide text-neutral-100">
          Lists
        </span>
        <span className="text-sm font-medium text-neutral-500">
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
        <div className="flex cursor-pointer items-center gap-3">
          <ICONS_MAP.list className="size-4 fill-neutral-400" />
          <span className="text-base font-medium">{name}</span>
        </div>
      </Link>
      <div className="flex items-center gap-4">
        <div className="relative h-2 w-32 rounded-lg bg-neutral-800 sm:w-52">
          <div
            style={{
              width: `${(completeCount / totalCount) * 100}%`,
            }}
            className="absolute inset-0 rounded-lg bg-neutral-500"
          />
        </div>
        <p className="w-10 text-sm font-semibold text-neutral-300 tabular-nums">
          {completeCount}/{totalCount}
        </p>
      </div>
    </div>
  );
}

export default Lists;

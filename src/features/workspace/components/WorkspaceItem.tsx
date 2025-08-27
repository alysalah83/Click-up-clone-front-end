import WorkspaceRowHeading from "./WorkspaceRowHeading";
import ListRowHeading from "@/features/lists-side-nav/components/ListRowHeading";
import WorkspaceProvider from "./WorkspaceContext";
import ListProvider from "@/features/lists-side-nav/components/ListContext";
import { getListsByWorkspaceId } from "@/lib/api/server/list/getList";
import { Workspace } from "../types/workspace.types";

interface WorkspaceItemProps {
  workspace: Workspace;
}

async function WorkspaceItem({ workspace }: WorkspaceItemProps) {
  const lists = await getListsByWorkspaceId(workspace.id);

  const haveLists = lists.length > 0;

  return (
    <li className="flex flex-col gap-2">
      <WorkspaceProvider workspace={workspace}>
        <WorkspaceRowHeading workspace={workspace} />
      </WorkspaceProvider>

      {haveLists && (
        <menu className="ml-auto flex w-[92%] flex-col gap-2 border-l border-neutral-300 pl-3 dark:border-neutral-700">
          {lists.map((list) => (
            <ListProvider workspaceId={workspace.id} list={list} key={list.id}>
              <ListRowHeading list={list} />
            </ListProvider>
          ))}
        </menu>
      )}
    </li>
  );
}

export default WorkspaceItem;

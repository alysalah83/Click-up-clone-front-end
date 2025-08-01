import { getWorkspaces } from "@/lib/api/server/workspace/getWorkspace";
import WorkspaceItem from "./WorkspaceItem";

async function WorkspacesList() {
  const workspaces = await getWorkspaces();

  if (workspaces?.length === 0 || !workspaces)
    return <p>no workspaces to display</p>;

  return (
    <menu className="flex flex-col gap-4">
      {workspaces.map((workspace) => (
        <WorkspaceItem workspace={workspace} key={workspace.id} />
      ))}
    </menu>
  );
}

export default WorkspacesList;

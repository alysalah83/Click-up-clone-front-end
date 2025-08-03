import { BoardProvider } from "./BoardContext";
import BoardColumn from "./BoardColumn";
import { BOARD_COLUMNS } from "../consts/board";
import DragProvider from "@/contexts/DragProvider";
import { getWorkspaces } from "@/lib/api/server/workspace/getWorkspace";
import NoWorkspace from "@/components/layout/NoWorkspace";

async function BoardColumns() {
  const workspace = await getWorkspaces();

  if (!workspace || workspace.length <= 0) return <NoWorkspace />;

  return (
    <main className="flex h-[calc(100vh-95px-16px)] flex-col gap-4 p-4 lg:flex-row">
      <BoardProvider>
        <DragProvider>
          {BOARD_COLUMNS.map((columnObj) => (
            <BoardColumn column={columnObj} key={columnObj.type} />
          ))}
        </DragProvider>
      </BoardProvider>
    </main>
  );
}

export default BoardColumns;

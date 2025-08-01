import { BoardProvider } from "./BoardContext";
import BoardColumn from "./BoardColumn";
import { BOARD_COLUMNS } from "../consts/board";
import DragProvider from "@/contexts/DragProvider";

function BoardColumns() {
  return (
    <main className="flex h-[calc(100vh-95px-16px)] gap-4 p-4">
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

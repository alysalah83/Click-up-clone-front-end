"use client";

import {
  createContext,
  RefObject,
  use,
  useEffect,
  useRef,
  useState,
} from "react";

type ActiveAddTaskPanel = string | null;
type ColumnName = string;

interface BoardContext {
  activeAddTaskPanel: ActiveAddTaskPanel;
  handleOpenAddTaskPanel: (columnName: ColumnName) => void;
  handleCloseAddTaskPanel: () => void;
  taskPanelRef: RefObject<HTMLFormElement | null>;
}

const BoardContext = createContext<BoardContext | null>(null);

function BoardProvider({ children }: { children: React.ReactNode }) {
  const [activeAddTaskPanel, setActiveAddTaskPanel] =
    useState<ActiveAddTaskPanel>(null);
  const taskPanelRef = useRef<HTMLFormElement>(null);

  const handleOpenAddTaskPanel = (columnName: ColumnName) =>
    setActiveAddTaskPanel(columnName);

  const handleCloseAddTaskPanel = () => setActiveAddTaskPanel(null);

  useEffect(() => {
    if (!activeAddTaskPanel || !taskPanelRef.current) return;
    const taskPanelElement = taskPanelRef.current;

    const handleClickOutSideTaskPanel = function (e: MouseEvent) {
      if (!e.target || !(e.target instanceof Node)) return;
      if (taskPanelElement.contains(e.target)) return;

      handleCloseAddTaskPanel();
    };

    document.addEventListener("click", handleClickOutSideTaskPanel);

    return () =>
      document.removeEventListener("click", handleClickOutSideTaskPanel);
  }, [activeAddTaskPanel]);

  return (
    <BoardContext
      value={{
        activeAddTaskPanel,
        handleOpenAddTaskPanel,
        handleCloseAddTaskPanel,
        taskPanelRef,
      }}
    >
      {children}
    </BoardContext>
  );
}

function useBoard() {
  const values = use(BoardContext);
  if (!values)
    throw new Error(
      "add task panel context is being used outside of his scope",
    );
  return values;
}

export { BoardProvider, useBoard };

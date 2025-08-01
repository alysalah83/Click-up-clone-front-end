import { create } from "zustand";

type SortOrder = "" | "asc" | "desc";

interface UseLocalTaskSorts {
  tableSorts: NewSorts;
  boardSorts: NewSorts;
  listSorts: NewSorts;

  setTableSorts: (newSorts: NewSorts) => void;
  setBoardSorts: (newSorts: NewSorts) => void;
  setListSorts: (newSorts: NewSorts) => void;
}

interface NewSorts {
  status: SortOrder;
  priority: SortOrder;
  dueDate: SortOrder;
  createdAt: SortOrder;
}

export const useLocalTaskSorts = create<UseLocalTaskSorts>((set) => ({
  tableSorts: {
    status: "",
    priority: "",
    dueDate: "",
    createdAt: "",
  },
  boardSorts: {
    status: "",
    priority: "",
    dueDate: "",
    createdAt: "",
  },
  listSorts: { status: "", priority: "", dueDate: "", createdAt: "" },

  setTableSorts: (newSorts) => set({ tableSorts: newSorts }),
  setBoardSorts: (newSorts) => set({ boardSorts: newSorts }),
  setListSorts: (newSorts) => set({ listSorts: newSorts }),
}));

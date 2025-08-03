import BoardColumns from "@/features/board-tasks/components/BoardColumns";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Board",
};

async function BoardPage() {
  return <BoardColumns />;
}

export default BoardPage;

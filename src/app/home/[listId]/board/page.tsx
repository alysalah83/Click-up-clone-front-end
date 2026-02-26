import { BoardColumns } from "@/features/task/views/Board/components";
import EmptySpaces from "@/features/workspace/components/EmptySpaces";
import { workspaceServices } from "@/features/workspace/services/workspace.service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Board",
};

async function BoardPage() {
  const workspaceCount = await workspaceServices.getWorkspacesCount();

  if (workspaceCount === 0) return <EmptySpaces />;

  return <BoardColumns />;
}

export default BoardPage;

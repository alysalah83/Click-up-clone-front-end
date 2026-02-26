import { Metadata } from "next";
import { workspaceServices } from "@/features/workspace/services/workspace.service";
import TableTasksLayout from "@/features/task/views/Table/TableTasksLayout";
import EmptySpaces from "@/features/workspace/components/EmptySpaces";

export const metadata: Metadata = {
  title: "Table",
};

async function page() {
  const workspaceCount = await workspaceServices.getWorkspacesCount();

  if (workspaceCount === 0) return <EmptySpaces />;

  return <TableTasksLayout />;
}

export default page;

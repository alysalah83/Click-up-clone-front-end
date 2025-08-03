import TableTasksLayout from "@/features/table-tasks/components/TableTasksLayout";
import { cookies } from "next/headers";
import { Metadata } from "next";
import NoWorkspace from "@/components/layout/NoWorkspace";
import { getWorkspaces } from "@/lib/api/server/workspace/getWorkspace";

export const metadata: Metadata = {
  title: "Table",
};

async function page({ params }: { params: Promise<{ listId: string }> }) {
  const workspace = await getWorkspaces();

  if (!workspace || workspace.length <= 0) return <NoWorkspace />;

  const [{ listId }, cookiesStore] = await Promise.all([params, cookies()]);
  const token = cookiesStore.get("auth-token")?.value as string;

  return <TableTasksLayout listId={listId} token={token} />;
}

export default page;

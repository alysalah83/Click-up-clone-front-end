import TableTasksLayout from "@/features/table-tasks/components/TableTasksLayout";
import { cookies } from "next/headers";

async function page({ params }: { params: Promise<{ listId: string }> }) {
  const [{ listId }, cookiesStore] = await Promise.all([params, cookies()]);
  const token = cookiesStore.get("auth-token")?.value as string;

  return <TableTasksLayout listId={listId} token={token} />;
}

export default page;

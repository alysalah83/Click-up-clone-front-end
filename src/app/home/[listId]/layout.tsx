import { LIST_ID_RESERVED_ROUTES } from "@/config/config";
import { getTasks } from "@/lib/api/server/task/getTask";
import TasksProvider from "@/shared/tasks/components/TasksProvider";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function ListIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ listId: string }>;
}) {
  const [{ listId }, cookiesStore] = await Promise.all([params, cookies()]);

  if (LIST_ID_RESERVED_ROUTES.has(listId)) return redirect("/home/overview");

  const token = cookiesStore.get("auth-token")?.value as string;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["tasks", listId],
    queryFn: () => getTasks(listId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TasksProvider token={token}>{children}</TasksProvider>;
    </HydrationBoundary>
  );
}

export default ListIdLayout;

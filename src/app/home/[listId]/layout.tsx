import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { LIST_ID_RESERVED_ROUTES } from "@/shared/constants/layout";
import { tasksService } from "@/features/task/services/task.service";
import { statusServices } from "@/features/status/services/status.service";

async function ListIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ listId: string }>;
}) {
  const { listId } = await params;

  if (LIST_ID_RESERVED_ROUTES.has(listId)) return redirect("/home/overview");

  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["tasks", listId],
      queryFn: () => tasksService.getTasks(listId),
    }),
    queryClient.prefetchQuery({
      queryKey: ["statuses", listId],
      queryFn: () => statusServices.getStatuses(listId),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}

export default ListIdLayout;

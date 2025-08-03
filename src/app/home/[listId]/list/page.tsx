import ListSlides from "@/features/list-tasks/ListSlides";
import { cookies } from "next/headers";
import { Metadata } from "next";
import NoWorkspace from "@/components/layout/NoWorkspace";
import { getWorkspaces } from "@/lib/api/server/workspace/getWorkspace";

export const metadata: Metadata = {
  title: "List",
};

async function page({ params }: { params: Promise<{ listId: string }> }) {
  const workspace = await getWorkspaces();

  if (!workspace || workspace.length <= 0) return <NoWorkspace />;

  const [{ listId }, cookiesStore] = await Promise.all([params, cookies()]);
  const token = cookiesStore.get("auth-token")?.value;
  if (!token || !listId) return null;

  return (
    <main className="p-8">
      <ListSlides listId={listId} token={token} />
    </main>
  );
}

export default page;

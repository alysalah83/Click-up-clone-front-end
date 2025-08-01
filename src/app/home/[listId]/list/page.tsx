import ListSlides from "@/features/list-tasks/ListSlides";
import { cookies } from "next/headers";

async function page({ params }: { params: Promise<{ listId: string }> }) {
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

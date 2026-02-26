import { Metadata } from "next";
import { workspaceServices } from "@/features/workspace/services/workspace.service";
import ListSlides from "@/features/task/views/List/ListSlides";
import EmptySpaces from "@/features/workspace/components/EmptySpaces";

export const metadata: Metadata = {
  title: "List",
};

async function page() {
  const workspaceCount = await workspaceServices.getWorkspacesCount();

  if (workspaceCount === 0) return <EmptySpaces />;

  return (
    <main className="p-8">
      <ListSlides />
    </main>
  );
}

export default page;

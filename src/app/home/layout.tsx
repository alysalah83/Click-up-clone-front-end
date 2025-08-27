import Header from "@/components/layout/Header";
import SideBarMenu from "@/components/layout/SideBarMenu";
import MainContent from "@/components/layout/MainContent";
import SideBarNav from "@/components/layout/SideBarNav";
import { ReactNode } from "react";
import Workspace from "@/features/workspace/components/Workspace";
import QueryProvider from "@/contexts/QueryProvider";
import { getUserApi } from "@/lib/api/server/auth/getUser";
import { getLatestCreatedList } from "@/lib/api/server/list/getList";

async function HomeLayout({ children }: { children: ReactNode }) {
  const userPromise = getUserApi();
  const latestListId = getLatestCreatedList();

  return (
    <QueryProvider>
      <div className="flex h-screen overflow-x-auto bg-white p-2 dark:bg-black">
        <SideBarMenu />
        <div className="flex w-full rounded-xl border border-neutral-300 dark:border-neutral-700">
          <SideBarNav>
            <Workspace />
          </SideBarNav>

          <MainContent>
            <Header
              userPromise={userPromise}
              latestListIdPromise={latestListId}
            />
            <main className="h-full grow-0 overflow-y-auto">{children}</main>
          </MainContent>
        </div>
      </div>
    </QueryProvider>
  );
}

export const dynamic = "force-dynamic";

export default HomeLayout;

import Header from "@/shared/layout/Header/Header";
import MainContent from "@/shared/layout/MainContent";
import { ReactNode } from "react";
import Workspace from "@/features/workspace/components/SpacesSection";
import QueryProvider from "@/contexts/QueryProvider";
import SideNav from "@/shared/layout/SideNav.tsx/SideNav";
import SideBar from "@/shared/layout/SideBar/SideBar";
import { authServices } from "@/features/auth/services/auth.service";
import { listServices } from "@/features/list/services/list.service";
import OnBoardingTrigger from "@/features/auth/components/OnBoardingTrigger";
import { redirect } from "next/navigation";

async function HomeLayout({
  children,
  searchParams,
}: {
  children: ReactNode;
  searchParams: Promise<{ retry?: string }>;
}) {
  const userPromise = authServices.getUser().catch(async (error) => {
    const { retry } = await searchParams;
    if (retry === "1") throw error;
    redirect("/home/lists?retry=1");
  });
  const latestListId = listServices.getLatestCreatedListId();

  return (
    <QueryProvider>
      <div className="flex h-screen w-full min-w-0 bg-white p-2 dark:bg-black">
        <SideNav />
        <div className="flex w-full min-w-0 rounded-xl border border-neutral-300 dark:border-neutral-700">
          <SideBar>
            <Workspace />
          </SideBar>

          <MainContent>
            <Header
              userPromise={userPromise}
              latestListIdPromise={latestListId}
            />
            <OnBoardingTrigger userPromise={userPromise} />
            <main className="h-full flex-1 overflow-auto">{children}</main>
          </MainContent>
        </div>
      </div>
    </QueryProvider>
  );
}

export default HomeLayout;

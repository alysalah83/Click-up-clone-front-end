import Whiteboard from "@/features/whiteboard/components/Whiteboard";
import { getUserApi } from "@/lib/api/server/auth/getUser";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Whiteboard",
};

async function page() {
  const user = await getUserApi();

  if (!user) return redirect("/login");

  return (
    <div className="h-full w-full">
      <Whiteboard userId={user?.id} />
    </div>
  );
}

export default page;

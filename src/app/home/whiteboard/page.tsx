import Whiteboard from "@/features/whiteboard/components/Whiteboard";
import { getUserApi } from "@/lib/api/server/auth/getUser";
import { redirect } from "next/navigation";

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

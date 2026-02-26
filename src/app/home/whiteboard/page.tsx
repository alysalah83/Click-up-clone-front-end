import { authServices } from "@/features/auth/services/auth.service";
import Whiteboard from "@/features/whiteboard/components/Whiteboard";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Whiteboard",
};

async function page() {
  const user = await authServices.getUser();

  if (!user) return redirect("/login");

  return (
    <div className="h-full w-full">
      <Whiteboard userId={user?.id} />
    </div>
  );
}

export default page;

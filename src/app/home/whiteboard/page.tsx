import Whiteboard from "@/features/whiteboard/components/Whiteboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Whiteboard",
};

async function page() {
  return (
    <div className="h-full w-full">
      <Whiteboard />
    </div>
  );
}

export default page;

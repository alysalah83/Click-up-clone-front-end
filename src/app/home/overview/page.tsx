import Lists from "@/features/overview/components/Lists";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overview",
};

function OverviewPage() {
  return (
    <div className="p-4">
      <Lists />
    </div>
  );
}

export default OverviewPage;

import ListsSummery from "@/features/list/components/ListsSummery";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overview",
};

function OverviewPage() {
  return (
    <div className="p-4">
      <ListsSummery />
    </div>
  );
}

export default OverviewPage;
